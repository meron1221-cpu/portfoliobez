'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Ruler } from 'lucide-react'

interface ProjectWithPhotos extends ProjectMetadata {
  photos?: string[]
}

export default function Projects({
  projects
}: {
  projects: ProjectWithPhotos[]
}) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<{[key: string]: number}>({})

  console.log('Projects component received:', projects.length, 'projects')

  useEffect(() => {
    const initialIndices: {[key: string]: number} = {}
    projects.forEach(project => {
      if (project.photos && project.photos.length > 0) {
        initialIndices[project.slug] = 0
      }
    })
    setCurrentPhotoIndex(initialIndices)
  }, [projects])

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects available</p>
      </div>
    )
  }

  const nextPhoto = (slug: string, totalPhotos: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentPhotoIndex(prev => ({
      ...prev,
      [slug]: (prev[slug] + 1) % totalPhotos
    }))
  }

  const prevPhoto = (slug: string, totalPhotos: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentPhotoIndex(prev => ({
      ...prev,
      [slug]: (prev[slug] - 1 + totalPhotos) % totalPhotos
    }))
  }

  return (
    <ul className='mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:px-8'>
      {projects.map((project) => {
        const currentIndex = currentPhotoIndex[project.slug] || 0
        const hasPhotos = project.photos && project.photos.length > 0
        const photoCount = hasPhotos ? project.photos!.length : 0

        return (
          <li key={project.slug} className='group'>
            <Card className='overflow-hidden transition-shadow duration-300 hover:shadow-lg'>
              <Link href={`/projects/${project.slug}`}>
                <div className='relative h-64 w-full overflow-hidden bg-muted'>
                  {hasPhotos ? (
                    <>
                      <Image
                        src={project.photos![currentIndex]}
                        alt={project.title || ''}
                        fill
                        className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
                      />

                      {photoCount > 1 && (
                        <>
                          <div className='absolute inset-0 flex items-center justify-between px-2'>
                            <button
                              onClick={(e) => prevPhoto(project.slug, photoCount, e)}
                              className='rounded-full bg-black/50 p-1 text-white transition-opacity hover:bg-black/70 hover:opacity-100'
                              aria-label='Previous photo'
                            >
                              <ChevronLeft className='h-6 w-6' />
                            </button>
                            <button
                              onClick={(e) => nextPhoto(project.slug, photoCount, e)}
                              className='rounded-full bg-black/50 p-1 text-white transition-opacity hover:bg-black/70 hover:opacity-100'
                              aria-label='Next photo'
                            >
                              <ChevronRight className='h-6 w-6' />
                            </button>
                          </div>

                          <div className='absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-xs text-white'>
                            {currentIndex + 1} / {photoCount}
                          </div>

                          <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1'>
                            {Array.from({ length: photoCount }).map((_, idx) => (
                              <div
                                key={idx}
                                className={`h-1.5 w-1.5 rounded-full transition-all ${
                                  idx === currentIndex
                                    ? 'w-3 bg-white'
                                    : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}

                      <div className='absolute inset-0 bg-background/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                      <div className='absolute inset-x-0 bottom-0 translate-y-2 px-6 py-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                        <h2 className='title line-clamp-1 text-xl text-foreground no-underline'>
                          {project.title}
                        </h2>
                      </div>
                    </>
                  ) : (
                    <div className='flex h-full items-center justify-center text-muted-foreground'>
                      No photos available
                    </div>
                  )}
                </div>

                <CardContent className='space-y-3 p-6'>
                  {project.category && (
                    <Badge variant='secondary' className='text-xs'>
                      {project.category}
                    </Badge>
                  )}

                  <h3 className='line-clamp-1 text-lg font-semibold text-foreground'>
                    {project.title || 'Untitled Project'}
                  </h3>

                  <p className='line-clamp-2 text-sm leading-relaxed text-muted-foreground'>
                    {project.summary || 'No summary available'}
                  </p>

                  <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                    {project.location && (
                      <span className='flex items-center gap-1'>
                        <MapPin className='h-3 w-3' />
                        {project.location}
                      </span>
                    )}
                    {project.area && (
                      <span className='flex items-center gap-1'>
                        <Ruler className='h-3 w-3' />
                        {project.area}
                      </span>
                    )}
                    {project.publishedAt && (
                      <span>{formatDate(project.publishedAt)}</span>
                    )}
                  </div>
                </CardContent>
              </Link>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}