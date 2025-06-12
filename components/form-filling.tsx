"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Save } from "lucide-react"

interface FormFillingProps {
  taskName: string
  onComplete: () => void
}

export default function FormFilling({ taskName, onComplete }: FormFillingProps) {
  const [formData, setFormData] = useState([
    { title: "", year: "", genre: "", rating: "", notes: "" },
    { title: "", year: "", genre: "", rating: "", notes: "" },
    { title: "", year: "", genre: "", rating: "", notes: "" },
  ])
  const [isCompleting, setIsCompleting] = useState(false)

  const handleInputChange = (index: number, field: string, value: string) => {
    const newFormData = [...formData]
    newFormData[index] = { ...newFormData[index], [field]: value }
    setFormData(newFormData)
  }

  const handleComplete = () => {
    setIsCompleting(true)
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">Form Filling System</h2>
      <p className="text-center mb-6 text-gray-600">
        Task: <span className="font-medium">{taskName}</span>
      </p>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium mb-6">Movie Watchlist Form</h3>

          <div className="space-y-6">
            {formData.map((row, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-4">Movie #{index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Movie Title</label>
                    <Input
                      value={row.title}
                      onChange={(e) => handleInputChange(index, "title", e.target.value)}
                      placeholder="Enter movie title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <Input
                      value={row.year}
                      onChange={(e) => handleInputChange(index, "year", e.target.value)}
                      placeholder="Release year"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                    <Input
                      value={row.genre}
                      onChange={(e) => handleInputChange(index, "genre", e.target.value)}
                      placeholder="Movie genre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">My Rating</label>
                    <Input
                      value={row.rating}
                      onChange={(e) => handleInputChange(index, "rating", e.target.value)}
                      placeholder="Your rating (1-10)"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <Textarea
                      value={row.notes}
                      onChange={(e) => handleInputChange(index, "notes", e.target.value)}
                      placeholder="Additional notes about this movie"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button onClick={handleComplete} size="lg" disabled={isCompleting}>
              {isCompleting ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completing...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Complete Form
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
