"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RotateCcw, Search } from "lucide-react"

interface FloatingWebWindowProps {
  onClose: () => void
}

export default function FloatingWebWindow({ onClose }: FloatingWebWindowProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isMinimized, setIsMinimized] = useState(false)
  const [url, setUrl] = useState("https://www.imdb.com")
  const [searchQuery, setSearchQuery] = useState("")
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
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
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setUrl(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div
      ref={windowRef}
      className="fixed z-50 shadow-2xl"
      style={{
        left: position.x,
        top: position.y,
        width: isMinimized ? "300px" : "600px",
        height: isMinimized ? "auto" : "500px",
      }}
    >
      <Card className="h-full">
        {/* Window Header */}
        <CardHeader
          className="p-2 bg-gray-100 cursor-move flex flex-row items-center justify-between"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-2 flex-1">
            <div className="flex space-x-1">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600" title="Close" />
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"
                title="Minimize"
              />
              <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600" title="Maximize" />
            </div>
            <span className="text-sm font-medium text-gray-700">Web Browser</span>
          </div>
        </CardHeader>

        {/* Window Content */}
        {!isMinimized && (
          <CardContent className="p-0 h-full flex flex-col">
            {/* Address Bar */}
            <div className="p-2 border-b bg-gray-50 flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="p-1 h-8 w-8">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <div className="flex-1 flex space-x-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search movies, reviews, ratings..."
                  className="text-sm"
                />
                <Button size="sm" onClick={handleSearch}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Browser Content Area */}
            <div className="flex-1 bg-white p-4 overflow-auto">
              <div className="text-center text-gray-500 mb-4">
                <p className="text-lg font-medium">Web Browser Simulation</p>
                <p className="text-sm">Current URL: {url}</p>
              </div>

              {/* Mock search results */}
              {searchQuery && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Search Results for "{searchQuery}"</h3>
                  <div className="space-y-3">
                    <div className="border rounded p-3 hover:bg-gray-50">
                      <h4 className="text-blue-600 font-medium">The Shawshank Redemption (1994) - IMDb</h4>
                      <p className="text-sm text-gray-600">
                        Rating: 9.3/10 · Drama · Two imprisoned men bond over a number of years...
                      </p>
                      <p className="text-xs text-green-600">imdb.com</p>
                    </div>
                    <div className="border rounded p-3 hover:bg-gray-50">
                      <h4 className="text-blue-600 font-medium">The Godfather Reviews - Rotten Tomatoes</h4>
                      <p className="text-sm text-gray-600">
                        98% Critics Score · One of the greatest films of all time...
                      </p>
                      <p className="text-xs text-green-600">rottentomatoes.com</p>
                    </div>
                    <div className="border rounded p-3 hover:bg-gray-50">
                      <h4 className="text-blue-600 font-medium">Pulp Fiction Movie Review & Film Summary</h4>
                      <p className="text-sm text-gray-600">
                        Rating: 8.9/10 · Crime/Drama · Quentin Tarantino's masterpiece...
                      </p>
                      <p className="text-xs text-green-600">rogerebert.com</p>
                    </div>
                  </div>
                </div>
              )}

              {!searchQuery && (
                <div className="text-center text-gray-400 mt-8">
                  <p>Enter a search query to find movie information, reviews, and ratings</p>
                  <p className="text-sm mt-2">This will help you decide which movies to add to your watchlist</p>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
