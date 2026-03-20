'use client'

import { FilterDropdown } from '@/components/common/FilterDropdown'
import { SearchInput } from '@/components/common/SearchInput'

interface RFApprovalFilterProps {
  onFilterChange?: (filters: any) => void
}

export function RFApprovalFilter({ onFilterChange }: RFApprovalFilterProps) {
  const rfNumbers = [
    { id: 'all', label: 'RF Number' },
  ]

  const departments = [
    { id: 'all', label: 'All Departments' },
    { id: 'operations', label: 'Operations', count: 4 },
    { id: 'engineering', label: 'Engineering', count: 2 },
  ]

  const approvalStates = [
    { id: 'all', label: 'Approval State' },
    { id: 'pending', label: 'Pending Approval', count: 6 },
    { id: 'approved', label: 'Approved', count: 3 },
    { id: 'rejected', label: 'Rejected', count: 1 },
  ]

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex flex-1 gap-3 flex-wrap">
        <FilterDropdown
          label="RF Number"
          options={rfNumbers}
          defaultValue="all"
        />
        <FilterDropdown
          label="All Departments"
          options={departments}
          defaultValue="all"
        />
        <FilterDropdown
          label="Approval State"
          options={approvalStates}
          defaultValue="all"
        />
        <FilterDropdown
          label="All"
          options={[{ id: 'all', label: 'All' }]}
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
