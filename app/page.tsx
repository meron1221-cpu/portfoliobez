import Intro from '@/components/intro'
import RecentProjects from '@/components/recent-projects'
import Skills from '@/components/skills'
import AboutMe from '@/components/about'

import ContactForm from '@/components/contact-form'
function Home() {
  return (
    <section className='py-24'>
      <div className='container mx-auto max-w-6xl px-4'>
        <Intro />
        <AboutMe />
        <Skills />
        {/* <Certificates /> */}
        <RecentProjects />
        <ContactForm />
      </div>
    </section>
  )
}

export default Home
