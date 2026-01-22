const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"


export async function getProjects() {
  try {
    const response = await fetch(`${API_URL}/api/projects`)
    if (!response.ok) {
      throw new Error("Failed to fetch projects")
    }
    return response.json()
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export async function getBlogPosts() {
  try {
    const response = await fetch(`${API_URL}/api/blog-posts`)
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts")
    }
    return response.json()
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function addProject(project: { title: string; description: string; image: string }) {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  })
  if (!response.ok) {
    throw new Error("Failed to add project")
  }
  return response.json()
}

export async function addBlogPost(post: { title: string; content: string }) {
  const response = await fetch(`${API_URL}/api/blog-posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
  if (!response.ok) {
    throw new Error("Failed to add blog post")
  }
  return response.json()
}

