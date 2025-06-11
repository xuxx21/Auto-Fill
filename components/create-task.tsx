"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"

interface CreateTaskProps {
  onComplete: (taskName: string, file: File) => void
}

export default function CreateTask({ onComplete }: CreateTaskProps) {
  const [taskName, setTaskName] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = () => {
    if (taskName.trim() && file) {
      onComplete(taskName, file)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Automation Task</h2>

        <div
          className={`border-2 border-dashed rounded-lg p-12 mb-6 flex flex-col items-center justify-center cursor-pointer ${isDragging ? "border-primary bg-primary/5" : "border-gray-300"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <Upload size={48} className="text-gray-500 mb-4" />
          <p className="text-lg font-medium">Upload File</p>
          {file && <p className="mt-2 text-sm text-gray-500">{file.name}</p>}
          <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".xlsx,.xls,.csv" />
        </div>

        <div className="mb-6">
          <Input
            placeholder="Name This Task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="text-lg"
          />
        </div>

        <p className="text-center mb-6 text-gray-600">You will now demonstrate how to extract and use this data</p>

        <Button onClick={handleSubmit} className="w-full" size="lg" disabled={!taskName.trim() || !file}>
          Continue
        </Button>
      </CardContent>
    </Card>
  )
}
