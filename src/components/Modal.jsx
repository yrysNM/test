import React, { useEffect } from "react"

const Modal = ({ isOpen, onClose, formData }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }

        return () => {
            document.body.classList.remove("overflow-hidden")
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold mb-4">Form Data</h2>
                <p>{formData.name}</p>
                <p>{formData.attendance}</p>
                <button onClick={onClose} className="mt-4 py-2 px-4 bg-blue-base text-white rounded-lg">
                    Close
                </button>
            </div>
        </div>
    )
}

export default Modal
