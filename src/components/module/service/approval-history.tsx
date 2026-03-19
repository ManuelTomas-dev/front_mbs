"use client";

import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  MoreHorizontal,
  MessageSquare,
  Send,
  Target,
  FolderOpen,
  UserPlus,
  Calendar,
  CheckSquare,
} from "lucide-react";

const tabs = [
  { name: "General", href: "/service-order" },
  { name: "Operational Details", href: "/service-order/operational-details" },
  { name: "Resources", href: "/service-order/resources" },
  { name: "Attachments", href: "/service-order/attachments" },
  {
    name: "Approval & History",
    href: "/service-order/approval-history",
    active: true,
  },
];

const workflowStatuses = [
  { id: "draft", label: "Draft" },
  { id: "under-review", label: "Under Review", active: true },
  { id: "approved", label: "Approved" },
  { id: "released", label: "Released" },
  { id: "in-execution", label: "In Execution" },
  { id: "closed", label: "Closed" },
];

const approvalRequirements = [
  { role: "Coiled Tubing Operator", qty: 2, assigned: 1, status: "Pending" },
  {
    role: "Field Supervisor",
    qty: 1,
    assigned: 1,
    status: "Assigned",
    avatar: "/placeholder.svg?height=24&width=24",
    assignedName: "João Mendes",
  },
  {
    role: "HSE Officer",
    qty: 1,
    assigned: 1,
    status: "Assigned",
    avatar: "/placeholder.svg?height=24&width=24",
    assignedName: "Patrícia L...",
  },
];

const equipmentRequirements = [
  {
    item: "High Pressure Pu...",
    qty: 1,
    status: "Pending",
    availableFrom: "May 28, 2026",
    icon: Package,
  },
  {
    item: "Coiled Tubing Unit",
    qty: 1,
    status: "Confirmed",
    availableFrom: "May 30, 2026",
    icon: Package,
  },
  {
    item: "Cleaning Tools Kit",
    qty: 1,
    status: "In Stock",
    availableFrom: "Immediate",
    icon: Package,
  },
  {
    item: "Generator 100kVA",
    qty: 1,
    status: "Scheduled",
    availableFrom: "May 31, 2026",
    icon: Package,
  },
];

const discussionItems = [
  {
    user: "João Mendes",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "2 hours ago",
    message:
      "Submitting SO for review. Please check the operational details and resource requirements.",
  },
  {
    user: "António Costa",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "20 minutes ago",
    message:
      "Reviewing the service order now. I'll confirm back to you shortly.",
  },
  {
    user: "Marcos Neves",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "Today, 09:12",
    message: "Created the Service order - Draft",
    icon: true,
  },
  {
    user: "System",
    time: "Today, 09:12",
    message: "State changed from Draft to Under Review",
    highlight: "Under Review",
    icon: true,
  },
  {
    user: "System",
    time: "09:12",
    message: "Budget checked - Within Budget",
    highlightGreen: "Within Budget",
    icon: true,
  },
];

