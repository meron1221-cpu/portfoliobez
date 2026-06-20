import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { notFound } from 'next/navigation'
import ProjectClient from './ProjectClient'

export async function generateStaticParams() {
  const projects = await getProjects()
  const slugs = projects.map((project) => ({ slug: project.slug }))
  return slugs
}

export default async function Project({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, author, publishedAt, photos } = metadata

  // Use photos array or fallback to single image
  const projectPhotos = photos && photos.length > 0 ? photos : []

  // Render MDX content on the server
  const mdxContent = <MDXContent source={content} />

  return (
    <ProjectClient 
      title={title}
      author={author}
      publishedAt={publishedAt}
      photos={projectPhotos}
      mdxContent={mdxContent}
      slug={slug}
    />
  )
}