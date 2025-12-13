// File: src/components/CourseStrategyTips.jsx
import React from 'react';

const mentalCues = [
    { text: "Aggressive to Target", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    { text: "\"Cocky Confidence\"", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    { text: "Same Routine, Every Shot", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    { text: "Accelerate", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    { text: "Target Mental Picture", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    { text: "Be Athletic", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    { text: "\"Flow and Feel\"", style: "bg-transparent border-yellow-600 text-gray-900" },
    { text: "3 holes x Time", style: "bg-transparent border-yellow-600 text-gray-900" }, 
    { text: "\"Be Great\"", style: "bg-transparent border-yellow-600 text-gray-900" },
    { text: "Pay Your Caddie", style: "bg-transparent border-yellow-600 text-gray-900" }, 
];

// 🛑 EXPORTING THIS SPECIFICALLY FOR THE HOLE PAGE
export const SkillIntentions = () => (
    /* We use a single column grid for the side-bar view, 
       but it will still look like the original cards */
    <div className="grid grid-cols-1 gap-6">
        {/* 1. General Section */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-400 pb-2">General</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 pl-4">
                <li>Cocky confidence</li>
                <li>Same routine, every shot</li>
                <li>3-holes at a time</li>
            </ul>
        </div>

        {/* 2. Driver Section */}
        <div className="bg-gray-100 p-4 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-400 pb-2">Driver</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 pl-4">
                <li>Hold follow through</li>
                <li>Hit aggressively to your TARGET</li>
            </ul>
        </div>

        {/* 3. Approach Section */}
        <div className="bg-gray-200 p-4 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-500 pb-2">Approach</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-800 pl-4">
                <li>Mental picture your TARGET</li>
                <li>Hit aggressively to the TARGET</li>
            </ul>
        </div>

        {/* 4. Putter Section */}
        <div className="bg-gray-300 p-4 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-600 pb-2">Putter</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-900 pl-4">
                <li>Hit to Target</li>
                <li>Good tempo, eyes down</li>
                <li>Weight front foot</li>
                <li>Distance control</li>
            </ul>
        </div>
    </div>
);

const CourseStrategyTips = () => (
    <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">Trust the Process</h1>
        <div className="p-6 bg-gray-50 rounded-xl shadow-lg border-2 border-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b-2 border-gray-400 pb-2">Tony's Happy Place</h2>
            <div className="mt-4 mb-10">
                <h3 className="text-xl font-bold text-gray-700 mb-3">Swing Thoughts</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {mentalCues.map((cue, index) => (
                        <div key={index} className={`p-2 h-12 text-xs font-extrabold rounded-lg shadow-sm border flex items-center justify-center text-center transition transform hover:scale-105 ${cue.style}`}>
                            {cue.text}
                        </div>
                    ))}
                </div>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b-2 border-gray-400 pb-2">Skill Intentions</h2>
            <SkillIntentions /> 
        </div>
    </div>
);

export default CourseStrategyTips;