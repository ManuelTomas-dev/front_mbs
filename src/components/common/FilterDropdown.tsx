'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterDropdownProps {
  label: string
  options: { id: string; label: string; count?: number }[]
  onSelect?: (selected: string[]) => void
  defaultValue?: string
  multiple?: boolean
}

export function FilterDropdown({
  label,
  options,
  onSelect,
  defaultValue,
  multiple = false,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(defaultValue ? [defaultValue] : [])

  const handleSelect = (optionId: string) => {
    let newSelected: string[]
    if (multiple) {
      newSelected = selected.includes(optionId)
        ? selected.filter((id) => id !== optionId)
        : [...selected, optionId]
    } else {
      newSelected = selected.includes(optionId) ? [] : [optionId]
      setIsOpen(false)
    }
    setSelected(newSelected)
    onSelect?.(newSelected)
  }

  const displayValue = selected.length > 0
    ? options.find((opt) => opt.id === selected[0])?.label || label
    : label

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        {displayValue}
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-10 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="max-h-60 overflow-y-auto p-2">
            {options.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-50"
              >
                <input
                  type={multiple ? 'checkbox' : 'radio'}
                  name={label}
                  checked={selected.includes(option.id)}
                  onChange={() => handleSelect(option.id)}
                  className="h-4 w-4"
                />
                <span className="flex-1 text-sm text-gray-700">{option.label}</span>
                {option.count !== undefined && (
                  <span className="text-xs text-gray-500">{option.count}</span>
                )}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