export function ApprovalHistory() {
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
              Wellbore Cleanout – Block 17
            </h1>
            <Badge
              variant="outline"
              className="bg-slate-100 text-slate-600 border-slate-300"
            >
              Under Review
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              Service Start: Jun 1, 2026
            </span>
            <span className="text-sm text-slate-500">
              Expected End: Jun 5, 2026
            </span>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="gap-2">
              Actions
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
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
            {/* Approval Workflow Section */}
            <Card className="bg-white border-slate-200 mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-800">
                  Approval Workflow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  {/* Status Radio Buttons */}
                  <div className="space-y-2">
                    {workflowStatuses.map((status) => (
                      <div
                        key={status.id}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                          status.active
                            ? "bg-[#1e3a5f]/10"
                            : "hover:bg-slate-50"
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

                  {/* Status Details */}
                  <div className="col-span-2 space-y-4">
                    <h3 className="text-sm font-semibold text-slate-800">
                      Status
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Service Start:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-800">
                          Jun 1, 2026
                        </span>
                        <Calendar className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Expected End:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-800">
                          Jun 5, 2026
                        </span>
                        <span className="text-sm text-slate-500">
                          Ask for TICW
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm text-slate-500">
                          Prepared by:
                        </span>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src="" alt="@evilrabbit" />
                            <AvatarFallback>ER</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              Marcos Neves
                            </p>
                            <p className="text-xs text-slate-500">
                              Procurement Manager
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 ml-auto">
                          2 days ago
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm text-slate-500">
                          Approval by:
                        </span>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src="" alt="@evilrabbit" />
                            <AvatarFallback>AC</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              António Costa
                            </p>
                            <p className="text-xs text-slate-500">
                              Operations Supervisor
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 ml-auto">
                          20 minutes ago
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500">
                          Approval by:
                        </span>
                      </div>

                      <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                        <input
                          type="text"
                          placeholder="Add comment for review process..."
                          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Approval & Equipment Requirements */}
            <div className="grid grid-cols-2 gap-6">
              {/* Approval Requirements */}
              <Card className="bg-white border-slate-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-slate-800">
                      Approval Requirements
                    </CardTitle>
                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-slate-500 border-b border-slate-200">
                        <th className="text-left py-2 font-medium">Role</th>
                        <th className="text-center py-2 font-medium">Qty</th>
                        <th className="text-left py-2 font-medium">Assigned</th>
                        <th className="text-left py-2 font-medium">Status</th>
                        <th className="w-8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvalRequirements.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="py-3 text-sm text-slate-700">
                            {item.role}
                          </td>
                          <td className="py-3 text-sm text-slate-700 text-center">
                            {item.qty}
                          </td>
                          <td className="py-3">
                            {item.avatar ? (
                              <div className="flex items-center gap-2">
                                <Avatar>
                                  <AvatarImage src="" alt="@evilrabbit" />
                                  <AvatarFallback>
                                    {item.assignedName.at(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-slate-700">
                                  {item.assignedName}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-slate-400">
                                {item.assigned}
                              </span>
                            )}
                          </td>
                          <td className="py-3">
                            <Badge
                              className={
                                item.status === "Pending"
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Equipment Requirements */}
              <Card className="bg-white border-slate-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-slate-800">
                      Equipment Requirements
                    </CardTitle>
                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-slate-500 border-b border-slate-200">
                        <th className="text-left py-2 font-medium">Item</th>
                        <th className="text-center py-2 font-medium">Qty</th>
                        <th className="text-left py-2 font-medium">Status</th>
                        <th className="text-left py-2 font-medium">
                          Available From
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {equipmentRequirements.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-slate-400" />
                              <span className="text-sm text-slate-700">
                                {item.item}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 text-sm text-slate-700 text-center">
                            {item.qty}
                          </td>
                          <td className="py-3">
                            <Badge
                              className={
                                item.status === "Pending"
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                  : item.status === "Confirmed"
                                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                    : item.status === "In Stock"
                                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                      : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td className="py-3 text-sm text-slate-500">
                            {item.availableFrom}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            {/* Notes */}
            <Card className="bg-white border-slate-200 mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-800">
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                  <Avatar>
                    <AvatarImage src="" alt="@evilrabbit" />
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-800">
                        João Mendes
                      </span>
                      <span className="text-xs text-slate-400">
                        Apr 15, 2026
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      Please{" "}
                      <span className="font-medium">
                        review the contract terms document
                      </span>{" "}
                      and approve as soon as possible.
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-[#1e3a5f]">
                      <span className="text-[#1e3a5f]">@a</span>
                      <span>João Mendes</span>
                      <span className="text-slate-400">100</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Discussion & History */}
          <div className="col-span-4">
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-800">
                  Discussion & History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discussionItems.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      {item.icon ? (
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-slate-500" />
                        </div>
                      ) : (
                        <Avatar>
                          <AvatarImage src="" alt="@evilrabbit" />
                          <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
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
                          {item.highlight && (
                            <span className="text-[#1e3a5f] font-medium ml-1">
                              {item.highlight}
                            </span>
                          )}
                          {item.highlightGreen && (
                            <span className="text-emerald-600 font-medium ml-1">
                              {item.highlightGreen}
                            </span>
                          )}
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
            <Button className="text-white">Submit for Review</Button>
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
