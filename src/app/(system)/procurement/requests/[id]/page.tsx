'use client'

import { useEffect, useState } from 'react'
import { MoreVertical } from 'lucide-react'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'

import { StatusBadge } from '@/components/common/StatusBadge'
import { ActionButton } from '@/components/common/ActionButton'
import { getProcurementRequest } from '@/lib/mockData'
import { ProcurementRequest } from '@/lib/types'
import { RequestInfoCard } from '@/components/module/procurement/RequestInfoCard'
import { ItemsTable } from '@/components/module/procurement/ItemsTable'
import { QuotationsTable } from '@/components/module/procurement/QuotationsTable'
import { WorkflowStatus } from '@/components/module/procurement/WorkflowStatus'

export default function RequestDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = require('react').use(params) || { id: '1' }
    const [request, setRequest] = useState<ProcurementRequest | null>(null);

    useEffect(() => {
        // Função para carregar os dados
        const loadData = async () => {
            const data = getProcurementRequest(id) || getProcurementRequest('1');
            setRequest(data as ProcurementRequest);
        };

        loadData();
    }, [id]); // O useEffect roda sempre que o 'id' mudar
    const [showMenu, setShowMenu] = useState(false)

    if (!request) {
        return <div>Request not found</div>
    }

    const quotationsForRequest = [
        {
            id: '1',
            quotationNumber: 'QUO-5072',
            requestNumber: request.requestNumber,
            requestId: request.id,
            supplier: 'Baker Hughes',
            amount: 12000,
            currency: 'USD',
            delivery: '10 days',
            warranty: '1 year',
            rfStatus: 'RF Pending' as const,
            validUntil: '15 Mar 2026',
        },
    ]

    return (
        <main className="min-h-screen bg-gray-50">
            <BreadcrumbNav
                items={[
                    { label: 'Procurement', href: '/procurement' },
                    { label: 'Requests', href: '/procurement/requests' },
                    { label: request.requestNumber },
                ]}
            />

            <div className="px-6 py-6">
                {/* Header Section */}
                <div className="mb-8 flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Procurement Request — {request.requestNumber}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <StatusBadge status="Draft" />
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="rounded-lg p-2 hover:bg-gray-200"
                            title="More options"
                        >
                            <MoreVertical size={20} className="text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mb-8 flex gap-3">
                    <button className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50">
                        Save Draft
                    </button>
                    <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700">
                        Submit Request
                    </button>
                    <button className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Form Sections */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Request Information */}
                        <RequestInfoCard
                            request={request}
                            onUpdate={(updated) => setRequest({ ...request, ...updated })}
                        />

                        {/* Items Section */}
                        <ItemsTable items={request.items} totalAmount={12000} />

                        {/* Quotations Section */}
                        <QuotationsTable quotations={quotationsForRequest} />

                        {/* Workflow Status */}
                        <WorkflowStatus currentStep="Request" />
                    </div>

                    {/* Right Column - Summary */}
                    <div>
                        {/* Summary Card */}
                        <div className="sticky top-6 rounded-lg border border-gray-200 bg-white p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Request Number</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {request.requestNumber}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-gray-200 pt-4">
                                    <span className="text-sm text-gray-600">Department</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {request.department}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-gray-200 pt-4">
                                    <span className="text-sm text-gray-600">Date</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {request.date}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-gray-200 pt-4">
                                    <span className="text-sm text-gray-600">Estimated Budget</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {request.estimatedBudget.toLocaleString()} {request.currency}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-gray-200 pt-4">
                                    <span className="text-sm text-gray-600">Items</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {request.items.length}
                                    </span>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <p className="text-xs text-gray-600 mb-2">Status</p>
                                    <StatusBadge status={request.status} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
