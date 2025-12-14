// File: src/pages/LiveRoundPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

const LiveRoundPage = ({ liveScores = [], lastUpdated }) => {
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState(false);

    // Helper for rounding to 1 decimal
    const formatDecimal = (val) => {
        const num = parseFloat(val);
        return isNaN(num) ? '-' : num.toFixed(1);
    };

    // Helper to format the time to Pacific Time
    const formattedTime = lastUpdated 
        ? lastUpdated.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            timeZone: 'America/Los_Angeles' 
          }) + ' PT'
        : '--:--:--';

    // ⛳️ CALCULATIONS
    const playedHoles = liveScores.filter(row => (parseInt(row.Strokes) || 0) > 0);
    const totalStrokes = playedHoles.reduce((sum, row) => sum + (parseInt(row.Strokes) || 0), 0);
    const totalExpected = playedHoles.reduce((sum, row) => sum + (parseFloat(row.ExpectedScore) || 0), 0);
    
    // Strokes Gained Calculation: Expected - Actual
    const sgRaw = totalStrokes > 0 ? (totalExpected - totalStrokes) : 0;
    
    // Formatting: +2.4 or (1.2) for negative
    const formatStrokesGained = (num) => {
        const absoluteNum = Math.abs(num).toFixed(1);
        if (num > 0) return `+${absoluteNum}`;
        if (num < 0) return `(${absoluteNum})`;
        return "0.0";
    };

    const sgDisplay = formatStrokesGained(sgRaw);
    const sgColor = sgRaw > 0 ? "text-green-600" : "text-gray-900";

    // Logic for Commented sections
    // const totalProcess = liveScores.reduce((sum, row) => sum + (parseInt(row.ProcessScore) || 0), 0);
    const courseName = liveScores.length > 0 ? liveScores[0].CourseName : "Live Round";

    return (
        <div className="p-6 min-h-screen bg-gray-50 pb-20">
            {/* CUSTOM CSS FOR ROUNDED SCROLLBAR */}
            <style>
                {`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                    border-radius: 20px;
                }
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #d1d5db transparent;
                }
                `}
            </style>

            {/* Back Button */}
            <button onClick={() => navigate('/')} className="text-gray-900 flex items-center mb-8 hover:text-gray-700 transition">
                <ArrowLeftIcon className="h-6 w-6 mr-2" /> 
                <span className="font-semibold">Back to Home</span>
            </button>

            <header className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                    <p className="text-yellow-600 font-bold uppercase tracking-widest text-sm">{courseName}</p>
                </div>
                <h1 className="text-5xl font-extrabold text-gray-900 leading-none">
                    LIVE <span className="text-yellow-600">TRACKER</span>
                </h1>
                <p className="text-[10px] text-gray-400 mt-3 uppercase tracking-tighter font-medium text-center">
                    Last Updated: {formattedTime}
                </p>
            </header>

            {/* TOTALS SUMMARY CARDS */}
            <div className="flex justify-center gap-4 mb-10 px-2">
                {/* Gray Border for Total Strokes */}
                <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-gray-300 text-center w-full max-w-[160px]">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter mb-1">Total Strokes</p>
                    <p className="text-3xl font-black text-gray-900">{totalStrokes}</p>
                </div>

                {/* Gold Border for Strokes Gained */}
                <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-yellow-600 text-center w-full max-w-[160px]">
                    <p className="text-xs text-yellow-600 font-bold uppercase tracking-tighter mb-1">Strokes Gained</p>
                    <p className={`text-3xl font-black ${sgColor}`}>
                        {sgDisplay}
                    </p>
                </div>
                
                {/* 🛑 COMMENTED OUT PROCESS TOTALS
                <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-green-600 text-center w-full max-w-[160px]">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Process Points</p>
                    <p className="text-4xl font-black text-green-600">{totalProcess}</p>
                </div> 
                */}
            </div>

            {/* TABLE CONTAINER */}
            <div className="overflow-x-auto overflow-y-auto max-h-[550px] rounded-2xl border border-gray-300 shadow-xl bg-white mb-8 custom-scrollbar">
                <table className="min-w-full divide-y divide-gray-200 border-collapse table-fixed">
                    <thead className="bg-white">
                        <tr>
                            <th className="sticky top-0 z-10 bg-white px-2 py-5 text-center text-base font-bold text-gray-900 uppercase border-b border-gray-300 w-14">Hole</th>
                            <th className="sticky top-0 z-10 bg-white px-2 py-5 text-center text-base font-bold text-gray-900 uppercase border-b border-gray-300 w-14">Yds</th>
                            {/* 🛑 FIXED CASE: small x, big SCORE */}
                            <th className="sticky top-0 z-10 bg-white px-2 py-5 text-center text-base font-bold text-gray-900 uppercase border-b border-gray-300 w-16">
                                <span className="normal-case">x</span>SCORE
                            </th>
                            
                            {/* 🛑 COMMENTED OUT PROCESS & ZERO HEADERS
                            <th className="sticky top-0 z-10 bg-green-50 px-2 py-5 text-center text-base font-black text-green-800 uppercase border-b border-green-200 w-24">Process Pts</th>
                            <th className="sticky top-0 z-10 bg-green-50 px-2 py-5 text-center text-base font-black text-green-800 uppercase border-b border-green-200 w-28">Back to Zero</th>
                            */}

                            <th className="sticky top-0 z-10 bg-white px-2 py-5 text-center text-base font-bold text-gray-900 uppercase border-b border-gray-300 w-16">Strokes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-800">
                        {liveScores.map((row, i) => {
                            const strokes = parseInt(row.Strokes) || 0;
                            
                            {/* 🛑 COMMENTED OUT MENTAL STAT LOGIC
                            const procScore = parseInt(row.ProcessScore) || 0;
                            const procPercent = strokes > 0 ? Math.round((procScore / strokes) * 100) : 0;
                            const b2zRaw = row.GetToZero?.toLowerCase();
                            const isB2ZEmpty = !b2zRaw || b2zRaw === '0' || b2zRaw === '';
                            const b2zStatus = (b2zRaw === 'yes' || b2zRaw === 'y' || b2zRaw === '1') ? 'YES' : 'NO';
                            */}

                            return (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-2 py-5 text-center text-base font-bold text-gray-900 border-r border-gray-100 bg-gray-50/50">{row.HoleNumber}</td>
                                    <td className="px-2 py-5 text-center text-base font-normal text-gray-500">{row.TotalYardage}</td>
                                    <td className="px-2 py-5 text-center text-base font-normal text-gray-500">{formatDecimal(row.ExpectedScore)}</td>
                                    
                                    {/* 🛑 COMMENTED OUT PROCESS & ZERO CELLS
                                    <td className={`px-2 py-5 text-center text-base font-bold ${procPercent === 100 ? 'text-green-600' : 'text-red-500'}`}>
                                        {strokes > 0 ? `${procPercent}%` : <span className="text-gray-300">—</span>}
                                    </td>
                                    <td className="px-2 py-5 text-center text-base font-bold bg-green-50/30 border-x border-green-100/50">
                                        {isB2ZEmpty ? <span className="text-gray-300">—</span> : <span className={b2zStatus === 'YES' ? 'text-green-600' : 'text-red-500'}>{b2zStatus}</span>}
                                    </td>
                                    */}

                                    <td className="px-2 py-5 text-center text-base font-normal text-gray-900">
                                        {strokes > 0 ? row.Strokes : <span className="text-gray-300">—</span>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* 🛑 COMMENTED OUT "WHAT IS THIS" SECTION */}
            {/* <div className="max-w-2xl mx-auto">
                <button 
                    onClick={() => setShowInfo(!showInfo)}
                    className="flex items-center justify-center w-full py-4 bg-gray-900 hover:bg-black rounded-xl transition-all duration-200 group shadow-md"
                >
                    <InformationCircleIcon className="h-5 w-5 mr-2 text-yellow-500" />
                    <span className="font-bold text-white text-sm uppercase tracking-widest">What is this?</span>
                </button>

                {showInfo && (
                    <div className="mt-4 p-6 bg-white rounded-2xl border-2 border-green-100 shadow-md text-center">
                        <div className="mb-6">
                            <h3 className="text-green-600 font-black uppercase text-xs tracking-widest mb-2">Process Points</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">Prior to every shot, discussed specific Target and Committed Aggressively.</p>
                        </div>
                        <div>
                            <h3 className="text-green-600 font-black uppercase text-xs tracking-widest mb-2 border-t border-gray-100 pt-4">Back to Zero</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">After both favorable and unfavorable outcomes, got back to Zero by Reviewing then Moving on to the next Shot.</p>
                        </div>
                    </div>
                )}
            </div>
            */}
        </div>
    );
};

export default LiveRoundPage;