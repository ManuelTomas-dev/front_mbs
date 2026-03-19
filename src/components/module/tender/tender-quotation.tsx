"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  FileText,
  DollarSign,
  CheckCircle,
  TrendingUp,
  Calendar,
  ChevronDown,
} from "lucide-react";

const statsCards = [
  {
    label: "Total Tenders",
    value: "24",
    icon: FileText,
    iconColor: "text-slate-600",
  },
  {
    label: "Total Value Pipeline",
    value: "$21,150,750",
    icon: DollarSign,
    iconColor: "text-slate-600",
  },
  {
    label: "Approved Value",
    value: "$8,345,300",
    icon: CheckCircle,
    iconColor: "text-emerald-500",
  },
  {
    label: "Conversion Rate",
    value: "45%",
    icon: TrendingUp,
    iconColor: "text-blue-500",
  },
];

const columns = [
  { id: "draft", label: "Draft", color: "bg-slate-400" },
  { id: "in-progress", label: "In Progress", color: "bg-amber-400" },
  { id: "submitted", label: "Submitted", color: "bg-emerald-500" },
  { id: "won", label: "Won", color: "bg-slate-300" },
  { id: "lost", label: "Lost", color: "bg-slate-300" },
];

const tenders = [
  {
    id: 1,
    column: "draft",
    company: "TotalEnergies ITT",
    logo: "T",
    logoColor: "bg-red-500",
    date: "24 Mar, 2026",
    tag: "TotalEnergies",
    tagColor: "bg-red-100 text-red-600",
  },
  {
    id: 2,
    column: "draft",
    company: "TotalEnergies Bid",
    logo: "T",
    logoColor: "bg-red-500",
    date: "24 Mar, 2026",
    tag: "Submitted",
    tagColor: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 3,
    column: "in-progress",
    company: "Sonangol QHSE Audit",
    logo: "S",
    logoColor: "bg-amber-500",
    date: "20+ Mar 2026",
    tag: "To Review",
    tagColor: "bg-amber-100 text-amber-600",
  },
  {
    id: 4,
    column: "in-progress",
    company: "Sonamet: Inspection Bid",
    logo: "S",
    logoColor: "bg-slate-600",
    date: "5+4 Mar 2026",
    tag: "No Review",
    tagColor: "bg-slate-100 text-slate-600",
  },
  {
    id: 5,
    column: "submitted",
    company: "TotalEmergies",
    logo: "T",
    logoColor: "bg-red-500",
    date: "30 Mar; $120,000",
    tag: "Submitted",
    tagColor: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 6,
    column: "submitted",
    company: "Sonangol",
    logo: "S",
    logoColor: "bg-amber-500",
    date: "31 Mar, 2022",
    tag: "10 Rejected",
    tagColor: "bg-red-100 text-red-600",
  },
  {
    id: 7,
    column: "won",
    company: "Sonamet Inspection Bid",
    logo: "S",
    logoColor: "bg-slate-600",
    date: "28+ Mar 2026",
    tag: "Total+Fluor",
    tagColor: "bg-blue-100 text-blue-600",
  },
  {
    id: 8,
    column: "won",
    company: "Sonangol QHSE Audit",
    logo: "S",
    logoColor: "bg-amber-500",
    date: "24 Mar 2026",
    tag: "Submitted",
    tagColor: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 9,
    column: "lost",
    company: "reyurstacy (UBS)",
    logo: "R",
    logoColor: "bg-slate-400",
    date: "",
    tag: "",
    tagColor: "",
  },
];

export function QuotationManagement() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-slate-600" />
          <h1 className="text-2xl font-bold text-slate-800">
            CRM Quotation Management
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                    <span>{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and New Tender */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search..."
              className="border-slate-200 bg-white pl-10"
            />
          </div>
          <Button className="gap-2 bg-slate-700 hover:bg-slate-800">
            <Plus className="h-4 w-4" />
            New Tender
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">
                Filters
              </span>
              {columns.map((col) => (
                <Button
                  key={col.id}
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-slate-600 hover:bg-slate-100"
                >
                  <div className={`h-2 w-2 rounded-full ${col.color}`} />
                  {col.label}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {columns.map((column) => (
            <div key={column.id} className="space-y-3">
              {/* Column Header */}
              <div className="flex items-center gap-2 px-1">
                <div className={`h-3 w-3 rounded-full ${column.color}`} />
                <span className="text-sm font-medium text-slate-600">
                  {column.label}
                </span>
              </div>

              {/* Column Cards */}
              <div className="space-y-3">
                {tenders
                  .filter((t) => t.column === column.id)
                  .map((tender) => (
                    <Card
                      key={tender.id}
                      className="border-0 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded text-sm font-bold text-white ${tender.logoColor}`}
                            >
                              {tender.logo}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-slate-700">
                                {tender.company}
                              </h4>
                              {tender.date && (
                                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                  <Calendar className="h-3 w-3" />
                                  {tender.date}
                                </div>
                              )}
                            </div>
                          </div>
                          {tender.tag && (
                            <Badge
                              variant="secondary"
                              className={`text-xs ${tender.tagColor}`}
                            >
                              {tender.tag}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
