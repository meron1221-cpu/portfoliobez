'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Download, Award, Briefcase, Headphones } from 'lucide-react'

const stats = [
  {
    icon: Award,
    title: 'Experience',
    value: '3+ Years Working'
  },
  {
    icon: Briefcase,
    title: 'Completed',
    value: '20+ Projects'
  },
  {
    icon: Headphones,
    title: 'Support',
    value: '24/7 Available'
  }
]

export default function AboutMe() {
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
          <h1 className='mb-4 text-4xl font-bold text-primary lg:text-5xl'>
            About Me
          </h1>
          <p className='text-xl text-muted-foreground'>My Introduction</p>
        </div>

        {/* Content */}
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          {/* Profile Image */}
          <div className='flex justify-center'>
            <div className='relative h-96 w-80 overflow-hidden rounded-2xl bg-muted'>
              <Image
                src='/images/authors/about.png'
                alt='Profile'
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className='space-y-8'>
            {/* Stats Cards */}
            <div className='flex flex-col sm:flex-row sm:gap-3'>
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className='border-2 w-70 text-center transition-colors hover:border-primary/50'
                >
                  <CardContent className='p-6'>
                    <stat.icon className='mx-auto mb-3 h-8 w-8 text-primary' />
                    <h3 className='mb-1 font-semibold text-foreground'>
                      {stat.title}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      {stat.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Description */}
            <div className='space-y-4 leading-relaxed text-muted-foreground'>
              <p>
                I am a Full-Stack Developer with expertise in building web
                applications using modern technologies, including the MERN stack
                (MongoDB, Express.js, React, Node.js), Next.js, Laravel, and
                Flutter. I have a strong passion for learning new technologies
                and solving real-life problems through innovative solutions.
              </p>
              <p>
                With a commitment to best practices in software development, I
                focus on creating seamless user experiences and efficient
                server-side applications. I thrive in collaborative
                environments, working with cross-functional teams to deliver
                high-quality projects on time.
              </p>
            </div>

            {/* Download CV Button */}
            <div>
              <Button onClick={handleDownload} size='lg' className='px-8'>
                <Download className='mr-2 h-4 w-4' />
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
