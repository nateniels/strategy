// File: src/components/TonyHappyPlace.jsx

import React from 'react';

// 🛑 MENTAL CUES: Thin Borders and Black Text
const mentalCues = [
    // Gold/Yellow Tones
    { text: "Aggressive to Target", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    { text: "\"Confident and Commit\"", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    
    // FFC085 / FF9A7A (Peach/Orange Tones)
    { text: "Same Routine, Every Shot", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    { text: "Accelerate", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    
    // FFF296 / F06060 (Muted Yellow / Coral Red)
    { text: "Target Mental Picture", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    { text: "Be Athletic", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    
    // Remaining tones
    { text: "\"Flow and Feel\"", style: "bg-transparent border-yellow-600 text-gray-900" },
    { text: "3 holes x Time", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    { text: "\"Be Great\"", style: "bg-transparent border-yellow-600 text-gray-900" },
    { text: "Pay Your Caddie", style: "bg-transparent border-yellow-600 text-gray-900" }, 

];

const TonyHappyPlace = () => (
    <div className="p-6 bg-gray-50 rounded-xl shadow-lg border-2 border-gray-200">
        
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b-2 border-gray-400 pb-2">
            Tony's Happy Place
        </h2>
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mt-2">
                    Mental Process Reminders
                </p>
        
        <div className="mt-4">

            
            {/* GRID CONTAINER FOR THE SQUARES */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {mentalCues.map((cue, index) => (
                    <div 
                        key={index} 
                        className={`p-2 h-12 text-sm font-extrabold rounded-lg shadow-sm border 
                            flex items-center justify-center text-center 
                            transition transform hover:scale-105 
                            ${cue.style}`}
                    >
                        {cue.text}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default TonyHappyPlace;