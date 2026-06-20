import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content', 'projects')

export type Project = {
  metadata: ProjectMetadata
  content: string
}

export type ProjectMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug: string
  category?: string
  location?: string
  area?: string
  projectType?: string
  duration?: string
  scopeOfWork?: string
  photos?: string[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projectFolder = path.join(contentDirectory, slug)
    
    if (!fs.existsSync(projectFolder)) {
      console.error(`Project folder not found: ${projectFolder}`)
      return null
    }

    // Find MDX/MD file in the folder
    const files = fs.readdirSync(projectFolder)
    const mdxFile = files.find(file => 
      file.endsWith('.mdx') || file.endsWith('.md')
    )

    if (!mdxFile) {
      console.error(`No MDX/MD file found in ${projectFolder}`)
      return null
    }

    const filePath = path.join(projectFolder, mdxFile)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)

    // Get photos from the folder
    const photos = getPhotosFromFolder(projectFolder, slug)

    return { 
      metadata: { ...data, slug, photos }, 
      content 
    }
  } catch (error) {
    console.error(`Error getting project ${slug}:`, error)
    return null
  }
}

export async function getProjects(limit?: number): Promise<ProjectMetadata[]> {
  try {
    if (!fs.existsSync(contentDirectory)) {
      console.error(`Content directory not found: ${contentDirectory}`)
      return []
    }

    const items = fs.readdirSync(contentDirectory)

    const projects = items
      .filter(item => {
        const itemPath = path.join(contentDirectory, item)
        return fs.statSync(itemPath).isDirectory()
      })
      .map((folder) => {
        return getProjectMetadata(folder)
      })
      .filter((project): project is ProjectMetadata => project !== null)
      .sort((a, b) => {
        if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
          return 1
        } else {
          return -1
        }
      })

    console.log(`Found ${projects.length} projects`)
    return limit ? projects.slice(0, limit) : projects
  } catch (error) {
    console.error('Error getting projects:', error)
    return []
  }
}

export function getProjectMetadata(folderName: string): ProjectMetadata | null {
  const slug = folderName
  const folderPath = path.join(contentDirectory, folderName)
  
  try {
    const files = fs.readdirSync(folderPath)
    const mdxFile = files.find(file => 
      file.endsWith('.mdx') || file.endsWith('.md')
    )

    if (!mdxFile) {
      console.warn(`No MDX/MD file found in ${folderName}`)
      return { slug }
    }

    const filePath = path.join(folderPath, mdxFile)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data } = matter(fileContent)

    // Get photos from folder with proper slug
    const photos = getPhotosFromFolder(folderPath, slug)

    return { ...data, slug, photos }
  } catch (error) {
    console.error(`Error reading project ${folderName}:`, error)
    return null
  }
}

function getPhotosFromFolder(folderPath: string, slug: string): string[] {
  try {
    const files = fs.readdirSync(folderPath)
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    const imageFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase()
        return imageExtensions.includes(ext)
      })
      .sort()
      // IMPORTANT: Path should be from the public folder
      .map(file => `/projects/${slug}/${file}`)

    console.log(`Found ${imageFiles.length} photos for ${slug}:`, imageFiles)
    return imageFiles
  } catch (error) {
    console.error(`Error reading photos from ${folderPath}:`, error)
    return []
  }
}