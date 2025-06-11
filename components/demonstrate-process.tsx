"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, Globe } from "lucide-react"
import FloatingWebWindow from "@/components/floating-web-window"

interface DemonstrateProcessProps {
  taskName: string
  file: File | null
  onComplete: () => void
}

export default function DemonstrateProcess({ taskName, file, onComplete }: DemonstrateProcessProps) {
  const [isRecording, setIsRecording] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [showWebWindow, setShowWebWindow] = useState(false)

  // Mock data that would come from the uploaded file (could be PDF content, webpage content, etc.)
  const fileData = [
    { title: "The Shawshank Redemption", year: "1994", genre: "Drama", rating: "" },
    { title: "The Godfather", year: "1972", genre: "Crime", rating: "" },
    { title: "Pulp Fiction", year: "1994", genre: "Crime", rating: "" },
    { title: "The Dark Knight", year: "2008", genre: "Action", rating: "" },
  ]

  const handleFinishDemo = () => {
    setIsRecording(false)
    setIsSaved(true)
    setTimeout(() => {
      onComplete()
    }, 1500)
  }

  const toggleWebWindow = () => {
    setShowWebWindow(!showWebWindow)
  }

  return (
    <div className="w-full relative">
      <h2 className="text-2xl font-bold mb-2 text-center">Demonstrate Process</h2>
      <p className="text-center mb-6 text-gray-600">
        Task: <span className="font-medium">{taskName}</span>
      </p>

      {isRecording && (
        <div className="bg-red-50 border border-red-200 rounded-md p-2 mb-6 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
          <p className="text-red-700">Recording your actions...</p>
        </div>
      )}

      {isSaved && (
        <div className="bg-green-50 border border-green-200 rounded-md p-2 mb-6 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          <p className="text-green-700">Task saved successfully!</p>
        </div>
      )}

      {/* Web Window Toggle Button */}
      <div className="mb-4 flex justify-end">
        <Button onClick={toggleWebWindow} variant="outline" size="sm">
          <Globe className="w-4 h-4 mr-2" />
          {showWebWindow ? "Hide Web Window" : "Open Web Window"}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left side - Reference file content */}
        <Card className="flex-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Reference File Content</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 bg-gray-100 text-left">Movie Title</th>
                    <th className="border p-2 bg-gray-100 text-left">Year</th>
                    <th className="border p-2 bg-gray-100 text-left">Genre</th>
                    <th className="border p-2 bg-gray-100 text-left">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {fileData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-2">{row.title}</td>
                      <td className="border p-2">{row.year}</td>
                      <td className="border p-2">{row.genre}</td>
                      <td className="border p-2">{row.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>File: {file?.name || "movie-list.pdf"}</p>
              <p>Source: Uploaded reference document</p>
            </div>
          </CardContent>
        </Card>

        {/* Right side - Target form/table */}
        <Card className="flex-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Target Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 bg-gray-100 text-center">A</th>
                    <th className="border p-2 bg-gray-100 text-center">B</th>
                    <th className="border p-2 bg-gray-100 text-center">C</th>
                    <th className="border p-2 bg-gray-100 text-center">D</th>
                  </tr>
                  <tr>
                    <th className="border p-2 bg-gray-50">Title</th>
                    <th className="border p-2 bg-gray-50">Year</th>
                    <th className="border p-2 bg-gray-50">Genre</th>
                    <th className="border p-2 bg-gray-50">My Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <Input placeholder="Movie title" className="border-0 p-1 h-8" />
                    </td>
                    <td className="border p-2">
                      <Input placeholder="Year" className="border-0 p-1 h-8" />
                    </td>
                    <td className="border p-2">
                      <Input placeholder="Genre" className="border-0 p-1 h-8" />
                    </td>
                    <td className="border p-2">
                      <Input placeholder="Rating" className="border-0 p-1 h-8" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <Input placeholder="Movie title" className="border-0 p-1 h-8" />
                    </td>
                    <td className="border p-2">
                      <Input placeholder="Year" className="border-0 p-1 h-8" />
                    </td>
                    <td className="border p-2">
                      <Input placeholder="Genre" className="border-0 p-1 h-8" />
                    </td>
                    <td className="border p-2">
                      <Input placeholder="Rating" className="border-0 p-1 h-8" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <Input placeholder="Movie title" className="border-0 p-1 h-8" />
                    </td>
                    <td className="border p-2">
                      <Input placeholder="Year" className="border-0 p-1 h-8" />
                    </td>
                    <td className="border p-2">
                      <Input placeholder="Genre" className="border-0 p-1 h-8" />
                    </td>
                    <td className="border p-2">
                      <Input placeholder="Rating" className="border-0 p-1 h-8" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-center">
        <Button onClick={handleFinishDemo} size="lg" variant={isSaved ? "outline" : "default"} disabled={isSaved}>
          {isSaved ? "Task Saved" : "Save Task"}
        </Button>
      </div>

      {/* Floating Web Window */}
      {showWebWindow && <FloatingWebWindow onClose={() => setShowWebWindow(false)} />}
    </div>
  )
}
