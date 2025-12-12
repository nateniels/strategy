// File: src/components/MentalStrategyAccordion.jsx

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon } from '@heroicons/react/24/solid'; 

// 🛑 CUSTOM IMAGE LINK
const CUSTOM_LOGO_URL = 'https://decade.golf/wp-content/uploads/2023/03/Decade_Logo_color-2.png'; 

// 🛑 HELPER DATA: Putting Stats for comparison table
const puttingStats = [
    { distance: "0-5'", pros: 97, you: 93 },
    { distance: "6-12'", pros: 46, you: 43 },
    { distance: "13-18'", pros: 23, you: 19 },
    { distance: "19-24'", pros: 14, you: 12 },
    { distance: "25-30'", pros: 9, you: 7 },
];

const accordionData = [
    {
        id: 1,
        title: "Birdies < Bogeys",
        subtitle: "Intention: Chase Pars.",
        sections: [
            { 
                title: "Double Bogeys", 
                content: "The result of playing for birdies. Manage expectations and play for a par or bogey. When to be aggressive = risk of double bogey is zero."
            },
            { 
                title: "Bogeys on Par 5s", 
                content: "Forcing Birdies leads to penalties. Don't take on hazards with your second shot. Gaining a stroke is not worth losing one."
            },
            { 
                title: "Three Putts", 
                content: "Speed control, speed control, speed control. You aren't trying to jam 20-30ft birdies. Focus on pace, put it close, and take the 2-putt."
            },
            { 
                title: "Blown Easy Saves", 
                content: "Take the bogey rather than playing a hero shot. Hit the chip you can do in your sleep give yourself a 50/50 chance at par."
            },
            { 
                title: "Bogeys with 9-iron or Less", 
                content: "Play your dispersion, not your perfect shot. Don't go flag-hunting unless it’s truly safe."
            },
        ]
    },
    {
        id: 2,
        title: "Breathe, Heart Rate, Breathe.",
        subtitle: "Staying in the Present.",
        sections: [],
        video: {
            title: "Dr. Andrew Huberman: Physiological Sigh",
            embedCode: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/kSZKIupBUuc" title="Breathing Techniques to Reduce Stress and Anxiety — Dr. Andrew Huberman on the Physiological Sigh" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-image; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        }
    },
    {
        id: 3,
        title: '"What is the Point?"',
        subtitle: "Scottie Scheffler's Gospel.",
        sections: [],
        video: {
            title: "Scottie Scheffler: Finding Perspective",
            embedCode: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/_tPU9iCxflc" title="&quot;Sometimes I just don&#39;t understand the point.&quot; - Scottie Scheffler | #Golf" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-image; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        }
    },
    // 🛑 ACCORDION ITEM 4: Putting Comparison
    {
        id: 4,
        title: '"Putt Ye Therefore Perfect"',
        subtitle: "How Jesus Putts vs. How You Putt",
        sections: [],
        tableData: puttingStats 
    }
];

// 🛑 HELPER FUNCTION: Conditional coloring based on percentage
const getColorClass = (percentage) => {
    if (percentage >= 70) {
        return 'text-green-600 font-extrabold'; // Green (70-100)
    } else if (percentage > 30) {
        return 'text-gray-900 font-semibold';  // Black (30-70)
    } else {
        return 'text-red-600 font-bold';       // Red (30 or less)
    }
};

const MentalStrategyAccordion = () => {
    const [openItem, setOpenItem] = useState(null);

    const toggleItem = (id) => {
        setOpenItem(openItem === id ? null : id);
    };

    return (
        <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 border-b-2 pb-2">
                You Will Hit Bad Shots
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-semibold tracking-wide">
                Training helps and reminders.
            </p>

            <div className="space-y-4">
                {accordionData.map(item => (
                    <div 
                        key={item.id} 
                        className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                    >
                        {/* Accordion Header */}
                        <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full flex justify-between items-center p-5 text-left bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out"
                            aria-expanded={openItem === item.id}
                        >
                            <div className="flex items-center"> 
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                        {/* 🛑 TITLE AND LOGO PLACEMENT */}
                                        {item.title}
                                        {item.id === 1 && (
                                            <img 
                                                src={CUSTOM_LOGO_URL}
                                                alt="Strategy Logo"
                                                className="h-7 w-auto ml-3 flex-shrink-0" // Increased size to h-6
                                            />
                                        )}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
                                </div>
                            </div>
                            {openItem === item.id ? (
                                <ChevronUpIcon className="h-6 w-6 text-yellow-600" />
                            ) : (
                                <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                            )}
                        </button>

                        {/* Accordion Content */}
                        {openItem === item.id && (
                            <div className="p-5 bg-white">
                                
                                {/* Detailed Tips (ID 1) */}
                                {item.sections.length > 0 && (
                                    <div className="space-y-4">
                                        {item.sections.map((section, index) => (
                                            <div key={index} className="flex space-x-3">
<div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm mt-1">
            {index + 1}
        </div>                                                <div>
                                                    <h4 className="text-base font-bold text-gray-800">{section.title}</h4>
                                                    <p className="text-sm text-gray-600">{section.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Putting Table (ID 4) */}
                                {item.tableData && (
                                    <div className="mt-4 w-full overflow-x-auto">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">1-Putt % By Distance</h3>
                                        <table className="min-w-full divide-y divide-gray-300 border border-gray-200 rounded-lg shadow-sm">
                                            <thead className="bg-gray-100">
                                                <tr>

                                                <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase w-1/3">Distance (Ft.)</th>
                                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase w-1/3">Pros %</th>
                                                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase w-1/3">You %</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {item.tableData.map((row, index) => {
                                                    const prosValue = row.pros;
                                                    const youValue = row.you;

                                                    return (
                                                        <tr key={index} className="hover:bg-gray-50">
                                                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{row.distance}</td>
                                                            
                                                            <td className={`px-3 py-2 whitespace-nowrap text-center text-base ${getColorClass(prosValue)}`}>
                                                                {prosValue}%
                                                            </td>
                                                            
                                                            <td className={`px-3 py-2 whitespace-nowrap text-center text-base ${getColorClass(youValue)}`}>
                                                                {youValue}%
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Embedded Videos (ID 2 & 3) */}
                                {item.video && (
                                    <div className="mt-4 aspect-w-16 aspect-h-9">
                                        <div dangerouslySetInnerHTML={{ __html: item.video.embedCode }} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MentalStrategyAccordion;