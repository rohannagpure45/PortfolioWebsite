import mongoose from "mongoose"
import { NextResponse } from "next/server"

const uri = process.env.MONGODB_URI!

const connectDB = async () => {
  if (mongoose.connections[0].readyState === 1) return
  await mongoose.connect(uri)
}

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
})

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema)

export async function GET() {
  await connectDB()
  const projects = await Project.find()
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  await connectDB()
  const data = await req.json()
  const newProject = await Project.create(data)
  return NextResponse.json(newProject, { status: 201 })
}

