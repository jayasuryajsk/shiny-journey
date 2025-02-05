"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Cog, FileText, MessageSquare, Plus, Upload } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import type React from "react" // Added import for React

interface NavItemProps {
  icon: React.ReactNode
  children: React.ReactNode
  onClick: () => void
  active: boolean
}

function NavItem({ icon, children, onClick, active }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg",
        active && "bg-gray-100",
      )}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}

function FileCard({ title, type, thumbnail }: { title: string; type: string; thumbnail: string }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white">
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{type}</p>
      </div>
    </div>
  )
}

export default function AppDashboard() {
  const [activeTab, setActiveTab] = useState<"chat" | "documents" | "settings">("chat")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log("File uploaded:", event.target.files)
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">ChatApp</h1>
        </div>
        <nav className="space-y-1 px-2">
          <NavItem
            icon={<MessageSquare className="h-4 w-4" />}
            onClick={() => setActiveTab("chat")}
            active={activeTab === "chat"}
          >
            Chat
          </NavItem>
          <NavItem
            icon={<FileText className="h-4 w-4" />}
            onClick={() => setActiveTab("documents")}
            active={activeTab === "documents"}
          >
            Documents
          </NavItem>
          <NavItem
            icon={<Cog className="h-4 w-4" />}
            onClick={() => setActiveTab("settings")}
            active={activeTab === "settings"}
          >
            Settings
          </NavItem>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === "chat" && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto mb-4 p-4 border rounded-lg">
              {/* Chat messages will be displayed here */}
              <p className="text-gray-500">Your chat messages will appear here.</p>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button>Send</Button>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div>
            <div className="mb-6 flex items-center gap-4">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Folder
              </Button>
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  Upload Document
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  multiple
                />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FileCard title="Company Policy" type="PDF" thumbnail="/placeholder.svg" />
              <FileCard title="Q2 Report" type="PDF" thumbnail="/placeholder.svg" />
              <FileCard title="Project Roadmap" type="XLSX" thumbnail="/placeholder.svg" />
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
            <div className="space-y-2">
              <label htmlFor="api-key" className="text-sm font-medium text-gray-700">
                API Key
              </label>
              <Input id="api-key" type="password" placeholder="Your API key" />
            </div>
            <Button className="w-full">Save Settings</Button>
          </div>
        )}
      </div>
    </div>
  )
}

