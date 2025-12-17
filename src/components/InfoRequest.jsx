// File: src/components/InfoRequest.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { ChatBubbleLeftRightIcon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/solid';

const InfoRequest = () => {
    const [showPop, setShowPop] = useState(false);

    const PHONE_NUMBER = "801-232-5500"; 
    const SMS_MESSAGE = "Hi Tony, I'm interested in learning more about your training plan.";

    return (
        <div className="mb-12">
            <div className="text-center mb-6 pb-2">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-none uppercase">
                    Train Like <span className="text-yellow-600">Tony?</span>
                </h2>
            </div>

            <div className="flex flex-col items-center px-4"> 
                {/* CARD CONTAINER */}
                <div className="w-full max-w-sm mx-auto p-6 bg-white border border-gray-300 rounded-2xl shadow-lg space-y-4 text-center">
                    
                    <p className="text-base text-gray-600 leading-snug font-medium">
                        Connect with Tony's Team to learn about his training, mental approach, and performance systems.
                    </p>

                    {/* STRATEGY BUTTON - Gold Outline / Black Text */}
                    <Link 
                        to="/train-like-tony" 
                        className="block w-full py-4 bg-transparent border-2 border-yellow-600 text-gray-900 font-bold uppercase tracking-widest rounded-xl hover:bg-yellow-50 transition-all active:scale-95"
                    >
                        Tony's Development Strategy
                    </Link>

                    {/* REQUEST INFO BUTTON - Gold Outline / Black Text */}
                    <button 
                        onClick={() => setShowPop(true)}
                        className="w-full py-4 bg-transparent border-2 border-yellow-600 text-gray-900 font-bold uppercase tracking-widest rounded-xl hover:bg-yellow-50 transition-all active:scale-95"
                    >
                        Request Info
                    </button>
                </div>
            </div>

            {/* POPUP MODAL */}
            {showPop && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-xs w-full shadow-2xl relative border border-gray-200">
                        <button 
                            onClick={() => setShowPop(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                        
                        <div className="text-center">
                            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ChatBubbleLeftRightIcon className="h-8 w-8 text-yellow-600" />
                            </div>
                            
                            <h3 className="text-2xl font-black text-gray-900 uppercase mb-6 tracking-tighter">
                                Text Tony's Team
                            </h3>
                            
                            <a 
                                href={`sms:${PHONE_NUMBER}?body=${encodeURIComponent(SMS_MESSAGE)}`}
                                onClick={() => setShowPop(false)} 
                                className="inline-flex items-center justify-center w-full py-4 px-6 
                                    bg-green-600 text-white text-lg font-extrabold rounded-xl 
                                    shadow-lg transition duration-300 hover:bg-green-700"
                            >
                                <PhoneIcon className="h-5 w-5 mr-3"/>
                                Text Now
                            </a>

                            <p className="mt-4 text-xs text-gray-400 font-bold uppercase tracking-widest">
                                Response within 24 hours
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoRequest;