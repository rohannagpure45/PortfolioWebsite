import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "success",
    message: "API is working",
    environment: process.env.NODE_ENV || "development",
  })
}

