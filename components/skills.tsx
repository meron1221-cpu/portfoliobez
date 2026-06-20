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
  SiDocker,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiLaravel,
  SiFlutter,
  SiFirebase,
  SiGit,
  SiGithub,
  SiJupyter,
  SiCplusplus
} from 'react-icons/si'
import {
  Award,
  Star,
  Target,
  BookOpen,
  Download,
  Code,
  Brain,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { JSX, useEffect, useState, useRef, useCallback } from 'react'

interface Skill {
  name: string
  icon: JSX.Element
  years: string
  proficiency: number // 0-100 scale
}

interface SkillCategory {
  title: string
  icon: JSX.Element
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Expert Proficiency',
    icon: <Award className='h-5 w-5' />,
    skills: [
      {
        name: 'JavaScript',
        icon: <SiJavascript className='h-5 w-5' />,
        years: '5+',
        proficiency: 95
      },
      {
        name: 'React',
        icon: <SiReact className='h-5 w-5' />,
        years: '4+',
        proficiency: 90
      },
      {
        name: 'TypeScript',
        icon: <SiTypescript className='h-5 w-5' />,
        years: '3+',
        proficiency: 88
      },
      {
        name: 'Next.js',
        icon: <SiNextdotjs className='h-5 w-5' />,
        years: '3+',
        proficiency: 85
      },
      {
        name: 'HTML',
        icon: <SiHtml5 className='h-5 w-5' />,
        years: '6+',
        proficiency: 95
      },
      {
        name: 'CSS',
        icon: <SiCss3 className='h-5 w-5' />,
        years: '6+',
        proficiency: 90
      },
      {
        name: 'Git',
        icon: <SiGit className='h-5 w-5' />,
        years: '5+',
        proficiency: 92
      },
      {
        name: 'GitHub',
        icon: <SiGithub className='h-5 w-5' />,
        years: '5+',
        proficiency: 90
      },
      {
        name: 'Laravel',
        icon: <SiLaravel className='h-5 w-5' />,
        years: '2+',
        proficiency: 60
      },
      {
        name: 'Tailwind CSS',
        icon: <SiTailwindcss className='h-5 w-5' />,
        years: '3+',
        proficiency: 85
      },
      {
        name: 'Node.js',
        icon: <SiNodedotjs className='h-5 w-5' />,
        years: '3+',
        proficiency: 80
      },
      {
        name: 'Express',
        icon: <SiExpress className='h-5 w-5' />,
        years: '2+',
        proficiency: 68
      },
      {
        name: 'MongoDB',
        icon: <SiMongodb className='h-5 w-5' />,
        years: '2+',
        proficiency: 62
      }
    ]
  },
  {
    title: 'Advanced Skills',
    icon: <Star className='h-5 w-5' />,
    skills: [
      {
        name: 'C++',
        icon: <SiCplusplus className='h-5 w-5' />,
        years: '3+',
        proficiency: 78
      },
      {
        name: 'PostgreSQL',
        icon: <SiPostgresql className='h-5 w-5' />,
        years: '2+',
        proficiency: 78
      },
      {
        name: 'Firebase',
        icon: <SiFirebase className='h-5 w-5' />,
        years: '2+',
        proficiency: 72
      },
      {
        name: 'Flutter',
        icon: <SiFlutter className='h-5 w-5' />,
        years: '2+',
        proficiency: 70
      }
    ]
  },
  {
    title: 'Intermediate Knowledge',
    icon: <Target className='h-5 w-5' />,
    skills: [
      {
        name: 'Python',
        icon: <SiPython className='h-5 w-5' />,
        years: '4+',
        proficiency: 75
      },
      {
        name: 'Docker',
        icon: <SiDocker className='h-5 w-5' />,
        years: '1+',
        proficiency: 65
      }
    ]
  },
  {
    title: 'Currently Exploring',
    icon: <BookOpen className='h-5 w-5' />,
    skills: [
      {
        name: 'Jupyter',
        icon: <SiJupyter className='h-5 w-5' />,
        years: '<1',
        proficiency: 40
      },
      {
        name: 'Vue.js',
        icon: <SiVuedotjs className='h-5 w-5' />,
        years: '<1',
        proficiency: 45
      }
    ]
  }
]

const ProficiencyBar = ({
  proficiency,
  className = ''
}: {
  proficiency: number
  className?: string
}) => {
  return (
    <div
      className={`h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 ${className}`}
    >
      <div
        className='h-full rounded-full bg-gray-900 transition-all duration-700 ease-out dark:bg-gray-100'
        style={{ width: `${proficiency}%` }}
      />
    </div>
  )
}

export default function Skills() {
  const [mounted, setMounted] = useState(false)
  const [openCategories, setOpenCategories] = useState<boolean[]>([
    false,
    false,
    false,
    false
  ])
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

  // Function to measure and sync heights for each row independently
  const syncHeights = useCallback(() => {
    // Group cards by row (each row has 2 cards in md:grid-cols-2)
    const rows = [
      [0, 1], // First row: indices 0 and 1
      [2, 3] // Second row: indices 2 and 3
    ]

    const newSyncedHeights: { [key: number]: number } = {}

    rows.forEach((row) => {
      // Get open cards in this row
      const openIndicesInRow = row.filter((idx) => openCategories[idx])

      if (openIndicesInRow.length >= 2) {
        // Measure heights of open cards in this row
        const heights: number[] = []

        openIndicesInRow.forEach((idx) => {
          const cardElement = cardRefs.current[idx]
          if (cardElement) {
            // Temporarily set height to auto to get natural height
            const originalHeight = cardElement.style.height
            cardElement.style.height = 'auto'
            const naturalHeight = cardElement.scrollHeight
            cardElement.style.height = originalHeight

            heights.push(naturalHeight)
          }
        })

        if (heights.length > 0) {
          const maxHeight = Math.max(...heights)

          // Set the max height for all open cards in this row
          openIndicesInRow.forEach((idx) => {
            newSyncedHeights[idx] = maxHeight
          })
        }
      }
    })

    setSyncedHeights(newSyncedHeights)
  }, [openCategories])

  // Measure heights after open state changes and after animations complete
  useEffect(() => {
    if (!mounted) return

    // Clear previous timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // Mark as animating
    isAnimatingRef.current = true

    // Wait for the collapsible animation to complete before syncing heights
    timeoutRef.current = setTimeout(() => {
      syncHeights()
      isAnimatingRef.current = false
    }, 350) // Slightly longer than transition duration for smoothness

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [openCategories, mounted, syncHeights])

  // Also measure on window resize
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

  const toggleCategory = (index: number) => {
    setOpenCategories((prev) => {
      const newState = [...prev]
      newState[index] = !newState[index]
      return newState
    })
  }

  // Function to get dynamic height style for a card with smooth transition
  const getCardStyle = useCallback(
    (index: number) => {
      const syncedHeight = syncedHeights[index]
      if (syncedHeight && openCategories[index]) {
        return {
          height: `${syncedHeight}px`,
          transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
        }
      }
      return {
        transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
    [syncedHeights, openCategories]
  )

  if (!mounted) {
    return null
  }

  const totalSkills = skillCategories.reduce(
    (acc, category) => acc + category.skills.length,
    0
  )
  const expertSkills = skillCategories[0].skills.length
  const averageProficiency = Math.round(
    skillCategories
      .flatMap((c) => c.skills)
      .reduce((acc, skill) => acc + skill.proficiency, 0) /
      skillCategories.flatMap((c) => c.skills).length
  )

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/files/my-cv.pdf'
    link.download = 'Fuad-Seid-CV.pdf'
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
            Skills & Proficiencies
          </h1>
          <p className='text-xl text-muted-foreground'>
            A comprehensive overview of my technical expertise
          </p>
        </div>

        {/* Stats Cards */}
        <div className='mb-16 grid grid-cols-1 gap-6 md:grid-cols-4'>
          <Card className='border-gray-200 p-6 text-center transition-all hover:shadow-md dark:border-gray-800'>
            <div className='mb-3 flex justify-center'>
              <Code className='h-8 w-8 text-foreground' />
            </div>
            <div className='mb-1 text-2xl font-bold'>{totalSkills}+</div>
            <div className='text-sm font-medium text-muted-foreground'>
              Technologies
            </div>
          </Card>

          <Card className='border-gray-200 p-6 text-center transition-all hover:shadow-md dark:border-gray-800'>
            <div className='mb-3 flex justify-center'>
              <Award className='h-8 w-8 text-foreground' />
            </div>
            <div className='mb-1 text-2xl font-bold'>{expertSkills}</div>
            <div className='text-sm font-medium text-muted-foreground'>
              Expert Skills
            </div>
          </Card>

          <Card className='border-gray-200 p-6 text-center transition-all hover:shadow-md dark:border-gray-800'>
            <div className='mb-3 flex justify-center'>
              <Brain className='h-8 w-8 text-foreground' />
            </div>
            <div className='mb-1 text-2xl font-bold'>{averageProficiency}%</div>
            <div className='text-sm font-medium text-muted-foreground'>
              Avg. Proficiency
            </div>
          </Card>

          <Card className='border-gray-200 p-6 text-center transition-all hover:shadow-md dark:border-gray-800'>
            <div className='mb-3 flex justify-center'>
              <Zap className='h-8 w-8 text-foreground' />
            </div>
            <div className='mb-1 text-2xl font-bold'>3+</div>
            <div className='text-sm font-medium text-muted-foreground'>
              Years Experience
            </div>
          </Card>
        </div>

        {/* Skills Grid */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {skillCategories.map((category, index) => (
            <Collapsible
              key={index}
              open={openCategories[index]}
              onOpenChange={() => toggleCategory(index)}
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
                        <CardTitle className='flex items-center gap-3 text-lg font-semibold'>
                          <div className='rounded-md bg-gray-100 p-2 text-foreground dark:bg-gray-800'>
                            {category.icon}
                          </div>
                          {category.title}
                        </CardTitle>
                        <div className='flex items-center gap-3'>
                          <Badge
                            variant='outline'
                            className='border-gray-300 text-xs dark:border-gray-700'
                          >
                            {category.skills.length} skills
                          </Badge>
                          {openCategories[index] ? (
                            <ChevronUp className='h-5 w-5 text-muted-foreground transition-transform duration-300' />
                          ) : (
                            <ChevronDown className='h-5 w-5 text-muted-foreground transition-transform duration-300' />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent className='transition-all duration-300 ease-in-out'>
                    <CardContent className='space-y-6 pt-0'>
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className='flex items-center justify-between duration-300 animate-in fade-in slide-in-from-top-2'
                          style={{ animationDelay: `${skillIndex * 50}ms` }}
                        >
                          <div className='flex items-center gap-3'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-foreground transition-transform duration-200 hover:scale-110 dark:bg-gray-800'>
                              {skill.icon}
                            </div>
                            <div>
                              <div className='font-medium text-foreground'>
                                {skill.name}
                              </div>
                              <div className='text-xs text-muted-foreground'>
                                {skill.years} years
                              </div>
                            </div>
                          </div>

                          <div className='flex flex-col items-end gap-1'>
                            <span className='text-sm font-medium text-muted-foreground'>
                              {skill.proficiency}%
                            </span>
                            <ProficiencyBar
                              proficiency={skill.proficiency}
                              className='w-20'
                            />
                          </div>
                        </div>
                      ))}
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
            Interested in working together?
          </p>
          <Button
            onClick={handleDownload}
            size='lg'
            className='transform bg-foreground px-8 text-background transition-all duration-300 hover:scale-105 hover:bg-foreground/90'
            variant='default'
          >
            <Download className='mr-2 h-4 w-4 transition-transform group-hover:translate-y-1' />
            Download CV
          </Button>
        </div>
      </div>
    </section>
  )
}
