import { motion } from "framer-motion";

import { statusList } from "./RSVPForm";

const Modal = ({ isOpen, onClose, formData, error }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black/30 backdrop-blur-[2px]" 
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white/95 rounded-2xl p-8 shadow-xl relative z-10 max-w-md w-11/12 border-2 border-blue-base/20"
            >
                <div className="text-center">
                    {error ? (
                        <>
                            <h3 className="text-2xl font-playfair mb-6 text-red-500">Қате!</h3>
                            <p className="text-lg mb-6 font-montserrat">
                                {error}
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-red-500 text-white px-8 py-2 rounded-full hover:bg-red-600 transition-colors font-montserrat"
                            >
                                Қайта көру
                            </button>
                        </>
                    ) : (
                        <>
                            <h3 className="text-2xl font-playfair mb-6">Рахмет!</h3>
                            <p className="text-lg mb-4 font-montserrat">
                                <span className="capitalize">
                                    {formData.name},
                                </span>
                                сіздің жауабыңыз қабылданды
                            </p>
                            <p className="text-gray-600 mb-6 font-montserrat">
                                {statusList.find((status) => status.value === formData.attendance)?.label}
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-blue-base text-white px-8 py-2 rounded-full transition-colors font-montserrat"
                            >
                                Жабу
                            </button>
                        </>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </motion.div>
        </div>
    );
};

export default Modal;
