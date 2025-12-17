// File: ImageCarousel.jsx

import React, { useState, useCallback, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const TONY_IMAGE_URL = 'https://i.imgur.com/Q4eVzXC.jpeg'; 

// --- Dedicated Nav Button Component ---
const NavButton = ({ onClick, icon: Icon, ariaLabel, isLeft }) => {
    
    const handleEventStart = useCallback((e) => {
        // Fix: Only stop propagation, do NOT preventDefault
        e.stopPropagation(); 
    }, []);

    const handleClick = useCallback((e) => {
        e.stopPropagation();
        onClick(); // Execute the prop function (prevSlide/nextSlide)
    }, [onClick]);

    return (
        <button
            onClick={handleClick}
            onMouseDown={handleEventStart}
            onTouchStart={handleEventStart}
            className={`absolute top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition duration-300 z-50 ${isLeft ? 'left-4' : 'right-4'}`}
            aria-label={ariaLabel}
        >
            <Icon className="h-5 w-5" />
        </button>
    );
};
// --------------------------------------------------------------------------

const carouselItems = [
    {
        type: 'image',
        src: 'https://i.imgur.com/zp1PtIM.png',
        alt: 'Golf Course Overview Banner',
        link: 'https://sites.google.com/pgahq.com/25pganationalclubchampionship/mens', 
    },
    {
        type: 'image',
        src: 'https://i.imgur.com/d6ePz0n.png',
        alt: 'South Hills Dental Specialists Banner',
        link: 'https://www.southhillsdentalspecialists.com/orthodontics/new-patients/',
    },
  //  {
   //     type: 'card',
  //      alt: 'Train Like Tony Performance Card',
   //     link: '/train-like-tony', 
   //     cardImage: TONY_IMAGE_URL,
  //  },
];

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isWrapping, setIsWrapping] = useState(false); 
    
    const [touchStartX, setTouchStartX] = useState(null);
    const [isSwiping, setIsSwiping] = useState(false);
    const numItems = carouselItems.length; // Correctly 3

    useEffect(() => {
        if (isWrapping) {
            const timer = setTimeout(() => setIsWrapping(false), 50); 
            return () => clearTimeout(timer);
        }
    }, [isWrapping]);

    // 🛑 SLIDE LOGIC: Dependencies (numItems) are correctly included
    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === 0) {
                setIsWrapping(true); 
                return numItems - 1;
            }
            return prevIndex - 1;
        });
    }, [numItems]); // Dependency must be here

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex === numItems - 1 ? 0 : prevIndex + 1;
            
            if (prevIndex === numItems - 1) {
                setIsWrapping(true); 
            }
            return nextIndex;
        });
    }, [numItems]); // Dependency must be here
    // --------------------------------------------------------------------
    
    // --- SWIPE/DRAG LOGIC (Omitted for brevity) ---
    const handleTouchStart = (e) => {
        setIsSwiping(false);
        setTouchStartX(e.touches ? e.touches[0].clientX : e.clientX);
    };

    const handleTouchMove = () => {
        setIsSwiping(true);
    };

    const handleTouchEnd = (e) => {
        if (touchStartX === null) return;
        
        const touchEndX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const deltaX = touchEndX - touchStartX;
        
        const SWIPE_THRESHOLD = 50;

        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        
        setTouchStartX(null);
        setTimeout(() => setIsSwiping(false), 10);
    };
    
    const handleLinkClick = (e) => {
        if (isSwiping) {
            e.preventDefault();
        }
    };

    const currentItem = carouselItems[currentIndex];
    
    // --- PIE CHART STYLING (Code omitted for brevity) ---
    const renderContent = () => {
        const isInternalLink = currentItem.link && currentItem.link.startsWith('/');
        const targetAttr = isInternalLink ? '_self' : '_blank'; 
        const relAttr = isInternalLink ? '' : 'noopener noreferrer';

        return (
            <a 
                href={currentItem.link} 
                target={targetAttr} 
                rel={relAttr} 
                className="block w-full h-full"
                aria-label={currentItem.alt}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleLinkClick}
                onDragStart={(e) => e.preventDefault()}
            >
                {/* Regular Image Slide */}
                {currentItem.type === 'image' && (
                    <img 
                        src={currentItem.src} 
                        alt={currentItem.alt} 
                        className="w-full h-auto object-cover mask-image-faded" 
                        style={{ height: '300px' }} 
                    />
                )}
                
                {/* Custom Card Slide (Train Like Tony) */}
                {currentItem.type === 'card' && (
                    <div className="flex flex-col items-center justify-center p-0 bg-white rounded-xl shadow-2xl h-[300px] overflow-hidden">
                        
                        <img
                            src={currentItem.cardImage} 
                            alt={currentItem.alt} 
                            className="w-full h-full object-cover transition duration-300 transform hover:scale-105" 
                        />
                        
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <h2 className="text-3xl font-extrabold text-white uppercase px-4 py-2 bg-gray-900 bg-opacity-70 rounded-lg">
                                {currentItem.alt}
                            </h2>
                        </div>
                    </div>
                )}
            </a>
        );
    };
    
    // Dynamically set the class name: remove transition when wrapping
    const transitionClass = isWrapping 
        ? 'transition-none' 
        : 'transition-transform duration-500 ease-in-out';

    return (
        <div 
            className="relative overflow-hidden rounded-xl shadow-2xl w-full"
            role="group"
            tabIndex="0"
        >
            <div 
                className={transitionClass} 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {/* Container width set for 3 items */}
                <div className="flex w-[300%]">
                    {carouselItems.map((item, index) => (
                        <div key={index} className="w-1/3 flex-shrink-0">
                            {renderContent()} 
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <NavButton onClick={prevSlide} icon={ArrowLeftIcon} ariaLabel="Previous Slide" isLeft={true} />
            <NavButton onClick={nextSlide} icon={ArrowRightIcon} ariaLabel="Next Slide" isLeft={false} />
            
            {/* Dots/Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {carouselItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            index === currentIndex ? 'bg-gray-900' : 'bg-gray-400 opacity-50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;