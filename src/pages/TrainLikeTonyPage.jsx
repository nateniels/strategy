// File: src/pages/TrainLikeTonyPage.jsx

import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/solid'; 

const PRE_FILLED_PHONE_NUMBER = '+18012325500'; 

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
    
    const [selectedImage, setSelectedImage] = useState(null); 
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const goHome = () => {
        navigate('/');
    };

    const openImageModal = (link, label) => {
        setSelectedImage({ link, label });
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const openContactModal = () => {
        setIsContactModalOpen(true);
    };

    const closeContactModal = () => {
        setIsContactModalOpen(false);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            
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
                    TRAIN LIKE <span className="text-yellow-600">TONY</span>
                </h1>
                <p className="text-xl text-gray-600 mt-2 font-medium italic">
                    "A Peek Inside the Champion."
                </p>
            </header>

            {/* 🛑 REQUEST BUTTON - MOVED TO TOP & RESTYLED 🛑 */}
            <div className="flex justify-center mb-12">
                <div className="w-full max-w-md p-1 bg-white border border-gray-300 rounded-2xl shadow-lg text-center">
                    <button
                        onClick={openContactModal} 
                        className="w-full py-4 bg-yellow-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-yellow-700 transition-all shadow-md active:scale-95 text-lg"
                    >
                        Request Training Info
                    </button>
                </div>
            </div>

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
                        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 text-center uppercase tracking-tighter">
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
            
            {/* 🛑 MODAL 2: CONTACT MODAL (MATCHES PREVIOUS POPUP LOGIC) */}
            {isContactModalOpen && (
                <div 
                    onClick={closeContactModal} 
                    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    aria-modal="true"
                    role="dialog"
                >
                    <div 
                        onClick={e => e.stopPropagation()} 
                        className="relative bg-white rounded-3xl shadow-2xl max-w-xs w-full p-8 text-center border-2 border-yellow-600"
                    >
                        <button
                            onClick={closeContactModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition"
                            aria-label="Close contact form"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <PhoneIcon className="h-8 w-8 text-yellow-600"/> 
                        </div>

                        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
                            Text Tony's Team
                        </h3>

                        <a 
                            href={`sms:${PRE_FILLED_PHONE_NUMBER}?body=Hi%20Tony%2C%20I'm%20interested%20in%20learning%20more%20about%20your%20training%20plan.`}
                            onClick={closeContactModal} 
                            className="inline-flex items-center justify-center w-full py-4 px-6 
                                bg-green-600 text-white text-lg font-extrabold rounded-xl 
                                shadow-lg transition duration-300 hover:bg-green-700"
                        >
                            <PhoneIcon className="h-5 w-5 mr-3"/>
                            Text Now
                        </a>
                        
                        <p className="mt-4 text-xs text-gray-400 font-bold uppercase tracking-widest">
                            Direct connection to training
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TrainLikeTonyPage;