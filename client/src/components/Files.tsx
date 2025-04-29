"use client"

import {
  IconDownload,
  IconLoader2,
  IconPencil,
  IconPlus,
  IconSearch,
  IconTrash,
  IconChevronUp,
  IconChevronDown,
} from "@tabler/icons-react"
import { useState } from "react"
import type { File, SortDirection, SortField } from "../types/types"

// Dummy data
const dummyFiles: File[] = [
  {
    id: "1",
    name: "annual-report-2023.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "2023-12-15",
  },
  {
    id: "2",
    name: "product-image.jpg",
    type: "Image",
    size: "1.8 MB",
    uploadedAt: "2023-12-10",
  },
  {
    id: "3",
    name: "user-data.csv",
    type: "CSV",
    size: "4.2 MB",
    uploadedAt: "2023-12-05",
  },
  {
    id: "4",
    name: "presentation.pptx",
    type: "PowerPoint",
    size: "8.7 MB",
    uploadedAt: "2023-11-28",
  },
  {
    id: "5",
    name: "contract-template.docx",
    type: "Word",
    size: "1.2 MB",
    uploadedAt: "2023-11-20",
  },
]

const FileActions = ({ file }: { file: File }) => {
  return (
    <div className="w-min flex flex-nowrap mx-auto">
      <button
        onClick={() => alert("Downloading...")}
        className="px-2 py-1 rounded-sm hover:scale-90"
        title="Download file"
      >
        <IconDownload />
      </button>
      <button
        onClick={() => alert("Renaming file...")}
        className="px-2 py-1 rounded-sm hover:scale-90"
        title="Rename file"
      >
        <IconPencil />
      </button>
      <button
        onClick={() => alert("Deleting file...")}
        className="px-2 py-1 rounded-sm hover:scale-90 text-red-600"
        title="Delete file"
      >
        <IconTrash />
      </button>
    </div>
  )
}

const FilesTable = ({ files }: { files: File[] }) => {
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  if (files.length === 0)
    return (
      <div className="py-20">
        <IconLoader2 className="animate-spin mx-auto" />
      </div>
    )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field is clicked
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to ascending
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? (
      <IconChevronUp className="inline-block ml-1 size-4" />
    ) : (
      <IconChevronDown className="inline-block ml-1 size-4" />
    )
  }

  // Sort the files based on current sort field and direction
  const sortedFiles = [...files].sort((a, b) => {
    if (!sortField) return 0

    let comparison = 0
    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortField === "type") {
      comparison = a.type.localeCompare(b.type)
    } else if (sortField === "size") {
      // Extract numeric value from size string for proper comparison
      const sizeA = Number.parseFloat(a.size.split(" ")[0])
      const sizeB = Number.parseFloat(b.size.split(" ")[0])
      comparison = sizeA - sizeB
    } else if (sortField === "uploadedAt") {
      // Convert date strings to Date objects for comparison
      const dateA = new Date(a.uploadedAt)
      const dateB = new Date(b.uploadedAt)
      comparison = dateA.getTime() - dateB.getTime()
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-neutral-300">
            <th
              className="text-left p-3 font-semibold cursor-pointer hover:bg-neutral-400 transition-colors"
              onClick={() => handleSort("name")}
            >
              File Name {getSortIcon("name")}
            </th>
            <th
              className="text-left p-3 font-semibold cursor-pointer hover:bg-neutral-400 transition-colors"
              onClick={() => handleSort("type")}
            >
              Type {getSortIcon("type")}
            </th>
            <th
              className="text-left p-3 font-semibold cursor-pointer hover:bg-neutral-400 transition-colors"
              onClick={() => handleSort("size")}
            >
              Size {getSortIcon("size")}
            </th>
            <th
              className="text-left p-3 font-semibold cursor-pointer hover:bg-neutral-400 transition-colors"
              onClick={() => handleSort("uploadedAt")}
            >
              Uploaded {getSortIcon("uploadedAt")}
            </th>
            <th className="text-center p-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) => (
            <tr key={file.id} className={`border-t border-neutral-300 even:bg-neutral-300 transition-colors`}>
              <td className="p-3">{file.name}</td>
              <td className="p-3">{file.type}</td>
              <td className="p-3">{file.size}</td>
              <td className="p-3">{file.uploadedAt}</td>
              <td className="p-3">
                <FileActions file={file} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Files = () => {
  // File data - using the dummy data directly
  const [files, setFiles] = useState<File[]>(dummyFiles)

  // Search functionality
  const [searchQuery, setSearchQuery] = useState("")

  // Filter files based on search query
  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen w-full p-4 flex items-start justify-center">
      <div className="w-full max-w-4xl bg-neutral-200 rounded-sm shadow-sm mt-[5vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-2">
          <h3 className="font-semibold">Files</h3>
          <p className="text-sm text-neutral-600">View and manage system files</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Files Table Section */}
          <div>
            <h4 className="font-semibold text-lg mb-2">File Library</h4>
            <hr className="mb-4" />
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search files..."
                  className="w-full p-2 pl-8 border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-500">
                  <IconSearch className="size-4" />
                </div>
              </div>
            </div>
            <FilesTable files={filteredFiles} />
          </div>

          {/* Action Button */}
          <div>
            <button
              onClick={() => alert("Uploading new file...")}
              className="bg-neutral-700 text-white rounded-sm px-4 py-2 hover:bg-neutral-800 transition-colors"
            >
              <IconPlus className="inline mr-1" /> Upload New File
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Files
