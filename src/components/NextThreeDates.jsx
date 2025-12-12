// File: src/components/NextThreeDates.jsx (FINAL REVISION)

import React, { useState } from 'react';
import nextEvents from '../data/nextEvents'; 

const NextThreeDates = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = nextEvents.length;

    const setCurrentSlideTo = (index) => {
        setCurrentSlide(index);
    };

    // Helper function to render the schedule details
    const ScheduleBlock = ({ events }) => (
        // Kept border-t here as the SINGLE separator line we want inside the card
        <div className="space-y-2 pt-3 border-t border-gray-200">
            {events.map((event, index) => (
                <div key={index} className="flex items-start"> 
                    <span className="font-bold text-base text-gray-800 w-1/4 flex-shrink-0">
                        {event.time}
                    </span>
                    <span className="text-base text-gray-600 ml-3 text-left">
                        {event.description}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="mb-12">
            
            {/* 🛑 NEW: HEADER MATCHING PAGE STYLE 🛑 */}
            <div className="text-center mb-6 pb-2">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-none">
                    TONY'S NEXT <span className="text-yellow-600">THREE</span>
                </h2>
            </div>
            {/* ----------------------------------- */}

            <div className="flex flex-col items-center"> 
                
                {/* Sliding Cards Container */}
                <div className="overflow-hidden w-full max-w-sm mx-auto">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {nextEvents.map((event, index) => (
                            <div 
                                key={index} 
                                // 🛑 SHADOW FIX: Changed shadow-xl to shadow-lg for consistency
                                className="flex-shrink-0 w-full p-4 bg-white border border-gray-300 rounded-2xl shadow-lg space-y-3"
                            >
                                {/* Date Header */}
                                <div className="text-center pb-2 border-gray-200"> {/* Removed border-b here */}
                                    <p className="text-6xl font-extrabold text-yellow-600 leading-none">{event.date}</p>
                                    <p className="text-lg font-semibold text-gray-600 uppercase tracking-widest">{event.dayName}</p>
                                </div>
                                
                                {/* Schedule Body (Uses border-t for the single separation line) */}
                                <ScheduleBlock events={event.events} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* PAGINATION DOTS SECTION */}
                <div className="flex justify-center mt-4 space-x-2">
                    {nextEvents.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlideTo(index)}
                            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                                index === currentSlide
                                    ? 'bg-yellow-600' // Current dot is highlighted
                                    : 'bg-gray-300 hover:bg-gray-400' // Other dots are gray
                            }`}
                            aria-label={`Go to event ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NextThreeDates;