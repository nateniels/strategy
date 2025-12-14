// File: src/pages/LiveRoundPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const LiveRoundPage = ({ liveScores = [], lastUpdated }) => {
    const navigate = useNavigate();

    // Helper for rounding to 1 decimal
    const formatDecimal = (val) => {
        const num = parseFloat(val);
        return isNaN(num) ? '-' : num.toFixed(1);
    };

    // 🛑 UPDATED: Force Pacific Time and add PT label
    const formattedTime = lastUpdated 
        ? lastUpdated.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            timeZone: 'America/Los_Angeles' 
          }) + ' PT'
        : '--:--:--';

    // Calculate Totals for Header
    const totalStrokes = liveScores.reduce((sum, row) => sum + (parseInt(row.Strokes) || 0), 0);
    const totalProcess = liveScores.reduce((sum, row) => sum + (parseInt(row.ProcessScore) || 0), 0);
    const courseName = liveScores.length > 0 ? liveScores[0].CourseName : "Live Round";

    return (
        <div className="p-6 min-h-screen bg-gray-50">
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
                
                {/* 🛑 DISPLAY UPDATED PT TIME */}
                <p className="text-[10px] text-gray-400 mt-3 uppercase tracking-tighter font-medium">
                    Last Updated: {formattedTime}
                </p>
            </header>

            {/* TOTALS SUMMARY CARD */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-10">
                <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-gray-900 text-center">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Total Strokes</p>
                    <p className="text-4xl font-black text-gray-900">{totalStrokes}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-green-600 text-center">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Process Points</p>
                    <p className="text-4xl font-black text-green-600">{totalProcess}</p>
                </div>
            </div>

            {/* TABLE CONTAINER: Fixed height with sticky header */}
            <div className="overflow-x-auto overflow-y-auto max-h-[600px] rounded-2xl border border-gray-300 shadow-xl bg-white">
                <table className="min-w-full divide-y divide-gray-200 border-collapse">
                    <thead className="bg-white">
                        <tr>
                            <th className="sticky top-0 z-10 bg-white px-3 py-5 text-center text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300">Hole</th>
                            <th className="sticky top-0 z-10 bg-white px-2 py-5 text-center text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300">Yds</th>
                            <th className="sticky top-0 z-10 bg-white px-2 py-5 text-center text-base font-bold text-gray-900 border-b border-gray-300">xScore</th>
                            <th className="sticky top-0 z-10 bg-white px-2 py-5 text-center text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300">Process %</th>
                            <th className="sticky top-0 z-10 bg-white px-2 py-5 text-center text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300">Back to Zero</th>
                            <th className="sticky top-0 z-10 bg-white px-2 py-5 text-center text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300">Strokes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-800">
                        {liveScores.map((row, i) => {
                            const strokes = parseInt(row.Strokes) || 0;
                            const procScore = parseInt(row.ProcessScore) || 0;
                            const procPercent = strokes > 0 ? Math.round((procScore / strokes) * 100) : 0;
                            
                            const b2zRaw = row.GetToZero?.toLowerCase();
                            const isB2ZEmpty = !b2zRaw || b2zRaw === '0' || b2zRaw === '';
                            const b2zStatus = (b2zRaw === 'yes' || b2zRaw === 'y' || b2zRaw === '1') ? 'YES' : 'NO';

                            return (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 py-4 text-center text-base font-bold text-gray-900 border-r border-gray-100 bg-gray-50/50 w-16">
                                        {row.HoleNumber}
                                    </td>
                                    <td className="px-2 py-4 text-center text-base font-normal text-gray-600">{row.TotalYardage}</td>
                                    <td className="px-2 py-4 text-center text-base font-normal text-gray-600">
                                        {formatDecimal(row.ExpectedScore)}
                                    </td>
                                    <td className={`px-2 py-4 text-center text-base font-bold ${procPercent === 100 ? 'text-green-600' : 'text-red-500'}`}>
                                        {strokes > 0 ? `${procPercent}%` : '-'}
                                    </td>
                                    <td className="px-2 py-4 text-center text-base font-bold border-x border-gray-100">
                                        {isB2ZEmpty ? (
                                            <span className="text-gray-400">—</span>
                                        ) : (
                                            <span className={b2zStatus === 'YES' ? 'text-green-600' : 'text-red-500'}>
                                                {b2zStatus}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-2 py-4 text-center text-base font-normal text-gray-900">
                                        {row.Strokes}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LiveRoundPage;