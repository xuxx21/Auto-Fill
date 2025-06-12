"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Globe, FileText } from "lucide-react"
import FloatingWebWindow from "@/components/floating-web-window"
import FormFillingModal from "@/components/form-filling-modal"

interface AutoFillProps {
  taskName: string
  newData: string
  onComplete: () => void
}

export default function AutoFill({ taskName, newData, onComplete }: AutoFillProps) {
  const [showWebWindow, setShowWebWindow] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)

  // Mock data that would be auto-detected from the new file
  const detectedData = [
    { title: "Pulp Fiction", year: "1994", genre: "Crime", confidence: "95%" },
    { title: "The Matrix", year: "1999", genre: "Sci-Fi", confidence: "92%" },
    { title: "Fight Club", year: "1999", genre: "Drama", confidence: "88%" },
  ]

  const toggleWebWindow = () => {
    setShowWebWindow(!showWebWindow)
  }

  const handleFormComplete = () => {
    setShowFormModal(false)
    onComplete()
  }

  return (
    <div className="w-full relative">
      <h2 className="text-2xl font-bold mb-2 text-center">Auto Fill</h2>
      <p className="text-center mb-6 text-gray-600">
        Task: <span className="font-medium">{taskName}</span>
      </p>

      <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-6 flex items-center justify-center">
        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
        <p className="text-green-700">Detected {detectedData.length} movies from uploaded file</p>
      </div>

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

      {/* Auto-detected Data */}
      <Card className="max-w-5xl mx-auto">
        <CardContent className="p-6">
          <h3 className="text-xl font-medium mb-4 text-center">Auto-detected Data</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
            <p className="text-sm text-blue-800">
              🤖 <strong>Auto-fill:</strong> The detected data will be automatically pre-filled in the form. You can
              drag the form window to view this reference while making adjustments.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-3 bg-gray-100 text-left">Movie Title</th>
                  <th className="border p-3 bg-gray-100 text-left">Year</th>
                  <th className="border p-3 bg-gray-100 text-left">Genre</th>
                  <th className="border p-3 bg-gray-100 text-left">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {detectedData.map((row, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="border p-3 font-medium">{row.title}</td>
                    <td className="border p-3">{row.year}</td>
                    <td className="border p-3">{row.genre}</td>
                    <td className="border p-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {row.confidence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>Data automatically extracted using learned task pattern</p>
          </div>
        </CardContent>
      </Card>

      {/* Floating Web Window */}
      {showWebWindow && <FloatingWebWindow onClose={() => setShowWebWindow(false)} />}

      {/* Form Filling Modal with Auto-detected Data */}
      {showFormModal && (
        <FormFillingModal
          taskName={taskName}
          autoDetectedData={detectedData}
          onClose={() => setShowFormModal(false)}
          onComplete={handleFormComplete}
          isDemo={false}
        />
      )}
    </div>
  )
}
