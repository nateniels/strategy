// File: HoleTabsNavigation.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Renders a horizontal, scrollable row of buttons for direct hole navigation.
 * @param {Array} sortedHoles - The array of 18 holes for the current course.
 * @param {number} currentHoleNumber - The HoleNumber currently being viewed.
 */
function HoleTabsNavigation({ sortedHoles, currentHoleNumber }) {
    const navigate = useNavigate();

    const courseName = sortedHoles.length > 0 ? sortedHoles[0].CourseName : '';
    const encodedCourseName = encodeURIComponent(courseName);

    const goToHole = (number) => {
        navigate(`/hole/${encodedCourseName}/${number}`);
    };

    return (
        <>
            {/* Inline style for hiding scrollbar (remains the same) */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                    -webkit-overflow-scrolling: touch; 
                }
            `}</style>
            
            <div className="flex overflow-x-auto whitespace-nowrap space-x-2 p-2 bg-gray-100 rounded-xl mb-6 shadow-md hide-scrollbar">
                {sortedHoles.map((hole) => {
                    const holeNum = parseInt(hole.HoleNumber);
                    const isActive = holeNum === currentHoleNumber;
                    
                    const uniqueKey = `${hole.CourseName}-${hole.HoleNumber}`;
                    
                    return (
                        <button
                            key={uniqueKey}
                            onClick={() => goToHole(holeNum)}
                            // 🛑 FIX APPLIED: Added fixed w-10 h-10 and flex centering
                            className={`flex-shrink-0 w-10 h-10 flex items-center justify-center text-sm font-medium rounded-full transition-colors duration-200 
                                ${
                                    isActive
                                        ? 'bg-gray-900 text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
                                }`}
                            aria-label={`Go to Hole ${holeNum}`}
                        >
                            {holeNum}
                        </button>
                    );
                })}
            </div>
        </>
    );
}

export default HoleTabsNavigation;