// File: App.jsx

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { fetchAllHolesData } from "./services/sheetsService"; 
import HomePage from "./pages/HomePage";
import HolesListPage from "./pages/HolesListPage";
import HoleProfilePage from "./pages/HoleProfilePage";
import TrainLikeTonyPage from "./pages/TrainLikeTonyPage.jsx";
import ScrollToTop from './components/ScrollToTop';
import LiveRoundPage from './pages/LiveRoundPage';

/**
 * 🛠️ IMPROVED CSV PARSER
 * Handles basic comma-separated values. 
 */
function parseCSV(text) {
    if (!text) return [];
    const rows = text.split(/\r?\n/).map(row => row.split(','));
    if (rows.length < 2) return [];
    
    const headers = rows[0].map(h => h.trim());
    return rows.slice(1)
        .filter(row => row.length >= headers.length && row[0].trim() !== "")
        .map(row => {
            let obj = {};
            headers.forEach((header, i) => {
                obj[header] = row[i] ? row[i].trim() : "";
            });
            return obj;
        });
}

function App() {
    const [allHolesData, setAllHolesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [liveScores, setLiveScores] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null); 

    // ⛳️ CONFIGURATION
    const SPREADSHEET_ID = '1qdMf9IbKhh61uFau59Tjc5vrwrfj4_ZPPkAR9r_9Ng4'; 
    const LIVE_GID = '1085423138'; 
    const liveScoresSheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${LIVE_GID}`;

    useEffect(() => {
        // 1. Fetch Static Hole Data
        async function getHoleData() {
            try {
                const data = await fetchAllHolesData();
                setAllHolesData(data);
            } catch (error) {
                console.error("Failed to fetch hole data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        getHoleData();

        // 2. Fetch Live Scores
        const fetchLiveScores = () => {
            fetch(liveScoresSheetUrl)
                .then(response => response.text())
                .then(csvText => {
                    const parsedData = parseCSV(csvText); 
                    setLiveScores(parsedData);
                    setLastUpdated(new Date()); 
                })
                .catch(err => console.error("Fetch error:", err));
        };

        fetchLiveScores(); 
        const interval = setInterval(fetchLiveScores, 30000); 
        return () => clearInterval(interval);
    }, [liveScoresSheetUrl]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white text-gray-900">
                <p className="text-xl font-bold">Loading course data...</p>
            </div>
        );
    }

    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <div className="min-h-screen bg-white text-gray-900">
                <div className="container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<HomePage allHolesData={allHolesData} />} />
                        
                        {/* 🛑 SINGLE CORRECT LIVE ROUND ROUTE */}
                        <Route 
                            path="/live-round" 
                            element={<LiveRoundPage liveScores={liveScores} lastUpdated={lastUpdated} />} 
                        />
                        
                        <Route path="/course/:courseName" element={<HolesListPage allHolesData={allHolesData} />} />
                        <Route path="/hole/:courseName/:holeNumber" element={<HoleProfilePage allHolesData={allHolesData} />} /> 
                        <Route path="/train-like-tony" element={<TrainLikeTonyPage />} /> 
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;