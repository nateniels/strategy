// File: src/components/CourseStrategyTips.jsx
import React from 'react';

const mentalCues = [
    { text: "Aggressive to Target", style: "bg-transparent border-slate-900  00 text-gray-900" }, 
    { text: "\"Cocky Confidence\"", style: "bg-transparent border-slate-600 text-gray-900" }, 
    { text: "Same Routine, Every Shot", style: "bg-transparent border-slate-600 text-gray-900" }, 
    { text: "Accelerate", style: "bg-transparent border-slate-600 text-gray-900" }, 
    { text: "Target Mental Picture", style: "bg-transparent border-slate-600 text-gray-900" }, 
    { text: "Be Athletic", style: "bg-transparent border-slate-600 text-gray-900" }, 
    { text: "\"Flow and Feel\"", style: "bg-transparent border-slate-600 text-gray-900" },
    { text: "3 holes x Time", style: "bg-transparent border-slate-600 text-gray-900" }, 
    { text: "\"Be Great\"", style: "bg-transparent border-slate-600 text-gray-900" },
    { text: "Pay Your Caddie", style: "bg-transparent border-slate-600 text-gray-900" }, 
];

// 🛑 EXPORTING THIS SPECIFICALLY FOR THE HOLE PAGE
export const SkillIntentions = () => (
  <div className="grid grid-cols-1 gap-6">
        {/* 1. General Section */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-400 pb-2">General</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 pl-4">
            <li>3-holes at a time</li>
            <li>Same routine, every shot</li>
                <li>Cocky confidence</li>
                <li>Get Back to Zero</li>

            </ul>
        </div>

        {/* 2. Driver Section */}
        <div className="bg-gray-100 p-4 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-400 pb-2">Driver</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 pl-4">
            <li>Hit aggressively to your TARGET</li>
            </ul>
        </div>

        {/* 3. Approach Section */}
        <div className="bg-gray-200 p-4 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-500 pb-2">Approach</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-800 pl-4">
                <li>Mental picture of your TARGET</li>
                <li>Hit aggressively to the TARGET</li>
                <li>Hitting in your simulator ("Simi")</li>

            </ul>
        </div>

        {/* 4. Putter Section */}
        <div className="bg-gray-300 p-4 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-600 pb-2">Putter</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-900 pl-4">
                <li>Hit to Target</li>
                <li>Great putt = [X]" from the hole</li>
        
                <li>Distance control, good tempo</li>
                <li>Ball-lines on short putts</li>
            </ul>
        </div>
    </div>
);

const CourseStrategyTips = () => (
    <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">Trust the Process</h1>
        <div className="p-6 bg-gray-50 rounded-xl shadow-lg border-2 border-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b-2 border-gray-400 pb-2">Tony's Happy Place</h2>
            <p className="text-sm font-bold tracking-widest text-gray-500 mt-2">
                   Swing Thoughts
                </p>
            
            <div className="mt-4 mb-10">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {mentalCues.map((cue, index) => (
                        <div key={index} className={`p-2 h-12 text-xs font-extrabold rounded-lg shadow-sm border flex items-center justify-center text-center transition transform hover:scale-105 ${cue.style}`}>
                            {cue.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* HEADER AND NEW SUBTITLE */}
            <div className="mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-gray-400 pb-2">Skill Intentions</h2>
                <p className="text-sm font-bold tracking-widest text-gray-500 mt-2">
                    Mental Process Reminders
                </p>
            </div>
            
            <SkillIntentions /> 
        </div>
    </div>
);

export default CourseStrategyTips;