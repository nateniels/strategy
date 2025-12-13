// File: HoleProfilePage.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; 
import HoleTabsNavigation from '../components/HoleTabsNavigation.jsx'; 
import { SkillIntentions } from '../components/CourseStrategyTips';

const formatScore = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 'N/A' : num.toFixed(1);
};

const formatRange = (val1, val2, unit = '') => {
    const num1 = parseFloat(val1 || 0);
    const num2 = parseFloat(val2 || 0);
    const min = Math.min(num1, num2).toFixed(0);
    const max = Math.max(num1, num2).toFixed(0);
    return `${min}-${max}${unit}`;
};

function HoleProfilePage({ allHolesData }) {
    const { 
        courseName: encodedCourseName, 
        holeNumber: currentHoleNumStr 
    } = useParams();
    
    if (!encodedCourseName || !currentHoleNumStr) {
         return <div className="p-6 text-red-500">Missing parameters.</div>;
    }
    
    const courseName = decodeURIComponent(encodedCourseName);
    const currentHoleNumber = parseInt(currentHoleNumStr); 
    const navigate = useNavigate();

    const currentCourseHoles = allHolesData
        .filter(hole => hole.CourseName === courseName)
        .sort((a, b) => parseInt(a.HoleNumber) - parseInt(b.HoleNumber)); 

    const hole = currentCourseHoles.find(h => 
        parseInt(h.HoleNumber) === currentHoleNumber
    );

    if (!hole) {
        return <div className="p-6 text-red-500">Hole data not found.</div>;
    }
    
    const goBack = () => navigate(`/course/${encodedCourseName}`);
    const fairwayRange = formatRange(hole.ApproachFairway30, hole.ApproachFairway70, 'yds');
    const roughRange = formatRange(Math.abs(hole.RoughCost30 || 0), Math.abs(hole.RoughCost70 || 0), 'yds'); 
    const bunkerRange = formatRange(Math.abs(hole.BunkerCost30 || 0), Math.abs(hole.BunkerCost70 || 0), 'yds'); 
    const imageUrl = hole.PhotoURL; 

    return (
        <div className="p-6">
            <button onClick={goBack} className="text-gray-900 flex items-center mb-8 hover:text-gray-700">
                <ArrowLeftIcon className="h-6 w-6 mr-2" /> 
                <span className="font-semibold">Back to {courseName} Holes</span>
            </button>

            <HoleTabsNavigation 
                sortedHoles={currentCourseHoles} 
                currentHoleNumber={currentHoleNumber} 
            />

            <div className="flex justify-center items-center mb-6 border-b pb-4 text-center">
                <div>
                    <p className="text-xl font-medium text-gray-500 tracking-wide mb-1">{courseName}</p>
                    <h1 className="text-6xl font-extrabold text-gray-900 leading-none">HOLE {hole.HoleNumber}</h1>
                    <div className="flex space-x-4 justify-center mt-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-light text-gray-600">Total Yardage</span>
                            <span className="text-2xl font-bold text-gray-900">{hole.TotalYardage}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-light text-gray-600">xScore</span>
                            <span className="inline-block px-3 py-1 text-2xl font-bold rounded-full bg-green-100 text-green-700">
                                {formatScore(hole.ExpectedScore)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* COLUMN 1: STRATEGY & XAPPROACH */}
                <div className="lg:col-span-2 bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 h-fit">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b pb-2">Hole Strategy</h2>
                    
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Tee Shot Commitment</h3>
                        <p className="text-gray-800 leading-relaxed bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
                            {hole.Commitment || "No commitment strategy provided."}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Likely Approach Distance</h3>
                        <p className="text-gray-800 leading-relaxed bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
                        {hole.ApproachDistance ? `${hole.ApproachDistance}yds` : "No approach distance strategy provided."}
                        </p>
                    </div>
                    
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-4 border-b pb-2 mt-6">xApproach - Hole Proximity</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h4 className="text-lg font-semibold text-gray-800 mb-1">Fairway</h4>
                            <p className="text-xl font-bold text-gray-900">{fairwayRange}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h4 className="text-lg font-semibold text-gray-800 mb-1">Rough Cost</h4>
                            <p className="text-xl font-bold text-gray-900">({roughRange})</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h4 className="text-lg font-semibold text-gray-800 mb-1">Sand Cost</h4>
                            <p className="text-xl font-bold text-gray-900">({bunkerRange})</p>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: PROCESS BOX & IMAGE */}
                <div className="lg:col-span-1 space-y-8">
                    
                    {/* 🛑 UPDATED BOX: Matches Hole Strategy Header styling */}
                    <div className="p-6 bg-gray-50 rounded-xl shadow-lg border-2 border-gray-200">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b pb-2">
                            Trust the Process
                        </h2>
                        
                        {/* Subtitle with no line */}
                        <h3 className="text-xl font-bold text-gray-700 mb-4">
                            Skill Intentions
                        </h3>
                        
                        <SkillIntentions />
                    </div>

                    {/* HOLE IMAGE AT THE BOTTOM */}
                    <div>
                        {imageUrl ? (
                            <img 
                                src={imageUrl} 
                                alt={`Hole ${hole.HoleNumber}`} 
                                className="w-full h-auto rounded-xl shadow-lg border border-gray-200" 
                            />
                        ) : (
                            <div className="bg-gray-200 p-6 rounded-xl h-48 flex items-center justify-center text-gray-600 shadow-lg border border-gray-300">
                                Photo not available
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HoleProfilePage;