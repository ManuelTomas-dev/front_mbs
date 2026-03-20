'use client'

import { FileIcon, Upload } from 'lucide-react'
import { useState } from 'react'

interface PaymentProofUploadProps {
  onUpload?: (file: File) => void
}

export function PaymentProofUpload({ onUpload }: PaymentProofUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setFileName(file.name)
      onUpload?.(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFileName(file.name)
      onUpload?.(file)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Upload Payment Proof</h3>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
        />

        <div className="flex flex-col items-center justify-center">
          <Upload className="mb-4 h-8 w-8 text-gray-400" />
          <p className="text-sm font-medium text-gray-900">
            {fileName ? (
              <>
                <FileIcon className="mb-2 inline mr-2 h-4 w-4" />
                {fileName}
              </>
            ) : (
              <>
                Drag & drop payment proof here, or <span className="text-blue-600 font-semibold">Browse</span>
              </>
            )}
          </p>
          <p className="mt-1 text-xs text-gray-600">
            Supported formats: PDF, DOC, DOCX, XLS, XLSX
          </p>
        </div>
      </div>

      <button className="mt-6 w-full rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700">
        Confirm Payment
      </button>
    </div>
  )
}
