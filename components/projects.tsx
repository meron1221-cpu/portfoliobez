import Image from 'next/image'
import Link from 'next/link'
import type { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function Projects({
  projects
}: {
  projects: ProjectMetadata[]
}) {
  return (
    <ul className='mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:px-8'>
      {projects.map((project) => (
        <li key={project.slug} className='group'>
          <Card className='overflow-hidden transition-shadow duration-300 hover:shadow-lg'>
            <Link href={`/projects/${project.slug}`}>
              {/* Image with Hover Overlay */}
              {project.image && (
                <div className='relative h-64 w-full overflow-hidden bg-muted'>
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={project.title || ''}
                    fill
                    className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
                  />

                  {/* Hover Overlay */}
                  <div className='absolute inset-0 bg-background/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

                  {/* Hover Title */}
                  <div className='absolute inset-x-0 bottom-0 translate-y-2 px-6 py-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                    <h2 className='title line-clamp-1 text-xl text-foreground no-underline'>
                      {project.title}
                    </h2>
                  </div>
                </div>
              )}

              {/* Content Below Image */}
              <CardContent className='space-y-3 p-6'>
                {/* Category Badge */}
                {project.category && (
                  <Badge variant='secondary' className='text-xs'>
                    {project.category}
                  </Badge>
                )}

                {/* Title */}
                <h3 className='line-clamp-1 text-lg font-semibold text-foreground'>
                  {project.title}
                </h3>

                {/* Summary */}
                <p className='line-clamp-2 text-sm leading-relaxed text-muted-foreground'>
                  {project.summary}
                </p>

                {/* Date */}
                <p className='text-xs font-light text-muted-foreground'>
                  {formatDate(project.publishedAt ?? '')}
                </p>
              </CardContent>
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  )
}
