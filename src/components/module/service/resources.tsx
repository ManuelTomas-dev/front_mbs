"use client";

import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users,
  Package,
  Briefcase,
  Settings,
  MoreHorizontal,
  MessageSquare,
  Send,
  Target,
  FolderOpen,
  UserPlus,
  CheckSquare,
  Calendar,
  Plus,
  Tag,
  Box,
} from "lucide-react";
import CardContainer from "@/components/generic/card-container";
import CardItem from "@/components/generic/card";

const tabs = [
  { name: "General", href: "/operation/services-order/details", active: true },
  { name: "Operational Details", href: "/operation/services-order/qualification-certification" },
  { name: "Resources", href: "/operation/services-order/qualification-list" },
  { name: "Attachments", href: "#/operation/services-order/" },
  { name: "Approval & History", href: "#/operation/services-order/" },
];
const summaryStats = [
  { icon: Users, label: "Personnel", value: "6", subtext: "Required" },
  {
    icon: Tag,
    label: "Equipment",
    value: "12",
    subtext: "Items",
    badge: "5 Pending",
    badgeColor: "amber",
  },
  {
    icon: Box,
    label: "Materials",
    value: "18",
    subtext: "Items",
    badge: "Ready",
    badgeColor: "emerald",
  },
  {
    icon: Settings,
    label: "Support",
    badges: [
      { text: "HR", color: "slate" },
      { text: "Proc", color: "amber" },
      { text: "HSE", color: "emerald" },
    ],
  },
];

const personnelRequirements = [
  {
    role: "Coiled Tubing Operator",
    qty: 2,
    assigned: 1,
    status: "Pending",
    avatar: null,
  },
  {
    role: "Field Supervisor",
    qty: 1,
    assigned: 1,
    status: "Assigned",
    avatar: "/placeholder.svg?height=24&width=24",
    assignedName: "João M.",
  },
  {
    role: "HSE Officer",
    qty: 1,
    assigned: 1,
    status: "Assigned",
    avatar: "/placeholder.svg?height=24&width=24",
    assignedName: "Patricia L.",
  },
  { role: "Technician", qty: 2, assigned: 0, status: "Pending", avatar: null },
];

const equipmentRequirements = [
  {
    item: "High Pressure Pump",
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
    icon: Box,
  },
  {
    item: "Cleaning Tools Kit",
    qty: 5,
    status: "In Stock",
    availableFrom: "Immediate",
    icon: Briefcase,
  },
  {
    item: "Generator 100kVA",
    qty: 1,
    status: "Scheduled",
    availableFrom: "May 31, 2026",
    icon: Settings,
  },
];

const materialsConsumables = [
  { material: "EPIs (Full Kit)", qty: 6, uom: "Units", status: "Ready" },
  { material: "Drill Pipe Scrapers", qty: 4, uom: "Units", status: "Ready" },
  {
    material: "Filtration Cartridges",
    qty: 12,
    uom: "Units",
    status: "Ordered",
  },
  {
    material: "Lubricants & Fluids",
    qty: 200,
    uom: "Liters",
    status: "Pending",
  },
];

const internalSupport = [
  { label: "Procurement", checked: true },
  { label: "Recruitment", checked: true },
  { label: "IT Support", checked: false },
  { label: "Logistics", checked: true },
  { label: "HSE", checked: true },
  { label: "Finance", checked: false },
];

const activityItems = [
  {
    user: "João Mendes",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "2 hours ago",
    message: "Updated resource list",
  },
  {
    user: "António Costa",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "1 hour ago",
    message: "Confirmed equipment availability",
  },
  {
    user: "HSE Team",
    icon: true,
    time: "30 min ago",
    message: "Approved safety plan",
  },
  {
    user: "System",
    icon: true,
    time: "Today: 09.12",
    message: "Budget checked – Within limit",
    highlight: true,
  },
];

export function Resources() {
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
            <Button className="text-white">Submit for Review</Button>
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
        {/* Summary Stats */}
        <CardContainer>
          <CardItem title="Personnel" content="6" />
          <CardItem title="Equipment" content="12" />
          <CardItem title="Materials" content="18" />
          <CardItem title="Budget Impact" content="$78,500" />
        </CardContainer>

        <div className="mt-4 grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Personnel Requirements */}
              <Card className="bg-white border-slate-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-slate-800">
                      Personnel Requirements
                    </CardTitle>
                    <Button size="sm" className="text-white gap-1">
                      <Plus className="h-4 w-4" />
                      Add Role
                    </Button>
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
                        <th className="text-left py-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personnelRequirements.map((item, index) => (
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
                                    {item.assignedName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-slate-700">
                                  {item.assignedName}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-slate-400">—</span>
                            )}
                          </td>
                          <td className="py-3">
                            <Badge
                              className={
                                item.status === "Pending"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-emerald-100 text-emerald-700"
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-1">
                              <div className="w-8 h-1 bg-red-400 rounded" />
                              <MoreHorizontal className="h-4 w-4 text-slate-400" />
                            </div>
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
                    <Button size="sm" className="text-white gap-1">
                      <Plus className="h-4 w-4" />
                      Add Equipment
                    </Button>
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
                              <item.icon className="h-4 w-4 text-slate-400" />
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
                                  ? "bg-amber-100 text-amber-700"
                                  : item.status === "Confirmed"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : item.status === "In Stock"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-blue-100 text-blue-700"
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

            <div className="grid grid-cols-2 gap-6">
              {/* Materials & Consumables */}
              <Card className="bg-white border-slate-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-slate-800">
                      Materials & Consumables
                    </CardTitle>
                    <Button size="sm" className="text-white gap-1">
                      <Plus className="h-4 w-4" />
                      Add Material
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-slate-500 border-b border-slate-200">
                        <th className="text-left py-2 font-medium">Material</th>
                        <th className="text-center py-2 font-medium">Qty</th>
                        <th className="text-left py-2 font-medium">UoM</th>
                        <th className="text-left py-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {materialsConsumables.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="py-3 text-sm text-slate-700">
                            {item.material}
                          </td>
                          <td className="py-3 text-sm text-slate-700 text-center">
                            {item.qty}
                          </td>
                          <td className="py-3 text-sm text-slate-500">
                            {item.uom}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-1">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  item.status === "Ready"
                                    ? "bg-emerald-500"
                                    : item.status === "Ordered"
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                                }`}
                              />
                              <span
                                className={`text-sm ${
                                  item.status === "Ready"
                                    ? "text-emerald-600"
                                    : item.status === "Ordered"
                                      ? "text-blue-600"
                                      : "text-amber-600"
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Internal Support */}
              <Card className="bg-white border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-800">
                    Internal Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {internalSupport.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"
                      >
                        <Checkbox
                          checked={item.checked}
                          className="border-emerald-500 data-[state=checked]:bg-emerald-500"
                        />
                        <span className="text-sm text-slate-700">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4">
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-800">
                  Notes & Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityItems.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      {item.icon ? (
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-slate-500" />
                        </div>
                      ) : (
                        <Avatar className="h-8 w-8">
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
                        <p
                          className={`text-sm mt-0.5 ${item.highlight ? "text-emerald-600" : "text-slate-600"}`}
                        >
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
                    placeholder="Add a comment..."
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
      </div>
    </div>
  );
}
