'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Building2, CreditCard, FileText, Grid, KeyRound, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type React from "react"

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
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100/80",
        active && "bg-gray-100",
      )}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}

interface DocumentSectionProps {
  title: string
  files: File[]
  onUpload: (files: FileList) => void
  onRemove: (file: File) => void
  indexingStatus: "idle" | "indexing" | "indexed"
  lastIndexedTime: string | null
}

function DocumentSection({ title, files, onUpload, onRemove, indexingStatus, lastIndexedTime }: DocumentSectionProps) {
  const [dragActive, setDragActive] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <div className="flex items-center space-x-2">
            {indexingStatus === "indexing" && (
              <span className="text-xs font-normal text-blue-500 animate-pulse">Indexing...</span>
            )}
            {indexingStatus === "indexed" && <span className="text-xs font-normal text-green-500">Indexed</span>}
            {lastIndexedTime && (
              <span className="text-xs font-normal text-gray-500">Last indexed: {lastIndexedTime}</span>
            )}
            <span className="text-sm font-normal text-gray-500">
              {files.length} document{files.length !== 1 ? "s" : ""}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <Button onClick={() => setIsModalOpen(true)} variant="outline" size="sm">
              Manage Documents
            </Button>
            <Button size="sm" onClick={() => document.getElementById(`file-upload-${title}`)?.click()}>
              Upload Files
            </Button>
            <input
              id={`file-upload-${title}`}
              name={`file-upload-${title}`}
              type="file"
              className="hidden"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <span className="text-sm text-gray-500">{files.length} file(s)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.slice(0, 8).map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <p className="mt-1 text-xs text-gray-600 truncate">{file.name}</p>
            </div>
          ))}
          {files.length > 8 && (
            <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
              <span className="text-sm text-gray-500">+{files.length - 8} more</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState("company")
  const [otherDocs, setOtherDocs] = useState<File[]>([])
  const [pastTenders, setPastTenders] = useState<File[]>([])
  const [capabilityDocs, setCapabilityDocs] = useState<File[]>([])

  const handleUpload = (files: FileList, setter: React.Dispatch<React.SetStateAction<File[]>>) => {
    setter((prevFiles) => [...prevFiles, ...Array.from(files)])
  }

  const handleRemove = (fileToRemove: File, setter: React.Dispatch<React.SetStateAction<File[]>>) => {
    setter((prevFiles) => prevFiles.filter((file) => file !== fileToRemove))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-full">
        <div className="flex w-64 flex-col border-r bg-white">
          <div className="flex items-center gap-2 p-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2">
            <NavItem
              icon={<Building2 className="h-4 w-4" />}
              onClick={() => setActiveSection("company")}
              active={activeSection === "company"}
            >
              Company profile
            </NavItem>
            <NavItem
              icon={<User className="h-4 w-4" />}
              onClick={() => setActiveSection("personalization")}
              active={activeSection === "personalization"}
            >
              Personalization
            </NavItem>
            <NavItem
              icon={<Grid className="h-4 w-4" />}
              onClick={() => setActiveSection("data")}
              active={activeSection === "data"}
            >
              Data controls
            </NavItem>
            <NavItem
              icon={<KeyRound className="h-4 w-4" />}
              onClick={() => setActiveSection("security")}
              active={activeSection === "security"}
            >
              Security
            </NavItem>
            <NavItem
              icon={<CreditCard className="h-4 w-4" />}
              onClick={() => setActiveSection("subscription")}
              active={activeSection === "subscription"}
            >
              Subscription
            </NavItem>
          </nav>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {activeSection === "company" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
                <p className="mt-1 text-sm text-gray-500">Manage your company information and documents</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="company-name" className="text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <Input id="company-name" placeholder="Enter company name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company-website" className="text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <Input id="company-website" placeholder="https://example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company-description" className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <Textarea id="company-description" placeholder="Brief description of your company" rows={3} />
                  </div>
                  <div className="flex justify-end">
                    <Button>Update Company Information</Button>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Documents</h3>
                <div className="grid grid-cols-1 gap-6">
                  <DocumentSection
                    title="Other Docs"
                    files={otherDocs}
                    onUpload={(files) => handleUpload(files, setOtherDocs)}
                    onRemove={(file) => handleRemove(file, setOtherDocs)}
                    indexingStatus="indexed"
                    lastIndexedTime="2025-02-05 10:30 AM"
                  />
                  <DocumentSection
                    title="Past Tenders"
                    files={pastTenders}
                    onUpload={(files) => handleUpload(files, setPastTenders)}
                    onRemove={(file) => handleRemove(file, setPastTenders)}
                    indexingStatus="indexing"
                    lastIndexedTime={null}
                  />
                  <DocumentSection
                    title="Capability Docs"
                    files={capabilityDocs}
                    onUpload={(files) => handleUpload(files, setCapabilityDocs)}
                    onRemove={(file) => handleRemove(file, setCapabilityDocs)}
                    indexingStatus="idle"
                    lastIndexedTime="2025-02-04 3:45 PM"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
