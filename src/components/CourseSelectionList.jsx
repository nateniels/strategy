// File: src/components/CourseSelectionList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Renders a list of selectable course buttons.
 * @param {Array<string>} uniqueCourses - Array of unique course names.
 */
const CourseSelectionList = ({ uniqueCourses }) => {
    const navigate = useNavigate();

    const handleSelectCourse = (courseName) => {
        // Use encodeURIComponent to handle spaces or special characters in course names
        navigate(`/course/${encodeURIComponent(courseName)}`);
    };

    return (
        <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">Course Strategies</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {uniqueCourses.map(courseName => (
                    <div
                        key={courseName}
                        onClick={() => handleSelectCourse(courseName)}
                        className="bg-white py-4 px-6 rounded-xl shadow-lg border border-gray-200 cursor-pointer transition transform duration-200 ease-in-out hover:shadow-xl hover:scale-[1.02]"
                        role="button"
                        tabIndex="0"
                        aria-label={`View strategy for ${courseName}`}
                    >
                        <h2 className="text-2xl font-bold text-gray-900">{courseName}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseSelectionList;