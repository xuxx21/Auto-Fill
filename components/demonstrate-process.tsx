"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, FileText } from "lucide-react"
import FloatingWebWindow from "@/components/floating-web-window"
import FormFillingModal from "@/components/form-filling-modal"

interface DemonstrateProcessProps {
  taskName: string
  file: File | null
  onComplete: () => void
}

export default function DemonstrateProcess({ taskName, file, onComplete }: DemonstrateProcessProps) {
  const [isRecording, setIsRecording] = useState(true)
  const [showWebWindow, setShowWebWindow] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)

  // Mock data that would come from the uploaded file
  const fileData = [
    { title: "The Shawshank Redemption", year: "1994", genre: "Drama", rating: "" },
    { title: "The Godfather", year: "1972", genre: "Crime", rating: "" },
    { title: "Pulp Fiction", year: "1994", genre: "Crime", rating: "" },
    { title: "The Dark Knight", year: "2008", genre: "Action", rating: "" },
    { title: "Forrest Gump", year: "1994", genre: "Drama", rating: "" },
    { title: "Inception", year: "2010", genre: "Sci-Fi", rating: "" },
    { title: "The Matrix", year: "1999", genre: "Sci-Fi", rating: "" },
    { title: "Goodfellas", year: "1990", genre: "Crime", rating: "" },
  ]

  const toggleWebWindow = () => {
    setShowWebWindow(!showWebWindow)
  }

  const handleFormComplete = () => {
    setShowFormModal(false)
    setIsRecording(false)
    onComplete()
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

      {/* Action Buttons */}
      <div className="mb-6 flex justify-center gap-4">
        <Button onClick={toggleWebWindow} variant="outline">
          <Globe className="w-4 h-4 mr-2" />
          {showWebWindow ? "Hide Web Window" : "Open Web Window"}
        </Button>
        <Button onClick={() => setShowFormModal(true)} size="lg">
          <FileText className="w-4 h-4 mr-2" />
          Fill Form
        </Button>
      </div>

      {/* Reference File Content */}
      <Card className="max-w-5xl mx-auto">
        <CardContent className="p-6">
          <h3 className="text-xl font-medium mb-4 text-center">Reference File Content</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
            <p className="text-sm text-yellow-800">
              💡 <strong>Tip:</strong> You can drag the form window to any position to view this reference content while
              filling out the form.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-3 bg-gray-100 text-left">Movie Title</th>
                  <th className="border p-3 bg-gray-100 text-left">Year</th>
                  <th className="border p-3 bg-gray-100 text-left">Genre</th>
                  <th className="border p-3 bg-gray-100 text-left">Rating</th>
                </tr>
              </thead>
              <tbody>
                {fileData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-3 font-medium">{row.title}</td>
                    <td className="border p-3">{row.year}</td>
                    <td className="border p-3">{row.genre}</td>
                    <td className="border p-3 text-gray-400">{row.rating || "Not rated"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>File: {file?.name || "movie-list.pdf"}</p>
            <p>Source: Uploaded reference document</p>
          </div>
        </CardContent>
      </Card>

      {/* Floating Web Window */}
      {showWebWindow && <FloatingWebWindow onClose={() => setShowWebWindow(false)} />}

      {/* Form Filling Modal */}
      {showFormModal && (
        <FormFillingModal
          taskName={taskName}
          onClose={() => setShowFormModal(false)}
          onComplete={handleFormComplete}
          isDemo={true}
        />
      )}
    </div>
  )
}
