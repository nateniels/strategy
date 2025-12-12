// File: src/components/CourseStrategyTips.jsx
import React from 'react';

// 🛑 UPDATED STYLING: Thin Border (border) and Text Color (text-gray-900)
const mentalCues = [
    // FFCB63 / FFDA73 (Gold/Yellow Tones)
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


const CourseStrategyTips = () => (
    <div className="mb-12">
        {/* Main Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">Trust the Process</h1>
        
        {/* FIX 1: Wrap all main sections in a single container for consistent nesting */}
        <div className="p-6 bg-gray-50 rounded-xl shadow-lg border-2 border-gray-200">
            
            {/* SECTION A: TONY'S HAPPY PLACE (Mental Cues) */}
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b-2 border-gray-400 pb-2">
                Tony's Happy Place
            </h2>
            
            <div className="mt-4 mb-10">
                <h3 className="text-xl font-bold text-gray-700 mb-3">
                    Swing Thoughts
                </h3>
                
                {/* GRID CONTAINER FOR THE SQUARES */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {mentalCues.map((cue, index) => (
                        <div 
                            key={index} 
                            // 🛑 FIX: Changed border-2 to border (thinner)
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


            {/* SECTION B: SKILL INTENTIONS (Club Tips) */}
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b-2 border-gray-400 pb-2">
                Skill Intentions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Driver Section */}
                <div className="bg-gray-100 p-4 rounded-xl shadow-md">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-400 pb-2">Driver</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 pl-4">
                        <li>Hold follow through</li>
                        <li>Commit to your target</li>
                    </ul>
                </div>

                {/* 2. Approach Section */}
                <div className="bg-gray-200 p-4 rounded-xl shadow-md">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-500 pb-2">Approach</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-800 pl-4">
                        <li>Mental target picture</li>
                        <li>Wedges - aim left cup</li>
                    </ul>
                </div>

                {/* 3. Putter Section */}
                <div className="bg-gray-300 p-4 rounded-xl shadow-md">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-600 pb-2">Putter</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-900 pl-4">
                        <li>Soft grip/left hand</li>
                        <li>Hit with shoulder and body</li>
                        <li>Get excited about the perfect putt</li>
                        <li>Eyes down</li>
                        <li>Tempo</li>
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
);

export default CourseStrategyTips;