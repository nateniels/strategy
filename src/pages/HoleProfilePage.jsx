// File: HoleProfilePage.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; 
import HoleTabsNavigation from '../components/HoleTabsNavigation.jsx'; 
import TonyHappyPlace from '../components/TonyHappyPlace.jsx'; // 🛑 NEW IMPORT

/**
 * Helper function for consistently formatting the expected score (Par).
 */
const formatScore = (value) => {
    // ... (rest of formatScore function remains the same)
    const num = parseFloat(value);
    return isNaN(num) ? 'N/A' : num.toFixed(1);
};

// Helper to format the range between two numbers: min - max
const formatRange = (val1, val2, unit = '') => {
    // ... (rest of formatRange function remains the same)
    const num1 = parseFloat(val1 || 0);
    const num2 = parseFloat(val2 || 0);
    const min = Math.min(num1, num2).toFixed(0);
    const max = Math.max(num1, num2).toFixed(0);
    return `${min}-${max}${unit}`;
};


/**
 * Hole Profile Page: Shows detailed strategy and cost data for one hole.
 * @param {object} props - Contains allHolesData array.
 */
function HoleProfilePage({ allHolesData }) {
    
    // FIX 1: Read BOTH courseName and holeNumber from the URL
    const { 
        courseName: encodedCourseName, 
        holeNumber: currentHoleNumStr 
    } = useParams();
    
    // Graceful exit if parameters are missing 
    if (!encodedCourseName || !currentHoleNumStr) {
         return <div className="p-6 text-red-500">Missing Course or Hole number in URL. Check your application's routing.</div>;
    }
    
    const courseName = decodeURIComponent(encodedCourseName);
    const currentHoleNumber = parseInt(currentHoleNumStr); 
    const navigate = useNavigate();

    // FIX 2: Filter data to include ONLY the current course (18 holes)
    const currentCourseHoles = allHolesData
        .filter(hole => hole.CourseName === courseName)
        .sort((a, b) => parseInt(a.HoleNumber) - parseInt(b.HoleNumber)); 

    // Find the current hole object within the filtered list
    const hole = currentCourseHoles.find(h => 
        parseInt(h.HoleNumber) === currentHoleNumber
    );

    if (!hole) {
        return <div className="p-6 text-red-500">Hole data for {courseName} - Hole {currentHoleNumber} not found.</div>;
    }
    
    // --- Navigation Handlers ---
    const goBack = () => {
        // Navigate back to the list of holes for the current course
        navigate(`/course/${encodedCourseName}`);
    };
    
    // --- xApproach Calculation Logic (Unchanged) ---
    const fairwayRange = formatRange(hole.ApproachFairway30, hole.ApproachFairway70, 'yds');
    
    const roughCost30Abs = Math.abs(parseFloat(hole.RoughCost30 || 0));
    const roughCost70Abs = Math.abs(parseFloat(hole.RoughCost70 || 0));
    const roughRange = formatRange(roughCost30Abs, roughCost70Abs, 'yds'); 
    const roughCostRangeDisplay = `(${roughRange})`;

    const bunkerCost30Abs = Math.abs(parseFloat(hole.BunkerCost30 || 0));
    const bunkerCost70Abs = Math.abs(parseFloat(hole.BunkerCost70 || 0));
    const bunkerRange = formatRange(bunkerCost30Abs, bunkerCost70Abs, 'yds'); 
    const bunkerCostRangeDisplay = `(${bunkerRange})`;
    
    const imageUrl = hole.PhotoURL; 

    return (
        <div className="p-6">
            <button onClick={goBack} className="text-gray-900 flex items-center mb-8 transition duration-150 ease-in-out hover:text-gray-700">
                <ArrowLeftIcon className="h-6 w-6 mr-2" /> 
                <span className="font-semibold">Back to {courseName} Holes</span>
            </button>

            {/* FIX 3: Pass ONLY the filtered list (18 holes) to the Tabs component */}
            <HoleTabsNavigation 
                sortedHoles={currentCourseHoles} 
                currentHoleNumber={currentHoleNumber} 
            />

            <div className="flex justify-center items-center mb-6 border-b pb-4">
                <div className="text-center">
                    
                    {/* Course Name / Hole Number / Yardage / Expected Score (Header Block) */}
                    <p className="text-xl font-medium text-gray-500 tracking-wide mb-1">
                        {courseName}
                    </p>

                    <h1 className="text-6xl font-extrabold text-gray-900 leading-none">
                        HOLE {hole.HoleNumber}
                    </h1>

                    <div className="flex space-x-4 justify-center mt-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-light text-gray-600">Total Yardage</span>
                            <span className="text-2xl font-bold text-gray-900">{hole.TotalYardage}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm font-light text-gray-600">xScore</span>
                            <span 
                                className="inline-block px-3 py-1 text-2xl font-bold rounded-full bg-green-100 text-green-700 shadow-md"
                            >
                                {formatScore(hole.ExpectedScore)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* --- STRATEGY AND XAPPROACH ANALYSIS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                
                {/* COLUMN 1: STRATEGY & XAPPROACH (2/3 width) */}
                <div className="lg:col-span-2 bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
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
                        {hole.ApproachDistance 
                                ? `${hole.ApproachDistance}yds` 
                                : "No approach distance strategy provided."}
                        </p>
                    </div>
                    
                    {/* ... (rest of the content is unchanged) ... */}
                    
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-4 border-b pb-2 mt-6">xApproach - Hole Proximity</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-lg font-semibold text-gray-800 mb-1 text-center">Fairway</h4>
                            <p className="text-gray-700 text-center text-xl font-bold text-gray-900">
                                {fairwayRange}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-lg font-semibold text-gray-800 mb-1 text-center">Rough Cost</h4>
                            <p className="text-gray-700 text-center text-xl font-bold text-gray-900">
                                {roughCostRangeDisplay}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-lg font-semibold text-gray-800 mb-1 text-center">Sand Cost</h4>
                            <p className="text-gray-700 text-center text-xl font-bold text-gray-900">
                                {bunkerCostRangeDisplay}
                            </p>
                        </div>
                    </div>
                </div>
                <TonyHappyPlace />

                {/* COLUMN 2: IMAGE/MAP & TONY'S HAPPY PLACE (1/3 width) */}
                <div className="lg:col-span-1">
                    <div className="mb-8"> {/* Container for the image */}
                        {imageUrl ? (
                            <img 
                                src={imageUrl} 
                                alt={`Photo of Hole ${hole.HoleNumber}`} 
                                className="w-full h-auto rounded-xl shadow-lg border border-gray-200"
                            />
                        ) : (
                            <div className="bg-gray-200 p-6 rounded-xl h-48 flex items-center justify-center text-gray-600 shadow-lg border border-gray-300">
                                Photo not available
                            </div>
                        )}
                    </div>
                    
                    {/* 🛑 PLACEMENT: Tony's Happy Place component below the image/map */}
                </div>
            </div>
        </div>
    );
}

export default HoleProfilePage;