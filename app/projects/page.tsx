import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  console.log('Projects in page:', projects.length, projects.map(p => p.slug))

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Projects</h1>
        
        {projects.length === 0 ? (
          <div className='rounded-lg border border-dashed p-8 text-center'>
            <p className='text-muted-foreground'>No projects found</p>
            <p className='mt-2 text-sm text-muted-foreground'>
              Make sure you have project folders in <code>content/projects/</code> with MDX files
            </p>
          </div>
        ) : (
          <Projects projects={projects} />
        )}
      </div>
    </section>
  )
}