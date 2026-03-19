"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckSquare,
  Calendar,
  DollarSign,
  TrendingUp,
  Check,
  Clock,
  Phone,
  Upload,
} from "lucide-react";

const tabs = [
  "Overview",
  "Overview",
  "Requirements",
  "Documents",
  "Costs",
  "Team",
  "Submission",
  "Result",
];

const proposalSummary = [
  "Subsea engineering services for TotalEnergies expirat...",
  "Provision of equipment supply, installation and commiss...",
  "Compliance with QHSE standards and international regula...",
  "Submission of competitive commercial proposal.",
];

const requirementsLeft = [
  { name: "Legal Documentation", priority: "Low", completed: true },
  { name: "QHSE Compliance", priority: "Low", completed: true },
  { name: "Financial Capacity", priority: "High", completed: true },
  { name: "Technical Proposal", priority: "High", completed: true },
  { name: "Data Protection", priority: "Low", completed: true },
];

const requirementsRight = [
  { name: "Legal Documentation", completed: true },
  { name: "QHSE Compliance", completed: true },
  { name: "Financial Capacity", completed: true },
  { name: "Technical Proposal", completed: true },
  { name: "Data Protection", completed: true },
];

const stakeholders = [
  { name: "Marcos Neves", role: "Sales Lead", avatar: "MN", isCompany: false },
  {
    name: "Petro Oil & Gas",
    role: "Partner Company",
    avatar: "PO",
    isCompany: true,
  },
  { name: "TotalEnergies", role: "Client", avatar: "TE", isCompany: true },
  {
    name: "Jose Oliveira",
    role: "+851 912 698 214",
    avatar: "JO",
    isCompany: false,
    isContact: true,
  },
  {
    name: "Ana Ribeiro",
    role: "+551 915 789 654",
    avatar: "AR",
    isCompany: false,
    isContact: true,
  },
];

export function TenderOverview() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 text-slate-700">
          <CheckSquare className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Tender ID: TND-2026-014</h1>
          <span className="text-slate-400">|</span>
          <span className="font-medium">TotalEnergies</span>
          <span className="text-slate-400">|</span>
          <span>Barring: 25 Mar 2026</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                index === 0
                  ? "text-slate-800 border-b-2 border-slate-800 bg-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Main Content */}
          <div className="col-span-9 space-y-4">
            {/* Stats Bar */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  {/* Company Logo */}
                  <div className="flex items-center gap-3 pr-6 border-r border-slate-200">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full" />
                        <span className="font-bold text-slate-800">
                          TotalEnergies
                        </span>
                      </div>
                      <span className="text-xs text-red-600 italic">
                        TotalEnergies
                      </span>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center gap-3 px-6 border-r border-slate-200">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Deadline</p>
                      <p className="font-semibold text-slate-800">
                        25 Mar 2026
                      </p>
                    </div>
                  </div>

                  {/* Expected Value */}
                  <div className="flex items-center gap-3 px-6 border-r border-slate-200">
                    <DollarSign className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Expected Value</p>
                      <p className="font-semibold text-slate-800">$120,000</p>
                    </div>
                  </div>

                  {/* Tender Progress */}
                  <div className="flex items-center gap-3 pl-6">
                    <TrendingUp className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Tender Progress</p>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-800">78%</p>
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-blue-600 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proposal Summary & Requirements */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Proposal Summary */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Proposal Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {proposalSummary.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span className="text-amber-500 mt-0.5">+</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Requirements with Priority */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="h-4 w-4 text-slate-500" />
                      <CardTitle className="text-base font-semibold text-slate-800">
                        Requirements
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {requirementsLeft.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-slate-700">
                            {req.name}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            req.priority === "High"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-slate-200 bg-slate-50 text-slate-500"
                          }`}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          {req.priority}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Requirements Card */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-slate-100 rounded">
                      <CheckSquare className="h-4 w-4 text-slate-500" />
                    </div>
                    <CardTitle className="text-base font-semibold text-slate-800">
                      Requirements
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>5 of 6-completed</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {requirementsRight.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-slate-700">{req.name}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-amber-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">1 Pending...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar - Key Stakeholders */}
          <div className="col-span-3">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-800">
                  Key Stakeholders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stakeholders.map((person, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {person.isCompany ? (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {person.avatar}
                        </span>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center overflow-hidden">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.name}`}
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">
                        {person.name}
                      </p>
                      {person.isContact ? (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Phone className="h-3 w-3" />
                          <span>{person.role}</span>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500">{person.role}</p>
                      )}
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full mt-4 text-slate-600 border-slate-300"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Add Stakeholder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
