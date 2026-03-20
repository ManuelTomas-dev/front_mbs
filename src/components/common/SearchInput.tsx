'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

interface SearchInputProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function SearchInput({
  placeholder = 'Search...',
  onSearch,
  className = '',
}: SearchInputProps) {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onSearch?.(newValue)
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search size={16} className="absolute left-3 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  )
}
