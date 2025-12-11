import React, { useState, useCallback } from 'react';

// --- Carousel Data (Must be consistent with ImageCarousel.jsx) ---
const carouselItems = [
    {
        type: 'image',
        src: 'https://i.imgur.com/j5HaqUs.jpeg',
        alt: 'Golf Course Overview Banner',
        link: 'https://www.pgawest.com/golf', 
    },
    {
        type: 'image',
        src: 'https://i.imgur.com/WkdOZmd.png',
        alt: 'South Hills Dental Specialists Banner',
        link: 'https://www.southhillsdentalspecialists.com/orthodontics/new-patients/',
    },
    {
        type: 'card',
        alt: 'Train Like Tony Performance Card',
        link: '/path/to/tony-training-pdf.pdf', 
    },
];

const HoleCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const numItems = carouselItems.length; 
    
    // --- Navigation Logic ---
    const goToSlide = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    // --- Content Rendering (Simplified) ---
    const currentItem = carouselItems[currentIndex];
    const renderContent = () => {
        return (
            <a href={currentItem.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <div className="flex items-center justify-center h-[300px] bg-gray-200">
                    <h2 className="text-xl font-bold">{currentItem.alt}</h2>
                </div>
            </a>
        );
    };
    
    return (
        <div className="w-full">
            
            {/* **SCROLLABLE HOLE TABS (For Hole Profile Page)** */}
            <div className="flex overflow-x-auto whitespace-nowrap space-x-2 p-2 bg-gray-100 rounded-t-xl mb-4 scrollbar-hide">
                {carouselItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                            index === currentIndex
                                ? 'bg-gray-900 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-200'
                        }`}
                        aria-label={`Go to hole ${index + 1}`}
                    >
                        Hole {index + 1}
                    </button>
                ))}
            </div>
            {/* END OF HOLE TABS */}
            
            <div 
                className="relative overflow-hidden rounded-b-xl shadow-2xl"
                role="group"
                tabIndex="0"
            >
                <div 
                    className="transition-transform duration-500 ease-in-out" 
                    style={{ 
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }} 
                >
                    <div className="flex" style={{ width: `${numItems * 100}%` }}>
                        {carouselItems.map((item, index) => (
                            <div key={index} className="w-full flex-shrink-0" style={{ width: `${100 / numItems}%` }}>
                                {renderContent(index)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoleCarousel;