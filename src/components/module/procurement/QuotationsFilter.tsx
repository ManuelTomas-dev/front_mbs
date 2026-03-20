'use client'

import { FilterDropdown } from '@/components/common/FilterDropdown'
import { SearchInput } from '@/components/common/SearchInput'

interface QuotationsFilterProps {
  onFilterChange?: (filters: any) => void
}

export function QuotationsFilter({ onFilterChange }: QuotationsFilterProps) {
  const requestNumbers = [
    { id: 'pr-1042', label: 'PR-1042', count: 3 },
    { id: 'pr-1046', label: 'PR-1046', count: 2 },
    { id: 'pr-1050', label: 'PR-1050', count: 1 },
  ]

  const departments = [
    { id: 'all', label: 'All Departments' },
    { id: 'operations', label: 'Operations', count: 4 },
    { id: 'engineering', label: 'Engineering', count: 2 },
    { id: 'finance', label: 'Finance', count: 1 },
  ]

  const statuses = [
    { id: 'all', label: 'All Statuses' },
    { id: 'rf-pending', label: 'RF Pending', count: 5 },
    { id: 'approved', label: 'RF Approved', count: 3 },
    { id: 'rejected', label: 'Rejected', count: 2 },
  ]

  const suppliers = [
    { id: 'all', label: 'All Suppliers' },
    { id: 'baker', label: 'Baker Hughes', count: 4 },
    { id: 'halliburton', label: 'Halliburton', count: 2 },
    { id: 'schlumberger', label: 'Schlumberger', count: 2 },
  ]

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 gap-3 flex-wrap">
        <FilterDropdown
          label="Request Number"
          options={requestNumbers}
          defaultValue="pr-1042"
        />
        <FilterDropdown
          label="All Departments"
          options={departments}
          defaultValue="all"
        />
        <FilterDropdown
          label="All Statuses"
          options={statuses}
          defaultValue="all"
        />
        <FilterDropdown
          label="All Suppliers"
          options={suppliers}
          defaultValue="all"
        />
      </div>

      <div className="flex gap-3">
        <SearchInput placeholder="Search..." className="w-64" />
        <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700">
          CSV Export
        </button>
      </div>
    </div>
  )
}
