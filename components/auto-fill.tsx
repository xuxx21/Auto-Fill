"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, Globe } from "lucide-react"
import FloatingWebWindow from "@/components/floating-web-window"

interface AutoFillProps {
  taskName: string
  newData: string
  onComplete: () => void
}

export default function AutoFill({ taskName, newData, onComplete }: AutoFillProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showWebWindow, setShowWebWindow] = useState(false)

  // Mock data that would be auto-filled
  const tableData = [
    { title: "The Shawshank Redemption", year: "1994", genre: "Drama", rating: "9.3" },
    { title: "Pulp Fiction", year: "1994", genre: "Crime", rating: "", isNew: true },
  ]

  const handleSubmit = () => {
    setIsSubmitting(true)
    // In a real app, we would submit the data here
    setTimeout(() => {
      setIsSubmitting(false)
      setIsCompleted(true)
      setTimeout(() => {
        onComplete()
      }, 1500)
    }, 1500)
  }

  const toggleWebWindow = () => {
    setShowWebWindow(!showWebWindow)
  }

  return (
    <div className="w-full relative">
      <h2 className="text-2xl font-bold mb-2 text-center">Auto Fill</h2>
      <p className="text-center mb-6 text-gray-600">
        Task: <span className="font-medium">{taskName}</span>
      </p>

      {isCompleted && (
        <div className="bg-green-50 border border-green-200 rounded-md p-2 mb-6 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          <p className="text-green-700">Data submitted successfully!</p>
        </div>
      )}

      {/* Web Window Toggle Button */}
      <div className="mb-4 flex justify-end">
        <Button onClick={toggleWebWindow} variant="outline" size="sm">
          <Globe className="w-4 h-4 mr-2" />
          {showWebWindow ? "Hide Web Window" : "Open Web Window"}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Left side - Auto-filled data table */}
        <Card className="flex-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Auto-filled Data</h3>
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
                  {tableData.map((row, index) => (
                    <tr key={index} className={row.isNew ? "bg-blue-50" : ""}>
                      <td className="border p-2">
                        <Input value={row.title} onChange={() => {}} className="border-0 p-1 h-8" placeholder="Title" />
                      </td>
                      <td className="border p-2">
                        <Input value={row.year} onChange={() => {}} className="border-0 p-1 h-8" placeholder="Year" />
                      </td>
                      <td className="border p-2">
                        <Input value={row.genre} onChange={() => {}} className="border-0 p-1 h-8" placeholder="Genre" />
                      </td>
                      <td className="border p-2">
                        <Input
                          value={row.rating}
                          onChange={() => {}}
                          className="border-0 p-1 h-8"
                          placeholder="Rating"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Right side - Web interface for corrections */}
        <Card className="flex-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Quick Search & Corrections</h3>
            <div className="space-y-4">
              <Input placeholder="Movie Title" />
              <Input placeholder="Year" />
              <Input placeholder="Genre" />
              <Input placeholder="Rating" />
              <div className="flex gap-2">
                <Input
                  placeholder="Search for movie info..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button>Search</Button>
              </div>
              <div className="border rounded-md p-3 bg-gray-50 min-h-[100px]">
                <p className="text-sm text-gray-500">Quick search results will appear here...</p>
                {searchQuery && (
                  <div className="mt-2">
                    <p className="text-sm">
                      Searching for: <span className="font-medium">{searchQuery}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Copy to Table
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleSubmit} size="lg" disabled={isSubmitting || isCompleted}>
          {isSubmitting ? "Submitting..." : isCompleted ? "Submitted" : "Confirm & Submit"}
        </Button>
      </div>

      {/* Floating Web Window */}
      {showWebWindow && <FloatingWebWindow onClose={() => setShowWebWindow(false)} />}
    </div>
  )
}
