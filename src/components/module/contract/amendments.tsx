"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Eye,
  Pencil,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

type AmendmentStatus =
  | "in-review"
  | "approved"
  | "pending-approval"
  | "completed";

interface Amendment {
  id: string;
  title: string;
  type: string;
  status: AmendmentStatus;
  effectiveDate: string;
  lastUpdated: string;
}

const amendments: Amendment[] = [
  {
    id: "1",
    title: "Pricing Adjustment",
    type: "Financial",
    status: "in-review",
    effectiveDate: "Mar 10, 2024",
    lastUpdated: "Apr 01, 2024",
  },
  {
    id: "2",
    title: "Term Extension",
    type: "Duration",
    status: "approved",
    effectiveDate: "Jan 15, 2024",
    lastUpdated: "Jan 20, 2024",
  },
  {
    id: "3",
    title: "Scope Modification",
    type: "Scope",
    status: "pending-approval",
    effectiveDate: "Feb 05, 2024",
    lastUpdated: "Feb 10, 2024",
  },
  {
    id: "4",
    title: "Data Security Update",
    type: "Compliance",
    status: "completed",
    effectiveDate: "Dec 12, 2023",
    lastUpdated: "Dec 15, 2023",
  },
];

const statusConfig: Record<
  AmendmentStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  "in-review": {
    label: "In Review",
    icon: Clock,
    className: "bg-orange-50 text-orange-600 border-orange-200",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    className: "bg-green-50 text-green-600 border-green-200",
  },
  "pending-approval": {
    label: "Pending Approval",
    icon: AlertCircle,
    className: "bg-amber-50 text-amber-600 border-amber-200",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-green-50 text-green-600 border-green-200",
  },
};

function StatusBadge({ status }: { status: AmendmentStatus }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}

export function ContractAmendments() {
  const [activeTab, setActiveTab] = useState("all");

  const stats = [
    { label: "Total Amendments", value: 4, color: "text-slate-800" },
    { label: "Active Amendments", value: 3, color: "text-green-600" },
    { label: "Pending Approval", value: 1, color: "text-red-600" },
    { label: "Completed", value: 2, color: "text-slate-500" },
  ];

  const tabs = [
    { id: "all", label: "All Amendments" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-800">
              Contract Amendments
            </h1>
            <nav className="flex items-center gap-2 text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                Contracts
              </a>
              <ChevronRight className="h-4 w-4 text-slate-400" />
              <span className="text-slate-600">Software License Agreement</span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
              <span className="text-slate-600">Amendments</span>
            </nav>
          </div>
          <Button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Amendment
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white rounded-lg p-1 w-fit shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-slate-100 text-slate-800"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="bg-white border-slate-200 shadow-sm"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    {stat.label}
                  </span>
                  <span className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Table */}
        <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Amendment Title
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Type
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Effective Date
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Last Updated
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {amendments.map((amendment, index) => (
                  <tr
                    key={amendment.id}
                    className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                      index % 2 === 1 ? "bg-slate-50/50" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        {amendment.title}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {amendment.type}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={amendment.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {amendment.effectiveDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {amendment.lastUpdated}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white">
            <span className="text-sm text-slate-600">
              Showing 1 to 4 of 4 entries
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="text-slate-600 border-slate-300"
                disabled
              >
                Previous
              </Button>
              <Button
                size="sm"
                className="bg-[#1e3a5f] hover:bg-[#152a45] text-white min-w-[32px]"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-slate-600 border-slate-300"
                disabled
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
