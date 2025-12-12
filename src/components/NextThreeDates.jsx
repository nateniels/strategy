// File: src/components/NextThreeDates.jsx (DATE CIRCLES INTEGRATED INTO CARD)

import React, { useState } from 'react';
import nextEvents from '../data/nextEvents'; 

const NextThreeDates = () => {
    // STATE CONTROLS WHICH EVENT IS DISPLAYED
    const [currentEventIndex, setCurrentEventIndex] = useState(0); 
    const totalEvents = nextEvents.length;
    
    // Get the currently selected event data
    const selectedEvent = nextEvents[currentEventIndex];

    // --- Schedule Block: Renders the time/description details ---
    const ScheduleBlock = ({ events }) => (
        // Uses border-t as the single separator line we want inside the card
        <div className="space-y-2 pt-2 border-t border-gray-200">
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
            
            {/* HEADER MATCHING PAGE STYLE */}
            <div className="text-center mb-6 pb-2">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-none">
                    TONY'S NEXT <span className="text-yellow-600">THREE</span>
                </h2>
            </div>

            <div className="flex flex-col items-center"> 
                
                {/* 🛑 MAIN CARD CONTAINER 🛑 */}
                <div 
                    className="w-full max-w-sm mx-auto p-4 bg-white border border-gray-300 rounded-2xl shadow-lg space-y-3"
                > 
                    
                    {/* 🛑 1. DATE CIRCLE SELECTOR (NEW HEADER) 🛑 */}
                    <div className="flex justify-center space-x-4 pb-1">
                        {nextEvents.map((event, index) => {
                            const isActive = index === currentEventIndex;
                            
                            return (
                                <button
                                    key={index}
                                    onClick={() => setCurrentEventIndex(index)}
                                    // Styling for the date circle (like Hole Selector)
                                    className={`flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center text-sm font-bold rounded-full transition-colors duration-200 p-1
                                        ${
                                            isActive
                                                ? 'bg-yellow-600 text-white shadow-md' // Highlighted yellow
                                                : 'bg-white text-gray-800 hover:bg-gray-200 border border-gray-300'
                                        }`}
                                    aria-label={`Select ${event.dayName}, the ${event.date}th`}
                                >
                                    {/* Big Date Number */}
                                    <span className="text-xl leading-none">{event.date}</span>
                                    {/* Day Name (Smaller) */}
                                    <span className="text-xs font-normal uppercase">{event.dayName.slice(0, 3)}</span> 
                                </button>
                            );
                        })}
                    </div>
                    {/* ------------------------------------------- */}

                    {/* 🛑 2. SCHEDULE BODY (The content that changes) 🛑 */}
                    <ScheduleBlock events={selectedEvent.events} />
                </div>
                {/* -------------------------------------------------- */}
                
            </div>
        </div>
    );
};

export default NextThreeDates;