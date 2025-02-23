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
            const targetDate = new Date("2025-07-06T19:00:00+06:00")
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
        calculateTimeLeft()

        return () => clearInterval(timer)
    }, [])

    const TimeBox = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <div className="bg-gold-base text-white rounded-lg p-6 min-w-[100px]">
                <span className="text-4xl font-bold">{value}</span>
            </div>
            <span className="text-lg mt-3 text-gold-base">{label}</span>
        </div>
    )

    return (
        <div className="flex flex-wrap justify-center gap-6">
            <TimeBox value={timeLeft.days} label="күн" />
            <TimeBox value={timeLeft.hours} label="сағат" />
            <TimeBox value={timeLeft.minutes} label="минут" />
            <TimeBox value={timeLeft.seconds} label="секунд" />
        </div>
    )
}

export default Countdown
