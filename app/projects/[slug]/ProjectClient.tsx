'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, ReactNode } from 'react'
import { formatDate } from '@/lib/utils'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

// Lightbox component for full-screen viewing
function Lightbox({ 
  images, 
  currentIndex, 
  onClose, 
  onPrev, 
  onNext 
}: { 
  images: string[], 
  currentIndex: number, 
  onClose: () => void, 
  onPrev: () => void, 
  onNext: () => void 
}) {
  if (!images || images.length === 0) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>
      
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      <div 
        className="relative h-[80vh] w-[90vw] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Project image ${currentIndex + 1}`}
          fill
          className="object-contain"
          priority
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-black/50 px-3 py-1 text-sm text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}

export default function ProjectClient({
  title,
  author,
  publishedAt,
  photos,
  mdxContent,
  slug
}: {
  title?: string
  author?: string
  publishedAt?: string
  photos: string[]
  mdxContent: ReactNode
  slug: string
}) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const hasPhotos = photos && photos.length > 0

  const nextPhoto = () => {
    if (!hasPhotos) return
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    if (!hasPhotos) return
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextLightbox = () => {
    if (!hasPhotos) return
    setLightboxIndex((prev) => (prev + 1) % photos.length)
  }

  const prevLightbox = () => {
    if (!hasPhotos) return
    setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        {/* Back Button */}
        <Link
          href='/projects'
          className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to projects</span>
        </Link>

        {/* Title */}
        <header>
          <h1 className='title'>{title}</h1>
          <p className='mt-3 text-xs text-muted-foreground'>
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        {/* Photo Gallery with Navigation */}
        {hasPhotos && (
          <div className='relative mt-6 overflow-hidden rounded-lg'>
            {/* Main Image */}
            <div 
              className='relative h-96 w-full cursor-pointer bg-muted'
              onClick={() => openLightbox(currentPhotoIndex)}
            >
              <Image
                src={photos[currentPhotoIndex]}
                alt={`${title || 'Project'} - Photo ${currentPhotoIndex + 1}`}
                fill
                className='object-cover'
                priority
              />
              
              {/* Expand button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  openLightbox(currentPhotoIndex)
                }}
                className='absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white transition-opacity hover:bg-black/70'
                aria-label="Expand image"
              >
                <Maximize2 className='h-4 w-4' />
              </button>
            </div>

            {/* Navigation Controls */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-opacity hover:bg-black/70'
                  aria-label='Previous photo'
                >
                  <ChevronLeft className='h-6 w-6' />
                </button>
                <button
                  onClick={nextPhoto}
                  className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-opacity hover:bg-black/70'
                  aria-label='Next photo'
                >
                  <ChevronRight className='h-6 w-6' />
                </button>

                {/* Photo Counter */}
                <div className='absolute bottom-3 right-3 rounded bg-black/50 px-3 py-1 text-sm text-white'>
                  {currentPhotoIndex + 1} / {photos.length}
                </div>

                {/* Dots Indicator */}
                <div className='absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2'>
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentPhotoIndex 
                          ? 'w-6 bg-white' 
                          : 'w-2 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to photo ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Thumbnail Strip */}
        {hasPhotos && photos.length > 1 && (
          <div className='mt-4 flex gap-2 overflow-x-auto pb-2'>
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md transition-all ${
                  index === currentPhotoIndex 
                    ? 'ring-2 ring-foreground ring-offset-2' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className='object-cover'
                />
              </button>
            ))}
          </div>
        )}

        {/* MDX Content - Rendered on server, passed as prop */}
        <main className='prose mt-8 max-w-none dark:prose-invert'>
          {mdxContent}
        </main>
      </div>

      {/* Lightbox */}
      {lightboxOpen && hasPhotos && (
        <Lightbox
          images={photos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </section>
  )
}