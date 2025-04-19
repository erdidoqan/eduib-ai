import { NextResponse } from "next/server"

interface Parameter {
  id: string
  name: string
  children?: Parameter[]
}

interface ParameterData {
  courses: Parameter[]
  lastUpdated: string
  version: string
}

let storedParameters: ParameterData | null = null

export async function GET() {
  try {
    // If no local cache, try to fetch from external API
    if (!storedParameters) {
      const response = await fetch("https://eduib.com/api/parameters")
      if (response.ok) {
        storedParameters = await response.json()
      }
    }
    
    return NextResponse.json(storedParameters || { error: "No parameters set" })
  } catch (error) {
    console.error("Error fetching parameters:", error)
    return NextResponse.json({ error: "Failed to fetch parameters" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const parameters: ParameterData = await req.json()
    storedParameters = parameters
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving parameters:", error)
    return NextResponse.json({ error: "Failed to save parameters" }, { status: 500 })
  }
} 