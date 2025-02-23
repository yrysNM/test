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
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl text-gold-base script-font mb-8">Келетініңізді растаңыз</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <input type="text" placeholder="Есіміңіз" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-6 py-4 border-2 border-gold-base rounded-lg bg-transparent text-lg focus:outline-none" />

                <div className="space-y-4">
                    <label className="flex items-center gap-4 text-lg cursor-pointer">
                        <input type="radio" name="attendance" value="Келемін" onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} className="w-5 h-5 text-gold-base" />
                        Келемін
                    </label>
                    <label className="flex items-center gap-4 text-lg cursor-pointer">
                        <input type="radio" name="attendance" value="Жұбыммен келемін" onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} className="w-5 h-5 text-gold-base" />
                        Жұбыммен келемін
                    </label>
                    <label className="flex items-center gap-4 text-lg cursor-pointer">
                        <input type="radio" name="attendance" value="Келе алмаймын" onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} className="w-5 h-5 text-gold-base" />
                        Келе алмаймын
                    </label>
                </div>

                <button type="submit" className="w-full bg-gold-base text-white py-4 rounded-lg text-xl font-medium hover:bg-gold-base/90 transition duration-300">
                    Жіберу
                </button>
            </form>
        </div>
    )
}

export default RSVPForm
