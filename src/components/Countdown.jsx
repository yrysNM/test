import { useState, useEffect } from "react"

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const targetDate = new Date("2025-07-06T17:00:00+06:00") // Kazakhstan time (UTC+6)
            const now = new Date()
            const difference = targetDate - now

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
                const minutes = Math.floor((difference / 1000 / 60) % 60)
                const seconds = Math.floor((difference / 1000) % 60)

                setTimeLeft({ days, hours, minutes, seconds })
            }
        }

        const timer = setInterval(calculateTimeLeft, 1000)
        calculateTimeLeft() // Initial calculation

        return () => clearInterval(timer)
    }, [])

    const TimeBox = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <div className="bg-gold-base/10 rounded-lg p-4 min-w-[40px] text-center">
                <span className="text-2xl font-semibold text-gold-base">{value}</span>
            </div>
            <span className="text-base mt-2 text-gold-base script-font">{label}</span>
        </div>
    )

    return (
        <div className="flex justify-center gap-4 mt-8">
            <TimeBox value={timeLeft.days} label="күн" />
            <TimeBox value={timeLeft.hours} label="сағат" />
            <TimeBox value={timeLeft.minutes} label="минут" />
            <TimeBox value={timeLeft.seconds} label="секунд" />
        </div>
    )
}

export default Countdown
