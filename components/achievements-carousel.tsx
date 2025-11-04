"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface AchievementItem {
  id: string
  name: string
  imageSrc: string
}

export function AchievementsCarousel({ achievements }: { achievements: AchievementItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % achievements.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlay, achievements.length])

  const getPrevIndex = () => (currentIndex - 1 + achievements.length) % achievements.length
  const getNextIndex = () => (currentIndex + 1) % achievements.length

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + achievements.length) % achievements.length)
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black py-8 px-4">
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute -top-24 left-1/3 w-[600px] h-[600px] bg-red-600/30 blur-[180px] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/20 blur-[160px] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        />
      </div>

      <div className="relative w-full max-w-6xl z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-2xl text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Accolade Collection
        </motion.h2>

        <div className="relative w-full flex items-center justify-center gap-4 md:gap-6">
          {/* Left Preview (Blurred) */}
          <motion.div
            className="hidden md:block relative w-1/4 aspect-video rounded-xl overflow-hidden opacity-75"
            animate={{
              scale: [0.95, 1, 0.95],
              y: [5, -5, 5],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <Image
              src={achievements[getPrevIndex()].imageSrc || "/placeholder.svg"}
              alt="Previous"
              fill
              className="object-contain bg-black blur-xs"
            />
            <div className="absolute inset-0 bg-black/15 backdrop-blur-sm" />
          </motion.div>

          {/* Center Main Carousel */}
          <div className="relative w-full md:w-1/2 aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-2 ring-red-600/50">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={achievements[currentIndex].imageSrc || "/placeholder.svg"}
                  alt={achievements[currentIndex].name}
                  fill
                  className="object-contain bg-black"
                  priority
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col items-center justify-end p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-white text-center tracking-wider drop-shadow-2xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {achievements[currentIndex].name}
                  </motion.h3>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.button
              onClick={() => {
                paginate(-1)
                setIsAutoPlay(false)
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={() => {
                paginate(1)
                setIsAutoPlay(false)
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Right Preview (Blurred) */}
          <motion.div
            className="hidden md:block relative w-1/4 aspect-video rounded-xl overflow-hidden opacity-75"
            animate={{
              scale: [0.95, 1, 0.95],
              y: [5, -5, 5],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
          >
            <Image
              src={achievements[getNextIndex()].imageSrc || "/placeholder.svg"}
              alt="Next"
              fill
              className="object-contain bg-black blur-xs"
            />
            <div className="absolute inset-0 bg-black/15 backdrop-blur-sm" />
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {achievements.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
                setIsAutoPlay(false)
              }}
              className={`h-3 rounded-full transition-all cursor-pointer ${
                index === currentIndex ? "bg-red-600 w-8" : "bg-gray-500 w-3 hover:bg-gray-400"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
