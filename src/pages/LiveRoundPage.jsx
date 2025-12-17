// File: src/pages/LiveRoundPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, InformationCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

const LiveRoundPage = ({ liveScores = [], lastUpdated }) => {
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState(false);
    
    // 🛑 MASTER CONTROL SECTION 🛑
    const COURSE_ORDER = ["Indian Wells", "Nicklaus", "Stadium"];
    const LIVE_COURSE_NAME = ""; 

    const toSlug = (str) => str ? String(str).toLowerCase().replace(/\s+/g, '') : '';

    const getOrderedCourses = () => {
        const uniqueInSheet = [...new Set(liveScores.map(row => row.CourseName || row.Course))].filter(Boolean);
        return uniqueInSheet.sort((a, b) => {
            let indexA = COURSE_ORDER.indexOf(a);
            let indexB = COURSE_ORDER.indexOf(b);
            if (indexA === -1) indexA = 99;
            if (indexB === -1) indexB = 99;
            return indexA - indexB;
        });
    };

    const courseList = getOrderedCourses();
    const [selectedCourse, setSelectedCourse] = useState("");

    useEffect(() => {
        if (!selectedCourse && courseList.length > 0) {
            const liveExists = courseList.find(c => toSlug(c) === toSlug(LIVE_COURSE_NAME));
            setSelectedCourse(liveExists || courseList[0]);
        }
    }, [courseList, selectedCourse]);

    const filteredScores = liveScores.filter(row => toSlug(row.CourseName || row.Course) === toSlug(selectedCourse));

    const isThisCourseLive = toSlug(selectedCourse) === toSlug(LIVE_COURSE_NAME);

    const formatDecimal = (val) => {
        const num = parseFloat(val);
        return isNaN(num) ? '-' : num.toFixed(1);
    };

    const formattedTime = lastUpdated 
        ? lastUpdated.toLocaleTimeString('en-US', { 
            hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Los_Angeles' 
          }) + ' PT'
        : '--:--:--';

    // ⛳️ CALCULATIONS
    const playedHoles = filteredScores.filter(row => (parseInt(row.Strokes) || 0) > 0);
    const totalStrokes = playedHoles.reduce((sum, row) => sum + (parseInt(row.Strokes) || 0), 0);
    const totalExpected = playedHoles.reduce((sum, row) => sum + (parseFloat(row.ExpectedScore) || 0), 0);
    const totalProcess = filteredScores.reduce((sum, row) => sum + (parseInt(row.ProcessScore) || 0), 0);
    
    const sgRaw = totalStrokes > 0 ? (totalExpected - totalStrokes) : 0;
    
    const formatStrokesGained = (num) => {
        const abs = Math.abs(num).toFixed(1);
        return num > 0 ? `+${abs}` : num < 0 ? `(${abs})` : "0.0";
    };

    return (
        <div className="p-6 min-h-screen bg-gray-50 pb-20 text-gray-900">
            <button onClick={() => navigate('/')} className="text-gray-900 flex items-center mb-8 hover:text-gray-700 transition">
                <ArrowLeftIcon className="h-6 w-6 mr-2" /> 
                <span className="font-semibold">Back to Home</span>
            </button>

            <header className="text-center mb-8">
                <div className="flex flex-col items-center space-y-3 mb-2">
                    <div className="flex items-center space-x-2">
                        {isThisCourseLive && (
                            <div className="flex items-center space-x-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                                </span>
                                <span className="text-red-600 font-black text-xs tracking-tighter animate-pulse uppercase">LIVE</span>
                            </div>
                        )}
                        <p className="text-yellow-600 font-bold uppercase tracking-widest text-sm">
                            {selectedCourse || "Loading..."}
                        </p>
                    </div>

                    {courseList.length > 0 && (
                        <div className="relative w-72">
                            <select 
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="block w-full bg-white border border-gray-300 text-gray-900 py-2.5 px-4 pr-10 rounded-xl shadow-sm appearance-none font-bold text-sm uppercase tracking-tighter cursor-pointer"
                            >
                                {courseList.map((course, idx) => (
                                    <option key={idx} value={course}>{course}</option>
                                ))}
                            </select>
                            <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
                        </div>
                    )}
                </div>

                <h1 className="text-5xl font-extrabold text-gray-900 leading-none mt-4">
                    LIVE <span className="text-yellow-600">TRACKER</span>
                </h1>
                <p className="text-[10px] text-gray-400 mt-3 uppercase tracking-tighter font-medium text-center">
                    Last Updated: {formattedTime}
                </p>
            </header>

  {/* SUMMARY CARDS */}
<div className="grid grid-cols-3 gap-2 mb-10 px-2 max-w-lg mx-auto">
    {/* Total Strokes Box */}
    <div className="bg-white p-3 rounded-2xl shadow-lg border-2 border-gray-300 flex flex-col items-center justify-between">
        <p className="text-[9px] text-gray-500 font-bold uppercase w-full h-7 flex items-center justify-center leading-tight">
            Total Strokes
        </p>
        <p className="text-2xl font-black text-gray-900 mt-1">{totalStrokes}</p>
    </div>

    {/* Strokes Gained Box */}
    <div className="bg-white p-3 rounded-2xl shadow-lg border-2 border-yellow-600 flex flex-col items-center justify-between text-center">
        <p className="text-[9px] text-yellow-600 font-bold uppercase w-full h-7 flex items-center justify-center leading-tight">
            Strokes Gained
        </p>
        <p className={`text-2xl font-black mt-1 ${sgRaw > 0 ? "text-green-600" : "text-gray-900"}`}>
            {formatStrokesGained(sgRaw)}
        </p>
    </div>

    {/* Process Pts Box */}
    <div className="bg-white p-3 rounded-2xl shadow-lg border-2 border-green-600 flex flex-col items-center justify-between text-center">
        <p className="text-[9px] text-green-600 font-bold uppercase w-full h-7 flex items-center justify-center leading-tight">
            Process Pts
        </p>
        <p className="text-2xl font-black text-green-600 mt-1">{totalProcess}</p>
    </div>
</div>

            {/* TABLE */}
            <div className="overflow-x-auto overflow-y-auto max-h-[550px] rounded-2xl border border-gray-300 shadow-xl bg-white mb-8 custom-scrollbar">
                <table className="min-w-full divide-y divide-gray-200 border-collapse table-fixed">
                    <thead className="bg-white">
                        <tr>
                            <th className="sticky top-0 bg-white px-2 py-5 text-center text-xs font-bold text-gray-900 uppercase border-b border-gray-300 w-14">Hole</th>
                            <th className="sticky top-0 bg-white px-1 py-5 text-center text-xs font-bold text-gray-900 uppercase border-b border-gray-300 w-14">Yds</th>
                            <th className="sticky top-0 bg-white px-1 py-5 text-center text-xs font-bold text-gray-900 uppercase border-b border-gray-300 w-16"><span className="normal-case">x</span>SCORE</th>
                            <th className="sticky top-0 bg-green-50 px-1 py-5 text-center text-xs font-black text-green-800 uppercase border-b border-green-200 w-24">Process Pts</th>
                            <th className="sticky top-0 bg-green-50 px-1 py-5 text-center text-xs font-black text-green-800 uppercase border-b border-green-200 w-28">Back to Zero</th>
                            <th className="sticky top-0 bg-white px-2 py-5 text-center text-xs font-bold text-gray-900 uppercase border-b border-gray-300 w-16">Strokes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-800">
                        {filteredScores.map((row, i) => {
                            const strokes = parseInt(row.Strokes) || 0;
                            const procScore = parseInt(row.ProcessScore) || 0;
                            const procPercent = strokes > 0 ? Math.round((procScore / strokes) * 100) : 0;
                            const b2zRaw = row.GetToZero?.toLowerCase();
                            const isB2ZEmpty = !b2zRaw || b2zRaw === '0' || b2zRaw === '';
                            const b2zStatus = (b2zRaw === 'yes' || b2zRaw === 'y' || b2zRaw === '1') ? 'YES' : 'NO';

                            return (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-2 py-5 text-center text-base font-bold text-gray-900 border-r border-gray-100 bg-gray-50/50">{row.HoleNumber}</td>
                                    <td className="px-1 py-5 text-center text-base font-normal text-gray-500">{row.TotalYardage}</td>
                                    <td className="px-1 py-5 text-center text-base font-normal text-gray-500">{formatDecimal(row.ExpectedScore)}</td>
                                    <td className={`px-1 py-5 text-center text-base font-black bg-green-50/30 ${procPercent === 100 ? 'text-green-600' : 'text-red-500'}`}>
                                        {strokes > 0 ? `${procPercent}%` : <span className="text-gray-300">—</span>}
                                    </td>
                                    <td className="px-1 py-5 text-center text-base font-black bg-green-50/30 border-x border-green-100/50">
                                        {isB2ZEmpty ? <span className="text-gray-300">—</span> : <span className={b2zStatus === 'YES' ? 'text-green-600' : 'text-red-500'}>{b2zStatus}</span>}
                                    </td>
                                    <td className="px-2 py-5 text-center text-base font-bold text-gray-900">
                                        {strokes > 0 ? row.Strokes : <span className="text-gray-300">—</span>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* WHAT IS THIS SECTION */}
            <div className="max-w-2xl mx-auto">
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
        </div>
    );
};

export default LiveRoundPage;