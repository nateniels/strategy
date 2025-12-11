// File: src/components/TonyHappyPlace.jsx

import React from 'react';

// 🛑 MENTAL CUES: Thin Borders and Black Text
const mentalCues = [
    // Gold/Yellow Tones
    { text: "Hit aggressively to target", style: "bg-transparent border-yellow-500 text-gray-900" }, 
    { text: "\"Confident and Commit\"", style: "bg-transparent border-amber-500 text-gray-900" }, 
    
    // Peach/Orange Tones
    { text: "Same Routine, Every Shot", style: "bg-transparent border-orange-400 text-gray-900" }, 
    { text: "Accelerate", style: "bg-transparent border-orange-500 text-gray-900" }, 
    
    // Muted Yellow / Coral Red
    { text: "Target Mental Picture", style: "bg-transparent border-yellow-300 text-gray-900" }, 
    { text: "Be Athletic", style: "bg-transparent border-red-500 text-gray-900" }, 
    
    // Remaining tones
    { text: "\"Flow and Feel\"", style: "bg-transparent border-yellow-600 text-gray-900" },
    { text: "3 holes x Time", style: "bg-transparent border-gray-400 text-gray-900" }, 
    { text: "\"Be Great\"", style: "bg-transparent border-red-600 text-gray-900" },
    { text: "Pay Your Caddie", style: "bg-transparent border-yellow-500 text-gray-900" }, 

];

const TonyHappyPlace = () => (
    <div className="p-6 bg-gray-50 rounded-xl shadow-lg border-2 border-gray-200">
        
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b-2 border-gray-400 pb-2">
            Tony's Happy Place
        </h2>
        
        <div className="mt-4">
            <h3 className="text-xl font-bold text-gray-700 mb-3">
                Swing Thoughts
            </h3>
            
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