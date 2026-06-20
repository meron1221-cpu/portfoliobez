'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  Download,
  ChevronDown,
  ChevronUp,
  Building,
  PenTool,
  Camera,
  Ruler,
  Box,
  Palette
} from 'lucide-react'
import { JSX, useEffect, useState, useRef, useCallback } from 'react'

interface Skill {
  name: string
  icon: JSX.Element
  years: string
  proficiency: number // 0-100 scale
  description: string
}

const skills: Skill[] = [
  {
    name: 'Revit',
    icon: <Building className='h-6 w-6' />,
    years: '3+',
    proficiency: 85,
    description: 'Building Information Modeling (BIM) for architectural design'
  },
  {
    name: 'SketchUp',
    icon: <PenTool className='h-6 w-6' />,
    years: '4+',
    proficiency: 90,
    description: '3D modeling for architectural and interior design'
  },
  {
    name: 'Lumion',
    icon: <Camera className='h-6 w-6' />,
    years: '2+',
    proficiency: 75,
    description: '3D rendering and visualization software'
  },
  {
    name: 'AutoCAD',
    icon: <Ruler className='h-6 w-6' />,
    years: '5+',
    proficiency: 88,
    description: '2D and 3D CAD design and drafting'
  },
  {
    name: '3ds Max',
    icon: <Box className='h-6 w-6' />,
    years: '2+',
    proficiency: 70,
    description: '3D modeling, animation, and rendering'
  },
  {
    name: 'Adobe Creative Suite',
    icon: <Palette className='h-6 w-6' />,
    years: '4+',
    proficiency: 82,
    description: 'Photoshop, Illustrator, InDesign for design presentations'
  }
]

