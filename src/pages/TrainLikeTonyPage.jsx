// File: src/pages/TrainLikeTonyPage.jsx

import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/solid'; 

const PRE_FILLED_PHONE_NUMBER = '+18012325500'; // Define the contact number

const imageLinks = [
    'https://i.imgur.com/DRVvCTi.jpeg',
    'https://i.imgur.com/nA8buWx.jpeg',
    'https://i.imgur.com/FQr2KGX.jpeg',
    'https://i.imgur.com/foE4Myd.jpeg',
    'https://i.imgur.com/MYNnbIv.jpeg',
];

const imageLabels = [
    'Plan Overview',
    'System for Analyzing Your Game',
    'My Golf Development Plan',
    'Enhancing Habits Through Variability',
    'Finding Your Zone',
];


function TrainLikeTonyPage() {
    const navigate = useNavigate();
    
    // STATE 1: For the image viewer modal
    const [selectedImage, setSelectedImage] = useState(null); 
    // STATE 2: For the new contact request modal
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const goHome = () => {
        navigate('/');
    };

    // Image Modal Handlers
    const openImageModal = (link, label) => {
        setSelectedImage({ link, label });
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    // Contact Modal Handlers
    const openContactModal = () => {
        setIsContactModalOpen(true);
    };

    const closeContactModal = () => {
        setIsContactModalOpen(false);
    };

    return (
        <div className="p-6">
            
            {/* ---------------------------------------------------- */}
            {/* --- MAIN PAGE CONTENT (ALWAYS VISIBLE) ---           */}
            {/* ---------------------------------------------------- */}

            {/* --- BACK BUTTON --- */}
            <button 
                onClick={goHome} 
                className="text-gray-900 flex items-center mb-8 transition duration-150 ease-in-out hover:text-gray-700"
                aria-label="Return to Home Page"
            >
                <ArrowLeftIcon className="h-6 w-6 mr-2" /> 
                <span className="font-semibold">Return to Home Page</span>
            </button>
            
            {/* --- HEADER --- */}
            <header className="text-center mb-10 pb-4 border-b-2 border-gray-900">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                    <span className="text-yellow-600">TRAIN</span> LIKE TONY
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                    A Peak Inside the Champion.
                </p>
            </header>

            {/* --- IMAGE GALLERY --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {imageLinks.map((link, index) => {
                    const label = imageLabels[index];
                    return (
                        <div 
                            key={index} 
                            onClick={() => openImageModal(link, label)}
                            className="flex flex-col items-center bg-white rounded-xl shadow-lg border border-gray-100 p-4 cursor-pointer transition transform hover:shadow-xl hover:scale-[1.02]"
                        >
                            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b-2 border-gray-200 pb-1 w-full text-center">
                                {label}
                            </h3>
                            <img 
                                src={link} 
                                alt={label} 
                                className="w-full h-auto object-cover rounded-lg shadow-md aspect-video"
                            />
                        </div>
                    );
                })}
            </div>

            {/* --- REQUEST BUTTON (Opens Contact Modal) --- */}
            <div className="flex justify-center my-10">
                <button
                    onClick={openContactModal} 
                    className="inline-block py-4 px-8 bg-gray-900 text-white text-xl font-bold uppercase rounded-lg shadow-2xl transition duration-300 transform hover:scale-105 hover:bg-yellow-600 hover:text-gray-900"
                >
                    Want to train more intentionally? Request more info here.
                </button>
            </div>
            
            {/* ---------------------------------------------------- */}
            {/* --- MODALS (CONDITIONAL AND FIXED) ---               */}
            {/* ---------------------------------------------------- */}
            
            {/* 🛑 MODAL 1: IMAGE LIGHTBOX */}
            {selectedImage && (
                <div 
                    onClick={closeImageModal} 
                    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
                    aria-modal="true"
                    role="dialog"
                >
                    <div 
                        onClick={e => e.stopPropagation()}
                        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full p-4 md:p-6"
                    >
                        <button
                            onClick={closeImageModal} 
                            className="absolute top-2 right-2 text-white bg-gray-900 rounded-full p-2 opacity-80 hover:opacity-100 transition"
                            aria-label="Close image viewer"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 text-center">
                            {selectedImage.label}
                        </h3>
                        
                        <img 
                            src={selectedImage.link} 
                            alt={selectedImage.label} 
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            )}
            
            {/* 🛑 MODAL 2: CONTACT MODAL */}
            {isContactModalOpen && (
                <div 
                    onClick={closeContactModal} 
                    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
                    aria-modal="true"
                    role="dialog"
                >
                    <div 
                        onClick={e => e.stopPropagation()} 
                        className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center"
                    >
                        <button
                            onClick={closeContactModal}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-900 transition"
                            aria-label="Close contact form"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        <PhoneIcon className="h-10 w-10 text-yellow-600 mx-auto mb-4"/>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Contact Tony's Team
                        </h3>

                        <a 
                            href={`tel:${PRE_FILLED_PHONE_NUMBER}`}
                            onClick={closeContactModal} 
                            className="inline-flex items-center justify-center w-full py-3 px-6 
                                bg-green-600 text-white text-lg font-extrabold rounded-lg 
                                shadow-lg transition duration-300 hover:bg-green-700"
                        >
                            <PhoneIcon className="h-5 w-5 mr-3"/>
                            Call Now: {PRE_FILLED_PHONE_NUMBER}
                        </a>
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default TrainLikeTonyPage;