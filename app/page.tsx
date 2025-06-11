"use client"

import { useState } from "react"
import Dashboard from "@/components/dashboard"
import CreateTask from "@/components/create-task"
import DemonstrateProcess from "@/components/demonstrate-process"
import RecognizeTask from "@/components/recognize-task"
import AutoFill from "@/components/auto-fill"

// Types for our tasks
interface Task {
  id: string
  name: string
  createdAt: Date
  lastUsed?: Date
}

export default function Home() {
  const [currentView, setCurrentView] = useState<"dashboard" | "create" | "demonstrate" | "recognize" | "autofill">(
    "dashboard",
  )
  const [tasks, setTasks] = useState<Task[]>([
    { id: "task-1", name: "Movie Review Data Entry", createdAt: new Date(2025, 5, 1), lastUsed: new Date(2025, 5, 8) },
    { id: "task-2", name: "Customer Information Import", createdAt: new Date(2025, 5, 5) },
    { id: "task-3", name: "Product Catalog Update", createdAt: new Date(2025, 5, 3) },
  ])

  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [newData, setNewData] = useState("")

  // Create task flow
  const handleStartCreateTask = () => {
    setCurrentView("create")
  }

  const handleCreateTaskComplete = (taskName: string, file: File) => {
    setActiveTask({ id: `task-${tasks.length + 1}`, name: taskName, createdAt: new Date() })
    setUploadedFile(file)
    setCurrentView("demonstrate")
  }

  const handleDemoComplete = () => {
    if (activeTask) {
      // Add the new task to our tasks list
      setTasks([...tasks, activeTask])
      setCurrentView("dashboard")
    }
  }

  // Recognize and execute flow
  const handleStartRecognize = () => {
    setCurrentView("recognize")
  }

  const handleTaskSelected = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setActiveTask(task)
    }
  }

  const handleFileRecognized = (file: File, taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setActiveTask(task)
      setUploadedFile(file)
      setNewData("Mary Johnson")
    }
  }

  const handleProceedToFill = () => {
    setCurrentView("autofill")
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
  }

  return (
    <main className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Data Automation Agent</h1>

      {currentView === "dashboard" && (
        <Dashboard
          tasks={tasks}
          onCreateTask={handleStartCreateTask}
          onRecognizeTask={handleStartRecognize}
          onSelectTask={handleTaskSelected}
        />
      )}

      {currentView === "create" && (
        <div>
          <button onClick={handleBackToDashboard} className="mb-4 flex items-center text-gray-600 hover:text-gray-900">
            ← Back to Dashboard
          </button>
          <CreateTask onComplete={handleCreateTaskComplete} />
        </div>
      )}

      {currentView === "demonstrate" && activeTask && (
        <div>
          <button onClick={handleBackToDashboard} className="mb-4 flex items-center text-gray-600 hover:text-gray-900">
            ← Back to Dashboard
          </button>
          <DemonstrateProcess taskName={activeTask.name} file={uploadedFile} onComplete={handleDemoComplete} />
        </div>
      )}

      {currentView === "recognize" && (
        <div>
          <button onClick={handleBackToDashboard} className="mb-4 flex items-center text-gray-600 hover:text-gray-900">
            ← Back to Dashboard
          </button>
          <RecognizeTask
            tasks={tasks}
            onFileUploaded={handleFileRecognized}
            matchedTask={activeTask?.name || ""}
            newData={newData}
            onProceed={handleProceedToFill}
          />
        </div>
      )}

      {currentView === "autofill" && activeTask && (
        <div>
          <button onClick={handleBackToDashboard} className="mb-4 flex items-center text-gray-600 hover:text-gray-900">
            ← Back to Dashboard
          </button>
          <AutoFill taskName={activeTask.name} newData={newData} onComplete={handleBackToDashboard} />
        </div>
      )}
    </main>
  )
}
