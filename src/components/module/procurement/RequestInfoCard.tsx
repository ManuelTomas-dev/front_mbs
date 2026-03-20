'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ProcurementRequest } from '@/lib/types'

interface RequestInfoCardProps {
  request: ProcurementRequest
  onUpdate?: (updated: Partial<ProcurementRequest>) => void
}

export function RequestInfoCard({
  request,
  onUpdate,
}: RequestInfoCardProps) {
  const [departments] = useState(['Operations', 'Engineering', 'Finance', 'HR'])
  const [currencies] = useState(['USD', 'EUR', 'GBP', 'BRL'])
  const [projects] = useState(['Project A', 'Project B', 'Project C'])

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">Request Information</h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Request Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Request Number:
          </label>
          <input
            type="text"
            value={request.requestNumber}
            readOnly
            className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department:
          </label>
          <div className="relative mt-2">
            <select
              value={request.department}
              onChange={(e) => onUpdate?.({ department: e.target.value })}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 pr-10"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="text"
            value={request.date}
            readOnly
            className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900"
          />
        </div>
      </div>

      {/* Required Date Section */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h4 className="mb-4 text-sm font-medium text-gray-900">Required Date</h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Estimated Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estimated Budget:
            </label>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">$</span>
              <input
                type="number"
                value={request.estimatedBudget}
                onChange={(e) => onUpdate?.({ estimatedBudget: parseFloat(e.target.value) })}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900"
              />
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Currency:
            </label>
            <div className="relative mt-2">
              <select
                value={request.currency}
                onChange={(e) => onUpdate?.({ currency: e.target.value })}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 pr-10"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Estimated Date (Right Column) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estimated Date:
            </label>
            <input
              type="text"
              placeholder="--/--/--"
              className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900"
            />
          </div>

          {/* Linked Project */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Linked Project:
            </label>
            <div className="relative mt-2">
              <select
                value={request.linkedProject || ''}
                onChange={(e) => onUpdate?.({ linkedProject: e.target.value || undefined })}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 pr-10"
              >
                <option value="">Select a project</option>
                {projects.map((proj) => (
                  <option key={proj} value={proj}>
                    {proj}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Display Summary */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-600">Currency:</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">{request.currency}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-600">Total Budget:</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {request.estimatedBudget.toLocaleString()}.00 {request.currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
