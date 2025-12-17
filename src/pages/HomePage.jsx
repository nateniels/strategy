// File: HomePage.jsx (Updated)

import React from 'react';
import ImageCarousel from '../components/ImageCarousel'; 
import CourseStrategyTips from '../components/CourseStrategyTips'; 
import CourseSelectionList from '../components/CourseSelectionList';
import MentalStrategyAccordion from '../components/MentalStrategyAccordion';
import NextThreeDates from '../components/NextThreeDates'; 
import InfoRequest from '../components/InfoRequest'; // 🛑 ADD THIS
import { useNavigate } from 'react-router-dom'; // 🛑 CHECK FOR THIS


function HomePage({ allHolesData }) {

    const uniqueCourses = [...new Set(allHolesData.map(hole => hole.CourseName))];
    const navigate = useNavigate(); // 🛑 CHECK FOR THIS

    return (
        <div className="p-6">
            
            {/* 🛑 UPDATED HEADER SECTION 🛑 */}
            <header className="text-center mb-10 pt-4 pb-6 border-b-2 border-gray-100">
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-none">
                    TOURNAMENT <span className="text-yellow-600">READY</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mt-3 font-semibold tracking-wide">
                    — Preparing for Pressure —
                </p>
            </header>
            {/* --------------------------------------------- */}
            
                {/* --- 1. CAROUSEL BANNER (Increased Margin) --- */}
                <div className="mb-16"> 
                <ImageCarousel />
            </div>

            {/* ⛳️ FOLLOW MY ROUND BUTTON */}
<div className="flex justify-center mb-10">
    <button 
        onClick={() => navigate('/live-round')}
        // Changed to: bigger text (text-2xl), white bg, gold border, and gold hover effect
        className="py-5 px-10 bg-white border-2 border-yellow-600 text-gray-900 text-2xl font-black uppercase rounded-full shadow-xl transition-all duration-300 hover:bg-yellow-600 hover:text-white transform hover:scale-105"
    >
        ⛳️ Follow My Round
    </button>
</div>

                   {/* --- 3. COURSE SELECTION LIST (Wrapped for Margin) --- */}
                   <div className="mb-16">
                <CourseSelectionList uniqueCourses={uniqueCourses} />
            </div>

            {/* --- TONY'S NEXT 3 SECTION (Wrapped for Margin) --- */}
            <div className="mb-16">
                <NextThreeDates />
            </div>

            {/* 🛑 NEW: TRAIN LIKE TONY SECTION 🛑 */}
            <div className="mb-16">
                <InfoRequest />
            </div>
            
   

            {/* --- 2. STATIC STRATEGIES (Wrapped for Margin) --- */}
            <div className="mb-16">
                <CourseStrategyTips />
            </div>

            {/* --- 4. MENTAL STRATEGY (Final Section - No bottom margin needed) --- */}
            <MentalStrategyAccordion />
            
        </div>



    );


}

export default HomePage;