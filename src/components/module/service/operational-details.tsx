"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Globe,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
  MoreHorizontal,
  MessageSquare,
  Send,
  Target,
  FolderOpen,
  UserPlus,
  CheckSquare,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Smile,
  Type,
} from "lucide-react";
const tabs = [
  { name: "General", href: "/operation/services-order/details", active: true },
  { name: "Operational Details", href: "/operation/services-order/qualification-certification" },
  { name: "Resources", href: "/operation/services-order/qualification-list" },
  { name: "Attachments", href: "#/operation/services-order/" },
  { name: "Approval & History", href: "#/operation/services-order/" },
];

const workflowStatuses = [
  { id: "draft", label: "Draft" },
  { id: "under-review", label: "Under Review", active: true },
  { id: "approved", label: "Approved" },
  { id: "released", label: "Released" },
  { id: "in-execution", label: "In Execution" },
  { id: "closed", label: "Closed" },
];

const specialInstructions = [
  "Confirm wellbore condition prior to operation.",
  "Adhere to Chevron offshore procedures and guidelines.",
  "Ensure functional check of all cleanout tools.",
];

const hseRequirements = [
  { text: "Conduct site-specific safety bieing upon arrival.", checked: true },
  { text: "Adhere to Chevron's HSE management system.", checked: true },
  { text: "Monitor and report all safety observations.", checked: true },
];

const activityItems = [
  {
    user: "João Mendes",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "2 hours ago",
    message:
      "Submitting SO for review. Please Check the operational details and resource requirements.",
  },
  {
    user: "António Costa",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "20 minutes ago",
    message:
      "Reviewing the service order now. I'll confirm back to you shortly.",
  },
];

export function OperationalDetails() {
  const [selectedStatus, setSelectedStatus] = useState("under-review");

  return (
    <div className="container mx-auto max-w-360 bg-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-red-600 via-white to-blue-600 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-slate-800">CH</span>
            </div>
            <h1 className="text-xl font-semibold text-slate-800">
              Vellbore Cleanout – Block 17
            </h1>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 border-b border-slate-200 -mb-4">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab.active
                  ? "text-slate-800 border-slate-800"
                  : "text-slate-500 border-transparent hover:text-slate-700"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8">
            {/* Operational Details Header */}
            <Card className="bg-white border-slate-200 mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Operational Details
                </CardTitle>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              {/* Scope of Work */}
              <div className="space-y-4">
                <Card className="bg-white border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-slate-800">
                        Scope of Work
                      </CardTitle>
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4">
                      - Mobilize to Offshore Block 17.
                    </p>

                    {/* Rich Text Editor Toolbar */}
                    <div className="flex items-center gap-1 p-2 bg-slate-50 rounded-t-lg border border-slate-200 border-b-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Underline className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-4 bg-slate-300 mx-1" />
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <List className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <AlignRight className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-4 bg-slate-300 mx-1" />
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Type className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="p-3 border border-slate-200 rounded-b-lg min-h-30">
                      <p className="text-sm text-slate-700">
                        - Mobilize to Offshore Block 17. Deploy coiled tubing
                        with cleanout tools down into the wellbore. Perform
                        brushing operation to remove scale and debris from
                        inside the well. Circulate and displace dislodged
                        material from the wellbore to surface.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Deliverables */}
                <Card className="bg-white border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Deliverables
                      </CardTitle>
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked
                          className="border-[#1e3a5f] data-[state=checked]:bg-[#1e3a5f]"
                        />
                        <span className="text-sm text-slate-700">
                          Daily Report
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox className="border-slate-300" />
                        <span className="text-sm text-slate-700">
                          Final Report
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Special Instructions */}
                <Card className="bg-white border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-slate-800">
                        Special Instructions
                      </CardTitle>
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {specialInstructions.map((instruction, index) => (
                        <li key={index} className="text-sm text-slate-600">
                          - {instruction}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Client Constraints */}
                <Card className="bg-white border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-slate-800">
                        Client Constraints
                      </CardTitle>
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </div>
                  </CardHeader>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Operational Dates */}
                <Card className="bg-white border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-800">
                      Operational Dates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Service Start Date:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800">
                          June 1, 2026
                        </span>
                        <Calendar className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Expected End Date:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800">
                          June 5, 2026
                        </span>
                        <Calendar className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Operational Deadline:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800">
                          June 6, 2026
                        </span>
                        <Calendar className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Estimated Duration:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800">
                          5 days
                        </span>
                        <AlertCircle className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Priority: High
                      </span>
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        High
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Special Instructions (duplicate from image) */}
                <Card className="bg-white border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Special Instructions
                      </CardTitle>
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {specialInstructions.map((instruction, index) => (
                        <li key={index} className="text-sm text-slate-600">
                          - {instruction}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* HSE Requirements */}
                <Card className="bg-white border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        HSE Requirements
                      </CardTitle>
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {hseRequirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Checkbox
                            checked={req.checked}
                            className="border-[#1e3a5f] data-[state=checked]:bg-[#1e3a5f] mt-0.5"
                          />
                          <span className="text-sm text-slate-600">
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Approval Workflow */}
          <div className="col-span-4">
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-800">
                  Approval Workflow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {workflowStatuses.map((status) => (
                    <div
                      key={status.id}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        status.active ? "bg-[#1e3a5f]/10" : "hover:bg-slate-50"
                      }`}
                      onClick={() => setSelectedStatus(status.id)}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          status.active
                            ? "border-amber-500 bg-amber-500"
                            : "border-slate-300"
                        }`}
                      >
                        {status.active && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          status.active
                            ? "font-medium text-slate-800"
                            : "text-slate-600"
                        }`}
                      >
                        {status.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MessageSquare className="h-4 w-4" />
                    <span>Submit Tor Review</span>
                    <div className="flex items-center gap-1 ml-auto">
                      <MessageSquare className="h-4 w-4" />
                      <span>2</span>
                    </div>
                    <MoreHorizontal className="h-4 w-4" />
                  </div>
                </div>

                {/* Activity */}
                <div className="mt-4 space-y-4">
                  {activityItems.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <Image
                        src={item.avatar}
                        alt={item.user}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-800">
                            {item.user}
                          </span>
                          <span className="text-xs text-slate-400">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <div className="mt-4 flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Add a note... @ for mentioning"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-[#1e3a5f]"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-600">
              <Calendar className="h-4 w-4" />
              Timesheets
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-slate-600">
              <Target className="h-4 w-4" />
              Targets
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-slate-600">
              <FolderOpen className="h-4 w-4" />
              Files
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-slate-600">
              <UserPlus className="h-4 w-4" />
              Edit Order
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-slate-600">
              <MessageSquare className="h-4 w-4" />
              Comments
              <Badge className="bg-slate-200 text-slate-600 hover:bg-slate-200">
                2
              </Badge>
            </Button>
            <MoreHorizontal className="h-4 w-4 text-slate-400" />
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" className="text-white">
              Submit for Review
            </Button>
            <Button variant="outline">Edit Order</Button>
            <div className="flex items-center gap-1 text-slate-500">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">2</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <CheckSquare className="h-4 w-4" />
              <span className="text-sm">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
