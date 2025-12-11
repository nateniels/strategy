// File: HomePage.jsx

import React from 'react';
// Assuming these imports are now correct based on the previous refactor
import ImageCarousel from '../components/ImageCarousel'; 
import CourseStrategyTips from '../components/CourseStrategyTips'; 
import CourseSelectionList from '../components/CourseSelectionList';
import MentalStrategyAccordion from '../components/MentalStrategyAccordion';

/**
 * Home Page: Displays the promotional carousel, static tips, and dynamic course list.
 * It extracts unique course names from allHolesData.
 * @param {object} props - Contains allHolesData array.
 */
function HomePage({ allHolesData }) {

    // Logic remains clean: Extract unique course names (e.g., "Course A", "Course B", "Course C")
    const uniqueCourses = [...new Set(allHolesData.map(hole => hole.CourseName))];

    return (
        <div className="p-6">
            
            {/* 🛑 NEW: TOURNAMENT READY HEADER SECTION 🛑 */}
            <header className="text-center mb-10 pt-4 pb-6 border-b-2 border-gray-100">
                
                {/* Main Title: Large, Extrabold, contrasting color on 'Ready' */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-none">
                    TOURNAMENT <span className="text-yellow-600">READY</span>
                </h1>
                
                {/* Subtitle: Slightly smaller, slightly lighter text */}
                <p className="text-xl md:text-2xl text-gray-600 mt-3 font-semibold tracking-wide">
                    — Preparing for Pressure —
                </p>
            </header>
            {/* --------------------------------------------- */}
            
            {/* --- 1. CAROUSEL BANNER --- */}
            {/* The carousel mb-12 provides separation from the header */}
            <div className="mb-12">
                <ImageCarousel />
            </div>
            
            {/* Removed the first <hr /> to reduce visual clutter after the strong header */}
            {/* <hr className="my-12 border-t-2 border-gray-200" /> */}

            {/* --- 2. STATIC STRATEGIES --- */}
            <CourseStrategyTips />

            <hr className="my-12 border-t-2 border-gray-200" />

            {/* --- 3. COURSE SELECTION LIST --- */}
            {/* This component handles routing to /course/:courseName */}
            <CourseSelectionList uniqueCourses={uniqueCourses} />

        {/* --- 4. NEW SECTION MOVED TO THE BOTTOM (Mental Strategy) --- */}
        <hr className="my-12 border-t-2 border-gray-200" />
            <MentalStrategyAccordion />
            
        </div>
    );
}

export default HomePage;