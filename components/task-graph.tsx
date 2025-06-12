"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface TaskGraphProps {
  taskName: string
  onConfirm: () => void
  isDemo: boolean
}

export default function TaskGraph({ taskName, onConfirm, isDemo }: TaskGraphProps) {
  const [isConfirming, setIsConfirming] = useState(false)

  const handleConfirm = () => {
    setIsConfirming(true)
    setTimeout(() => {
      onConfirm()
    }, 1000)
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2 text-center">Task Graph</h2>
      <p className="text-center mb-6 text-gray-600">
        {isDemo ? "Review the cognitive process for: " : "Execution process for: "}
        <span className="font-medium">{taskName}</span>
      </p>

      <Card className="max-w-6xl mx-auto">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">
              {isDemo ? "Cognitive Dependencies and Operations" : "Task Execution Analysis"}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {isDemo
                ? "This graph shows the thought process and decision-making steps recorded during your demonstration."
                : "This graph shows how the agent processed your data based on the learned task pattern."}
            </p>
          </div>

          {/* Task Graph Visualization */}
          <div className="border rounded-lg bg-gray-50 p-4 mb-6">
            <img
              src="/images/task-graph.png"
              alt="Task Graph showing cognitive dependencies and operations"
              className="w-full h-auto max-h-96 object-contain mx-auto"
            />
          </div>

          {/* Task Summary */}
          <div
            className={`${isDemo ? "bg-blue-50 border-blue-200" : "bg-green-50 border-green-200"} border rounded-lg p-4 mb-6`}
          >
            <h4 className={`font-medium ${isDemo ? "text-blue-900" : "text-green-900"} mb-2`}>
              {isDemo ? "Task Summary" : "Execution Summary"}
            </h4>
            <ul className={`text-sm ${isDemo ? "text-blue-800" : "text-green-800"} space-y-1`}>
              <li>• Task Type: {isDemo ? "Normal/Iterative data processing" : "Automated data extraction"}</li>
              <li>
                • Cognitive Dependencies:{" "}
                {isDemo ? "Search result analysis, content summarization" : "Pattern matching, confidence scoring"}
              </li>
              <li>
                • Operations:{" "}
                {isDemo
                  ? "Text extraction, paragraph selection, data validation"
                  : "Data extraction, field mapping, validation"}
              </li>
              <li>
                • Parameters:{" "}
                {isDemo
                  ? "Search terms, selection criteria, output format"
                  : "Confidence threshold, field matching rules"}
              </li>
              {!isDemo && <li>• Execution Time: 1.2 seconds</li>}
              {!isDemo && <li>• Success Rate: 95%</li>}
            </ul>
          </div>

          <div className="text-center">
            <Button onClick={handleConfirm} size="lg" disabled={isConfirming}>
              {isConfirming ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isDemo ? "Saving Task..." : "Confirming..."}
                </>
              ) : isDemo ? (
                "Confirm & Save Task"
              ) : (
                "Confirm & Complete"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
