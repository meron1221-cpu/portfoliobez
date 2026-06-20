'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'

// Sample certificates data - replace with your actual certificates
const certificates = [
  {
    id: 1,
    title: 'Best Project of the Year',
    institution: 'Bahir Dar University',
    date: 'Jun 2025',
    image: '/images/certificates/udacity.png',
    downloadUrl: '#'
  },
  {
    id: 2,
    title: 'Full Stack Web Development',
    institution: 'FreeCodeCamp',
    date: 'Dec 2024',
    image: '/placeholder.svg?height=400&width=600',
    downloadUrl: '#'
  },
  {
    id: 3,
    title: 'React Developer Certification',
    institution: 'Meta',
    date: 'Nov 2024',
    image: '/placeholder.svg?height=400&width=600',
    downloadUrl: '#'
  },
  {
    id: 4,
    title: 'Node.js Backend Development',
    institution: 'IBM',
    date: 'Oct 2024',
    image: '/placeholder.svg?height=400&width=600',
    downloadUrl: '#'
  }
]

export default function Certificates() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + certificates.length) % certificates.length
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const currentCertificate = certificates[currentIndex]

  return (
    <section className='bg-background py-16'>
      <div className='container mx-auto max-w-6xl px-4'>
        {/* Header */}
        <div className='mb-16 text-center'>
          <h1 className='mb-4 text-4xl font-bold text-primary lg:text-5xl'>
            Certificates
          </h1>
          <p className='text-xl text-muted-foreground'>My Achievements</p>
        </div>

        {/* Carousel */}
        <div className='relative mx-auto max-w-4xl'>
          {/* Navigation Arrows */}
          <Button
            variant='ghost'
            size='icon'
            className='absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background'
            onClick={prevSlide}
          >
            <ChevronLeft className='h-6 w-6' />
          </Button>

          <Button
            variant='ghost'
            size='icon'
            className='absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background'
            onClick={nextSlide}
          >
            <ChevronRight className='h-6 w-6' />
          </Button>

          {/* Certificate Card */}
          <Card className='mx-12'>
            <CardContent className='p-8 text-center'>
              {/* Certificate Title */}
              <h2 className='mb-2 text-2xl font-bold text-foreground lg:text-3xl'>
                {currentCertificate.title}
              </h2>

              {/* Institution */}
              <p className='mb-1 text-lg text-muted-foreground'>
                {currentCertificate.institution}
              </p>

              {/* Date */}
              <p className='mb-8 text-sm text-muted-foreground'>
                {currentCertificate.date}
              </p>

              {/* Certificate Image */}
              <div className='relative mx-auto mb-8 w-full max-w-2xl'>
                <div className='relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-muted'>
                  <Image
                    src={currentCertificate.image || '/placeholder.svg'}
                    alt={currentCertificate.title}
                    fill
                    className='object-cover'
                  />
                </div>
              </div>

              {/* Download Button */}
              <Button size='lg' className='px-8' asChild>
                <a href={currentCertificate.downloadUrl} download>
                  <Download className='mr-2 h-4 w-4' />
                  Download
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Pagination Dots */}
          <div className='mt-8 flex justify-center space-x-2'>
            {certificates.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-primary'
                    : 'bg-muted-foreground/30'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
