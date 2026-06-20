'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Poppins } from 'next/font/google'
import {
  Github,
  Mail,
  Download,
  ChevronDown,
  Linkedin,
  Twitter,
  Youtube
} from 'lucide-react'
import authorImage from '@/public/images/authors/fuad.jpg'

const socialLinks = [
  {
    href: 'https://github.com/Fuadseid',
    label: 'GitHub',
    icon: Github
  },
  {
    href: 'https://linkedin.com/in/fuad-seid-8b61322a9',
    label: 'LinkedIn',
    icon: Linkedin
  },
  {
    href: 'https://x.com/Fuad745164',
    label: 'Twitter',
    icon: Twitter
  },
  {
    href: 'mailto:fuaddbus@gmail.com',
    label: 'Email',
    icon: Mail
  },
  {
    href: 'https://youtube.com/@fuadseid9173',
    label: 'YouTube',
    icon: Youtube
  }
]

const popin = Poppins({
  subsets: ['latin'],
  variable: '--font-popins',
  weight: ['400', '700']
})

export default function Intro() {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/files/my-cv.pdf'
    link.download = 'Fuad-Seid-CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleContactClick = () => {
    window.location.href =
      'mailto:fuaddbus@gmail.com?subject=Portfolio%20Inquiry'
  }
  return (
    <section
      className={`flex min-h-screen items-center justify-center px-4 py-16`}
    >
      <div className='mx-auto max-w-6xl'>
        <div className='flex flex-col items-center gap-12 lg:flex-row lg:gap-20'>
          {/* Profile Image */}
          <div className='relative'>
            <div className='relative h-80 w-80 overflow-hidden rounded-full border-4 border-primary/20 shadow-2xl'>
              <Image
                className='object-cover'
                src={authorImage}
                alt='Fuad'
                fill
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className='flex-1 text-center lg:text-left'>
            {/* Greeting */}
            <Badge variant='secondary' className='mb-6 px-4 py-2 text-sm'>
              👋 Hello, I&apos;m
            </Badge>

            {/* Name */}
            <h1
              className={`mb-4 ${popin.className} bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent lg:text-6xl`}
            >
              Fuad Seid
            </h1>

            {/* Title */}
            <h2 className='mb-6 text-xl font-medium text-muted-foreground lg:text-2xl'>
              Fullstack Developer
            </h2>

            {/* Description */}
            <p className='mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground'>
              Full-Stack Developer Experienced in building dynamic web
              applications using MERN stack, Next.js, Laravel, React, Flutter,
              and Livewire. Skilled in developing scalable, efficient, and
              modern frontend & backend solutions, with additional experience in
              AI/ML integration.
            </p>

            {/* Buttons */}
            <div className='mb-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start'>
              <Button size='lg' className='px-8' onClick={handleContactClick}>
                <Mail className='mr-2 h-4 w-4' />
                Contact Me
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='px-8'
                onClick={handleDownload}
              >
                <Download className='mr-2 h-4 w-4' />
                Download CV
              </Button>
            </div>

            {/* Social Links */}
            <div className='flex justify-center gap-4 lg:justify-start'>
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  // Open external links in a new tab
                  target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                  // Important for security when using target="_blank"
                  rel='noopener noreferrer'
                  // Important for accessibility
                  aria-label={`Visit my ${link.label} profile`}
                >
                  <Button variant='ghost' size='icon' className='rounded-full'>
                    {/* Render the icon component dynamically */}
                    <link.icon className='h-5 w-5' />
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className='mt-16 flex justify-center'>
          <ChevronDown className='h-6 w-6 animate-bounce text-muted-foreground' />
        </div>
      </div>
    </section>
  )
}
