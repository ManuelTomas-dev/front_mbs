"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  Calendar,
  Users,
  Paperclip,
  MoreHorizontal,
  MessageSquare,
  Send,
  Target,
  FolderOpen,
  UserPlus,
  CheckSquare,
} from "lucide-react";

const tabs = [
  { name: "General", href: "/service-order", active: true },
  { name: "Operational Details", href: "/service-order/operational-details" },
  { name: "Resources", href: "/service-order/resources" },
  { name: "Attachments", href: "/service-order/attachments" },
  { name: "Approval & History", href: "/service-order/approval-history" },
];

const workflowStatuses = [
  { id: "draft", label: "Draft" },
  { id: "under-review", label: "Under Review", active: true },
  { id: "approved", label: "Approved" },
  { id: "released", label: "Released" },
  { id: "in-execution", label: "In Execution" },
  { id: "closed", label: "Closed" },
];

const resourceItems = [
  {
    name: "Coiled Tubing Operator",
    qty: 1,
    equipment: "1 x",
    status: "Pending",
    checked: true,
  },
  {
    name: "Filtration Package",
    qty: 1,
    equipment: "1 x",
    status: "Pending",
    checked: true,
  },
  {
    name: "PPE Kit",
    qty: 6,
    equipment: "1 x",
    status: "Standard",
    checked: false,
  },
  {
    name: "Drill Pipe Scrapers",
    qty: 4,
    equipment: "1 x",
    status: "Standard",
    checked: false,
  },
  {
    name: "Permit Reference",
    qty: 4.7,
    equipment: "WP48632",
    status: "High",
    checked: false,
    isPermit: true,
  },
];

const activityItems = [
  {
    user: "João Mendes",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "",
    message:
      "Submiting SO for review. Please check the operational details and resource.",
    hasIndicator: true,
  },
  {
    user: "António Costa",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "20 minutes ago",
    message:
      "Reviewing the service order now. I'll confirm back to you shortly.",
  },
];

export function Overview() {
  const [selectedStatus, setSelectedStatus] = useState("under-review");

  return (
    <div className="container mx-auto max-w-360 bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-white to-blue-600 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-slate-800">CH</span>
            </div>
            <h1 className="text-xl font-semibold text-slate-800">
              Vellboreleanout – Block 17
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
            <div className="grid grid-cols-2 gap-6">
              {/* Service Order Information */}
              <Card className="bg-white border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Service Order Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">
                      Service Order
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      SO-2026-0012
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Title:</span>
                    <span className="text-sm font-medium text-slate-800">
                      Wellbore Cleanout – Block 17
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">
                      Contract Reference:
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      Chevron Well Intervention - 2026
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Created by:</span>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/placeholder.svg?height=24&width=24"
                        alt="João Mendes"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm font-medium text-slate-800">
                        João Mendes
                      </span>
                      <Badge
                        variant="outline"
                        className="bg-slate-100 text-slate-600 border-slate-300"
                      >
                        Under Review
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Work Location */}
              <Card className="bg-white border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Work Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Country:</span>
                    <span className="text-sm font-medium text-slate-800">
                      Angola
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">City/Base:</span>
                    <span className="text-sm font-medium text-slate-800">
                      Offshore Block 17
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">
                      Client Contact:
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      Tyler Sousa
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-slate-500">Email:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-800">
                        tylersousa@chevron.com
                      </span>
                      <span className="text-sm text-slate-500">
                        t:+244 (923) 456-789
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Tabs */}
            <div className="flex gap-2 mt-6">
              <Button type="button" className="text-white gap-2">
                <Target className="h-4 w-4" />
                Objective & Scope
              </Button>
              <Button variant="outline" className="gap-2 text-slate-600">
                <Calendar className="h-4 w-4" />
                Service Start Date
              </Button>
              <Button variant="outline" className="gap-2 text-slate-600">
                <Users className="h-4 w-4" />
                Project
              </Button>
              <Button variant="outline" className="gap-2 text-slate-600">
                <Paperclip className="h-4 w-4" />
                Attachments
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              {/* Objective & Scope */}
              <Card className="bg-white border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-slate-800">
                    Objective & Scope
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-slate-700">
                      Objective:
                    </span>
                    <span className="text-sm text-slate-600 ml-2">
                      Restore wellbore circulation efficiency
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Scope of Work:
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Mobilize for wellbore cleanout operation in Offshore Block
                      17. Deploy coiled tubing with cleanout tools, perform
                      brushing operation to remove scale and debris from inside
                      the well. Circulate and displace dislodged debris from the
                      wellbore to improve circulation efficiency for subsequent
                      activities.
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-700">
                      Deliverables:
                    </span>
                    <span className="text-sm text-slate-600 ml-2">
                      Daily Report, Final Report
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700">
                      Permit Required:
                    </span>
                    <span className="text-sm text-slate-600">tt WP48632</span>
                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                  </div>
                </CardContent>
              </Card>

              {/* Resources & Preparations */}
              <Card className="bg-white border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    Resources & Preparations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-8 mb-4">
                    <span className="text-sm font-medium text-slate-600">
                      Personnel
                    </span>
                    <span className="text-sm font-medium text-slate-600">
                      Equipment
                    </span>
                  </div>
                  <div className="space-y-3">
                    {resourceItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Checkbox
                          checked={item.checked}
                          className="border-emerald-500 data-[state=checked]:bg-emerald-500"
                        />
                        <span className="text-sm text-slate-700 flex-1">
                          {item.name}
                        </span>
                        <span className="text-sm text-slate-500 w-8 text-center">
                          {item.qty}
                        </span>
                        <span className="text-sm text-slate-500 w-12">
                          {item.equipment}
                        </span>
                        <Badge
                          className={`text-xs ${
                            item.status === "Pending"
                              ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                              : item.status === "High"
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                : "bg-[#1e3a5f] text-white hover:bg-[#1e3a5f]"
                          }`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Approval Workflow */}
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
                    <span>Submit For Review</span>
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
                      <div className="relative">
                        <Image
                          src={item.avatar}
                          alt={item.user}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        {item.hasIndicator && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-800">
                            {item.user}
                          </span>
                          {item.time && (
                            <span className="text-xs text-slate-400">
                              {item.time}
                            </span>
                          )}
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
              <CheckSquare className="h-4 w-4" />
              <span className="text-sm">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
