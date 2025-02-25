import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(true)
    const audioRef = useRef(new Audio(require('../assets/music/test1.mp3')))

    useEffect(() => {
        const audio = audioRef.current
        audio.loop = true

        // Listen for the custom event from index.html
        const startMusic = () => {
            audio.play().catch(() => setIsPlaying(false))
        }
        window.addEventListener('userInteracted', startMusic)

        return () => {
            window.removeEventListener('userInteracted', startMusic)
            audio.pause()
            audio.currentTime = 0
        }
    }, [])

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <motion.button
            onClick={togglePlay}
            className="fixed bottom-4 right-4 z-50 bg-white/80 p-3 rounded-full shadow-lg backdrop-blur-sm border border-[#8097c9]/20"
            whileTap={{ scale: 0.95 }}
            animate={{
                rotate: isPlaying ? [0, 360] : 0
            }}
            transition={{
                duration: 4,
                repeat: isPlaying ? Infinity : 0,
                ease: "linear"
            }}
        >
            {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#8097c9]" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#8097c9]" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5l-6 4.5z"/>
                </svg>
            )}
        </motion.button>
    )
}

export default MusicPlayer 