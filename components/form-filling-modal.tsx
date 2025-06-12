"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Save, X, Minimize2, Maximize2 } from "lucide-react"

interface ReferenceData {
  title: string
  year: string
  genre: string
  rating?: string
  confidence?: string
}

interface FormFillingModalProps {
  taskName: string
  autoDetectedData?: ReferenceData[]
  onClose: () => void
  onComplete: () => void
  isDemo: boolean
}

export default function FormFillingModal({
  taskName,
  autoDetectedData,
  onClose,
  onComplete,
  isDemo,
}: FormFillingModalProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [size, setSize] = useState({ width: 600, height: 500 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isMinimized, setIsMinimized] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Initialize form data with auto-detected data if available
  const [formData, setFormData] = useState(() => {
    if (autoDetectedData && !isDemo) {
      return autoDetectedData.map((item) => ({
        title: item.title,
        year: item.year,
        genre: item.genre,
        rating: "",
        notes: "",
      }))
    }
    return [
      { title: "", year: "", genre: "", rating: "", notes: "" },
      { title: "", year: "", genre: "", rating: "", notes: "" },
      { title: "", year: "", genre: "", rating: "", notes: "" },
    ]
  })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: Math.max(0, e.clientX - dragOffset.x),
        y: Math.max(0, e.clientY - dragOffset.y),
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

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

  const toggleSize = () => {
    if (size.width === 600) {
      setSize({ width: 800, height: 600 })
    } else {
      setSize({ width: 600, height: 500 })
    }
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        ref={modalRef}
        className="absolute bg-white rounded-lg shadow-2xl border-2 border-gray-300 pointer-events-auto"
        style={{
          left: position.x,
          top: position.y,
          width: isMinimized ? "300px" : `${size.width}px`,
          height: isMinimized ? "auto" : `${size.height}px`,
          maxHeight: "90vh",
        }}
      >
        {/* Modal Header */}
        <CardHeader
          className="p-3 bg-gray-100 cursor-move flex flex-row items-center justify-between rounded-t-lg border-b"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600" title="Close" />
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"
                title="Minimize"
              />
              <button
                onClick={toggleSize}
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600"
                title="Resize"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">Form Filling System</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleSize}>
              {size.width === 600 ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Modal Content */}
        {!isMinimized && (
          <>
            <CardContent className="p-4 overflow-y-auto" style={{ height: `${size.height - 120}px` }}>
              <div className="mb-4">
                <h3 className="text-lg font-medium">Movie Watchlist Form</h3>
                <p className="text-sm text-gray-600">Task: {taskName}</p>
                {autoDetectedData && !isDemo && (
                  <p className="text-sm text-green-600 mt-1">
                    ✓ {autoDetectedData.length} movies auto-detected and pre-filled
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {formData.map((row, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Movie #{index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Movie Title</label>
                          <Input
                            value={row.title}
                            onChange={(e) => handleInputChange(index, "title", e.target.value)}
                            placeholder="Enter movie title"
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                          <Input
                            value={row.year}
                            onChange={(e) => handleInputChange(index, "year", e.target.value)}
                            placeholder="Release year"
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                          <Input
                            value={row.genre}
                            onChange={(e) => handleInputChange(index, "genre", e.target.value)}
                            placeholder="Movie genre"
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">My Rating</label>
                          <Input
                            value={row.rating}
                            onChange={(e) => handleInputChange(index, "rating", e.target.value)}
                            placeholder="Your rating (1-10)"
                            className="text-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                          <Textarea
                            value={row.notes}
                            onChange={(e) => handleInputChange(index, "notes", e.target.value)}
                            placeholder="Additional notes about this movie"
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>

            {/* Fixed Footer */}
            <CardFooter className="border-t p-4 bg-gray-50 rounded-b-lg">
              <Button onClick={handleComplete} className="w-full" size="lg" disabled={isCompleting}>
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
            </CardFooter>
          </>
        )}
      </div>
    </div>
  )
}
