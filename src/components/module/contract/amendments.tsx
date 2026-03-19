"use client";

import { useState } from "react";
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
import CardContainer from "@/components/generic/card-container";
import Card from "@/components/generic/card";
import Table from "@/components/generic/table";
import Search from "@/components/generic/search";
import ActionBar from "@/components/generic/action-bar";
import AddAction from "@/components/generic/add-action";

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
  type ViewMode = "table" | "cards" | "list";

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editEntity, setEditEntity] = useState({});
  const [detailsEntity, setDetailsEntity] = useState({});
  const [formOpen, setFormOpen] = useState(false);

  const tabs = [
    { id: "all", label: "All Amendments" },
    { id: "active", label: "Active" },
    { id: "archived", label: "Archived" },
  ];

  const tableHeads = [
    "Amendment Title",
    "Status",
    "Effective Date",
    "Last Updated",
  ];
  return (
    <div className="min-h-screen p-6">
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
        <CardContainer>
          <Card title="Total Amendments" content="4" />
          <Card title="Active Amendments" content="4" />
          <Card title="Pending Approval" content="4" />
          <Card title="Completed" content="4" />
        </CardContainer>

        {/* Data Table */}
        <ActionBar>
          <Search
            searchBarPlaceholder="Search contracts..."
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <AddAction
            addActionName="New Amendment"
            viewMode={viewMode}
            setViewMode={setViewMode}
            setAddFormOpen={setFormOpen}
            setSelectedEntity={setEditEntity}
          ></AddAction>
        </ActionBar>
        <Table tableHeads={tableHeads}></Table>
      </div>
    </div>
  );
}