const ProficiencyBar = ({
  proficiency,
  className = ''
}: {
  proficiency: number
  className?: string
}) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Animate on mount
    const timer = setTimeout(() => {
      setWidth(proficiency)
    }, 100)
    return () => clearTimeout(timer)
  }, [proficiency])

  return (
    <div
      className={`h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 ${className}`}
    >
      <div
        className='h-full rounded-full bg-gray-900 transition-all duration-700 ease-out dark:bg-gray-100'
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

export default function Skills() {
  const [mounted, setMounted] = useState(false)
  const [openSkill, setOpenSkill] = useState<number | null>(null)
  const [syncedHeights, setSyncedHeights] = useState<{ [key: number]: number }>(
    {}
  )
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const isAnimatingRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  useEffect(() => {
    setMounted(true)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const syncHeights = useCallback(() => {
    const newSyncedHeights: { [key: number]: number } = {}

    // Group cards by row (2 columns on md)
    const rows = [
      [0, 1],
      [2, 3],
      [4, 5]
    ]

    rows.forEach((row) => {
      const openIndices = row.filter((idx) => openSkill === idx)

      if (openIndices.length > 0) {
        openIndices.forEach((idx) => {
          const cardElement = cardRefs.current[idx]
          if (cardElement) {
            const originalHeight = cardElement.style.height
            cardElement.style.height = 'auto'
            const naturalHeight = cardElement.scrollHeight
            cardElement.style.height = originalHeight
            newSyncedHeights[idx] = naturalHeight
          }
        })
      }
    })

    setSyncedHeights(newSyncedHeights)
  }, [openSkill])

  useEffect(() => {
    if (!mounted) return

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    isAnimatingRef.current = true

    timeoutRef.current = setTimeout(() => {
      syncHeights()
      isAnimatingRef.current = false
    }, 350)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [openSkill, mounted, syncHeights])

  useEffect(() => {
    if (!mounted) return

    const handleResize = () => {
      if (!isAnimatingRef.current) {
        syncHeights()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mounted, syncHeights])

  const toggleSkill = (index: number) => {
    setOpenSkill(openSkill === index ? null : index)
  }

  const getCardStyle = useCallback(
    (index: number) => {
      const syncedHeight = syncedHeights[index]
      if (syncedHeight && openSkill === index) {
        return {
          height: `${syncedHeight}px`,
          transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
        }
      }
      return {
        transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
    [syncedHeights, openSkill]
  )

  if (!mounted) {
    return null
  }

  const averageProficiency = Math.round(
    skills.reduce((acc, skill) => acc + skill.proficiency, 0) / skills.length
  )

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/files/Bezawit_Nisrane_CV.pdf'
    link.download = 'Bezawit_Nisrane_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className='bg-background py-16'>
      <div className='container mx-auto max-w-6xl px-4'>
        {/* Header */}
        <div className='mb-16 text-center'>
          <h1 className='mb-4 text-4xl font-bold text-foreground lg:text-5xl'>
            Design & Visualization Skills
          </h1>
          <p className='text-xl text-muted-foreground'>
            Architectural design, 3D modeling, and visualization expertise
          </p>
        </div>

        {/* Stats Cards */}
        <div className='mb-16 grid grid-cols-1 gap-6 md:grid-cols-3'>
          <Card className='border-gray-200 p-6 text-center transition-all hover:shadow-md dark:border-gray-800'>
            <div className='mb-3 flex justify-center'>
              <Building className='h-8 w-8 text-foreground' />
            </div>
            <div className='mb-1 text-2xl font-bold'>{skills.length}</div>
            <div className='text-sm font-medium text-muted-foreground'>
              Software Tools
            </div>
          </Card>

          <Card className='border-gray-200 p-6 text-center transition-all hover:shadow-md dark:border-gray-800'>
            <div className='mb-3 flex justify-center'>
              <PenTool className='h-8 w-8 text-foreground' />
            </div>
            <div className='mb-1 text-2xl font-bold'>{averageProficiency}%</div>
            <div className='text-sm font-medium text-muted-foreground'>
              Avg. Proficiency
            </div>
          </Card>

          <Card className='border-gray-200 p-6 text-center transition-all hover:shadow-md dark:border-gray-800'>
            <div className='mb-3 flex justify-center'>
              <Camera className='h-8 w-8 text-foreground' />
            </div>
            <div className='mb-1 text-2xl font-bold'>4+</div>
            <div className='text-sm font-medium text-muted-foreground'>
              Years Experience
            </div>
          </Card>
        </div>

        {/* Skills Grid */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {skills.map((skill, index) => (
            <Collapsible
              key={index}
              open={openSkill === index}
              onOpenChange={() => toggleSkill(index)}
              className='w-full'
            >
              <div
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                style={getCardStyle(index)}
                className='will-change-height'
              >
                <Card className='h-full overflow-hidden border-2 border-gray-200 bg-background transition-all duration-300 hover:shadow-lg dark:border-gray-800'>
                  <CollapsibleTrigger asChild>
                    <CardHeader className='cursor-pointer rounded-t-lg pb-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-foreground transition-transform duration-200 group-hover:scale-110 dark:bg-gray-800'>
                            {skill.icon}
                          </div>
                          <div className='text-left'>
                            <CardTitle className='text-lg font-semibold'>
                              {skill.name}
                            </CardTitle>
                            <div className='text-sm text-muted-foreground'>
                              {skill.years} years experience
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <Badge
                            variant='outline'
                            className='border-gray-300 text-xs dark:border-gray-700'
                          >
                            {skill.proficiency}% proficient
                          </Badge>
                          {openSkill === index ? (
                            <ChevronUp className='h-5 w-5 text-muted-foreground transition-transform duration-300' />
                          ) : (
                            <ChevronDown className='h-5 w-5 text-muted-foreground transition-transform duration-300' />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent className='transition-all duration-300 ease-in-out'>
                    <CardContent className='space-y-4 pt-0'>
                      <div className='rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50'>
                        <p className='text-sm text-muted-foreground'>
                          {skill.description}
                        </p>
                      </div>
                      
                      <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm font-medium text-muted-foreground'>
                            Proficiency Level
                          </span>
                          <span className='text-sm font-semibold text-foreground'>
                            {skill.proficiency}%
                          </span>
                        </div>
                        <ProficiencyBar proficiency={skill.proficiency} />
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </div>
            </Collapsible>
          ))}
        </div>

        {/* CTA Section */}
        <div className='mt-16 text-center'>
          <p className='mb-6 text-lg text-muted-foreground'>
            Looking for architectural design expertise?
          </p>
          <Button
            onClick={handleDownload}
            size='lg'
            className='transform bg-foreground px-8 text-background transition-all duration-300 hover:scale-105 hover:bg-foreground/90'
            variant='default'
          >
            <Download className='mr-2 h-4 w-4 transition-transform group-hover:translate-y-1' />
            Download Resume
          </Button>
        </div>
      </div>
    </section>
  )
}