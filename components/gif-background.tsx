"use client"

import { useEffect, useState } from "react"
import { OptimizedImage } from "./optimized-image"

interface GifBackgroundProps {
  src: string
  fallbackSrc?: string
  className?: string
  alt?: string
  priority?: boolean
}

export function GifBackground({
  src,
  fallbackSrc,
  className = "",
  alt = "Background animation",
  priority = false
}: GifBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setIsLoaded(true)
    img.onerror = () => setHasError(true)
    img.src = src
  }, [src])

  if (hasError && fallbackSrc) {
    return (
      <OptimizedImage
        src={fallbackSrc}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        priority={priority}
        quality={85}
        sizes="100vw"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-black animate-pulse" />
      )}
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority={priority}
        quality={85}
        sizes="100vw"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  )
}
