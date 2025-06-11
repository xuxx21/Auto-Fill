"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Task {
  id: string
  name: string
  createdAt: Date
  lastUsed?: Date
}

interface RecognizeTaskProps {
  tasks: Task[]
  onFileUploaded: (file: File, taskId: string) => void
  matchedTask: string
  newData: string
  onProceed: () => void
}

export default function RecognizeTask({ tasks, onFileUploaded, matchedTask, newData, onProceed }: RecognizeTaskProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      if (selectedTaskId) {
        onFileUploaded(selectedFile, selectedTaskId)
      }
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
      const droppedFile = e.dataTransfer.files[0]
      setFile(droppedFile)
      if (selectedTaskId) {
        onFileUploaded(droppedFile, selectedTaskId)
      }
    }
  }

  const handleTaskSelect = (taskId: string) => {
    setSelectedTaskId(taskId)
    if (file) {
      onFileUploaded(file, taskId)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Use Existing Task</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Task</label>
          <Select value={selectedTaskId} onValueChange={handleTaskSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a task" />
            </SelectTrigger>
            <SelectContent>
              {tasks.map((task) => (
                <SelectItem key={task.id} value={task.id}>
                  {task.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-12 mb-6 flex flex-col items-center justify-center cursor-pointer ${isDragging ? "border-primary bg-primary/5" : "border-gray-300"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-recognize")?.click()}
        >
          <Upload size={48} className="text-gray-500 mb-4" />
          <p className="text-lg font-medium">Upload File</p>
          {file && <p className="mt-2 text-sm text-gray-500">{file.name}</p>}
          <input
            id="file-recognize"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".xlsx,.xls,.csv"
          />
        </div>

        {matchedTask && (
          <>
            <div className="mb-6 text-center">
              <p className="text-lg">
                Using task: <span className="font-medium">{matchedTask}</span>
              </p>
            </div>

            <div className="mb-6 border rounded-lg p-4 bg-gray-50">
              <p className="text-center">
                New data to fill: <span className="font-medium">{newData}</span>
              </p>
            </div>

            <Button onClick={onProceed} className="w-full" size="lg">
              Proceed to Fill Data
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
