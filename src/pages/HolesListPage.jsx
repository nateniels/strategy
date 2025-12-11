// File: HolesListPage.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

/**
 * Helper function for consistently formatting the expected score (Par).
 */
const formatScore = (value) => {
    // Rounds the expected score to one decimal place
    const num = parseFloat(value);
    return isNaN(num) ? 'N/A' : num.toFixed(1);
};


/**
 * Holes List Page: Displays a list of holes for a selected course.
 * @param {object} props - Contains allHolesData array.
 */
function HolesListPage({ allHolesData }) {
    // Both encodedCourseName and courseName are correctly retrieved here
    const { courseName: encodedCourseName } = useParams();
    const navigate = useNavigate();
    const courseName = decodeURIComponent(encodedCourseName);

    // Filter holes for the selected course
    const courseHoles = allHolesData.filter(hole => hole.CourseName === courseName);
    
    // Sort holes numerically
    const sortedHoles = courseHoles.sort((a, b) => parseInt(a.HoleNumber) - parseInt(b.HoleNumber));

    // FIX: Update the navigation to include the courseName in the URL
    const handleSelectHole = (holeNumber) => {
        // Navigating to the NEW required route: /hole/:courseName/:holeNumber
        navigate(`/hole/${encodedCourseName}/${holeNumber}`); 
    };

    const goHome = () => {
        navigate('/');
    };

    if (sortedHoles.length === 0) {
        return <div className="p-6 text-red-500">No holes found for this course.</div>;
    }

    return (
        <div className="p-6">
            <button onClick={goHome} className="text-gray-900 flex items-center mb-8 transition duration-150 ease-in-out hover:text-gray-700">
                <ArrowLeftIcon className="h-6 w-6 mr-2" /> 
                <span className="font-semibold">Back to Course Selection</span>
            </button>
            
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">{courseName} Holes</h1>
            
            <div className="grid grid-cols-1 gap-4">
                {sortedHoles.map(hole => (
                    <div
                        key={hole.HoleNumber} 
                        onClick={() => handleSelectHole(hole.HoleNumber)}
                        // 🛑 FIX APPLIED: p-4 changed to py-3 px-4 for reduced vertical size
                        className="bg-white py-3 px-4 rounded-lg shadow border border-gray-200 cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">Hole {hole.HoleNumber}</h2>
                            <div className="text-right">
                                <span className="block text-sm text-gray-500">Yardage: {hole.TotalYardage}</span>
                                <span className="block text-lg font-semibold text-gray-900">Par {formatScore(hole.ExpectedScore)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HolesListPage;