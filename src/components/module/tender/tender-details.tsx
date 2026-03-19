"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "requirements", label: "Requirements" },
  { id: "documents", label: "Documents" },
  { id: "costs", label: "Costs" },
  { id: "team", label: "Team Team" },
  { id: "submission", label: "Submission" },
  { id: "result", label: "Result" },
];

type RequirementStatus = "Completed" | "Pending" | "In Progress";

interface Requirement {
  id: string;
  name: string;
  status: RequirementStatus;
  progress: number;
  checked: boolean;
}

const requirements: Requirement[] = [
  {
    id: "1",
    name: "Legal Documentation",
    status: "Completed",
    progress: 100,
    checked: true,
  },
  {
    id: "2",
    name: "QHSE Compliance",
    status: "Completed",
    progress: 100,
    checked: true,
  },
  {
    id: "3",
    name: "Financial Capacity",
    status: "Pending",
    progress: 60,
    checked: true,
  },
  {
    id: "4",
    name: "Technical Proposal",
    status: "Completed",
    progress: 100,
    checked: true,
  },
  {
    id: "5",
    name: "Commercial Proposal",
    status: "In Progress",
    progress: 75,
    checked: true,
  },
  {
    id: "6",
    name: "Data Protection (GDPR)",
    status: "Completed",
    progress: 100,
    checked: true,
  },
];

function getStatusColor(status: RequirementStatus) {
  switch (status) {
    case "Completed":
      return "text-green-600";
    case "Pending":
      return "text-amber-500";
    case "In Progress":
      return "text-slate-600";
    default:
      return "text-slate-600";
  }
}

function getProgressBarColor(status: RequirementStatus) {
  switch (status) {
    case "Completed":
      return "bg-green-500";
    case "Pending":
      return "bg-amber-500";
    case "In Progress":
      return "bg-green-500";
    default:
      return "bg-slate-400";
  }
}

export function TenderDetail() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <Card className="mb-0 rounded-b-none border-b-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-slate-700">
              <FileText className="h-5 w-5 text-slate-500" />
              <span className="font-semibold text-slate-800">
                Tender ID: TND-2026-014
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-500">Bening:</span>
              <span className="font-medium text-blue-600">25 Mar 2026</span>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="bg-white border-x border-slate-200">
          <div className="flex border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-3 text-sm font-medium transition-colors relative",
                  activeTab === tab.id
                    ? "text-slate-800 bg-slate-100"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-700" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Requirements Content */}
        <Card className="rounded-t-none border-t-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-slate-800">
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {requirements.map((requirement) => (
                <div
                  key={requirement.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  {/* Checkbox */}
                  <div className="flex-shrink-0">
                    <div
                      className={cn(
                        "w-6 h-6 rounded flex items-center justify-center",
                        requirement.checked
                          ? "bg-green-500 text-white"
                          : "border-2 border-slate-300",
                      )}
                    >
                      {requirement.checked && <Check className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Requirement Name */}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-slate-700">
                      {requirement.name}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="w-28 text-center">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        getStatusColor(requirement.status),
                      )}
                    >
                      {requirement.status}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div className="w-8 flex justify-center">
                    {requirement.status === "Completed" && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                    {requirement.status === "Pending" && (
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-32 flex-shrink-0">
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          getProgressBarColor(requirement.status),
                        )}
                        style={{ width: `${requirement.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
