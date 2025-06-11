"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Clock } from "lucide-react"

interface Task {
  id: string
  name: string
  createdAt: Date
  lastUsed?: Date
}

interface DashboardProps {
  tasks: Task[]
  onCreateTask: () => void
  onRecognizeTask: () => void
  onSelectTask: (taskId: string) => void
}

export default function Dashboard({ tasks, onCreateTask, onRecognizeTask, onSelectTask }: DashboardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-8">
      {/* Create New Task Card - Now centered and prominent */}
      <div className="flex justify-center">
        <Card className="hover:shadow-md transition-shadow max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <PlusCircle className="mr-2 h-6 w-6" />
              Create New Task
            </CardTitle>
            <CardDescription className="text-center">Create and demonstrate a new automation task</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center">
              Upload a file and demonstrate how to process it. The agent will learn from your actions.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={onCreateTask} className="w-full">
              Create New Task
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Your Tasks Section */}
      {tasks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Your Tasks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <Card
                key={task.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onSelectTask(task.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{task.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-500">Created: {formatDate(task.createdAt)}</p>
                  {task.lastUsed && <p className="text-sm text-gray-500">Last used: {formatDate(task.lastUsed)}</p>}
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectTask(task.id)
                      onRecognizeTask()
                    }}
                  >
                    Use This Task
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty state when no tasks exist */}
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Clock size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
          <p className="text-gray-500">Create your first automation task to get started</p>
        </div>
      )}
    </div>
  )
}
