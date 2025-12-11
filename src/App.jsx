// File: App.jsx

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
// Assuming this service file handles your data fetching
import { fetchAllHolesData } from "./services/sheetsService"; 
import HomePage from "./pages/HomePage";
import HolesListPage from "./pages/HolesListPage";
import HoleProfilePage from "./pages/HoleProfilePage";
import TrainLikeTonyPage from "./pages/TrainLikeTonyPage.jsx";// 🛑 NEW IMPORT ADDED

function App() {
    const [allHolesData, setAllHolesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data on initial load
    useEffect(() => {
        async function getData() {
            try {
                const data = await fetchAllHolesData();
                setAllHolesData(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white text-gray-900">
                <p className="text-xl">Loading course data...</p>
            </div>
        );
    }

    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="min-h-screen bg-white text-gray-900">
                <div className="container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<HomePage allHolesData={allHolesData} />} />
                        <Route
                            path="/course/:courseName"
                            element={<HolesListPage allHolesData={allHolesData} />}
                        />
                        <Route
                            path="/hole/:courseName/:holeNumber"
                            element={<HoleProfilePage allHolesData={allHolesData} />}
                        /> 
                        {/* 🛑 NEW ROUTE DEFINITION ADDED */}
                        <Route 
                            path="/train-like-tony" 
                            element={<TrainLikeTonyPage />} 
                        /> 
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;