import { useState } from "react"

const RSVPForm = () => {
    const [formData, setFormData] = useState({
        attendance: "",
        name: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission here
        console.log(formData)
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl text-gold-base text-center script-font mb-8">Тойға қатысуыңызды растауыңызды сұраймыз!</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {/* Radio Buttons */}
                    <div className="flex flex-col gap-3">
                        <label className="flex items-center gap-3">
                            <input type="radio" name="attendance" value="yes" onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} className="w-4 h-4 text-gold-base focus:ring-gold-base" />
                            <span className="text-lg text-black-primary">Иә барамын/барамыз</span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input type="radio" name="attendance" value="no" onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} className="w-4 h-4 text-gold-base focus:ring-gold-base" />
                            <span className="text-lg text-black-primary">Бара алмаймын/алмаймыз</span>
                        </label>
                    </div>

                    {/* Name Input */}
                    <div className="mt-6">
                        <input
                            type="text"
                            placeholder="Есіміңізді жазыңыз"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gold-base/30 rounded-lg focus:outline-none focus:border-gold-base bg-transparent placeholder:text-black-primary/50"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-gold-base text-white py-3 rounded-lg text-lg font-medium hover:bg-gold-base/90 transition duration-300">
                    Жіберу
                </button>
            </form>
        </div>
    )
}

export default RSVPForm
