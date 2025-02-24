import HeartImg from "../assets/img/heart_input.png";
import { useState } from "react"

const RSVPForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        attendance: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <div className="max-w-md mx-auto p-6 pt-0">
   
            <div className="text-center mb-12">
                <h2 className="text-2xl font-playfair uppercase leading-relaxed font-medium">
                    Тойға келетініңізді
                    <br />
                    растауыңызды
                    <br />
                    сұраймыз
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Есіміңіз"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-6 py-3 border border-gray-300 rounded-full text-2xl focus:outline-none focus:border-blue-400 placeholder:text-2xl"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <img src={HeartImg} alt="heart-img" className="w-6 h-6 object-contain" /> 
                    </div>
                </div>

                <div className="text-left ml-4 space-y-1 font-montserrat">
                    <p className="mb-4 text-base">
                        Жұбыңызбен келсеңіз,
                        <br />
                        есімдеріңізді бірге жаза
                        <br />
                        кетіңіз
                    </p>

                    <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                            <input type="radio" name="attendance" value="Келемін" onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} className="w-5 h-5" />
                            <span>Келемін</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input type="radio" name="attendance" value="Жұбыммен келемін" onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} className="w-5 h-5" />
                            <span>Жұбыммен келемін</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input type="radio" name="attendance" value="Келе алмаймын" onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} className="w-5 h-5" />
                            <span>Келе алмаймын</span>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-6 bg-blue-base text-white rounded-full hover:bg-blue-500 transition-colors font-montserrat"
                >
                    Жауапты жіберу
                </button>
            </form>
        </div>
    )
}

export default RSVPForm
