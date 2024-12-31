'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

const phrases = [
  "Getting things ready for you...",
  "Almost done...",
  "This may take a while...",
  "Preparing your experience...",
  "Just a moment longer...",
]

export function useLoadingPhrases(isLoading: boolean) {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0])

  useEffect(() => {
    if (!isLoading) return

    const intervalId = setInterval(() => {
      setCurrentPhrase(prevPhrase => {
        const currentIndex = phrases.indexOf(prevPhrase)
        const nextIndex = (currentIndex + 1) % phrases.length
        return phrases[nextIndex]
      })
    }, 5000)

    return () => clearInterval(intervalId)
  }, [isLoading])

  return currentPhrase
}

interface LoadingOverlayProps {
  phrase: string
}

export function LoadingOverlay({ phrase }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="mt-4 text-lg font-semibold text-gray-700 text-center min-w-[200px]">{phrase}</p>
      </div>
    </div>
  )
}
