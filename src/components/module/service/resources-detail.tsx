"use client";

import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Users,
  Package,
  MoreHorizontal,
  MessageSquare,
  Target,
  FolderOpen,
  UserPlus,
  Calendar,
  Plus,
  Clock,
  Briefcase,
} from "lucide-react";

const tabs = [
  { name: "General", href: "/service-order" },
  { name: "Operational Details", href: "/service-order/operational-details" },
  { name: "Resources", href: "/service-order/resources-detail", active: true },
  { name: "Attachments", href: "/service-order/attachments" },
  { name: "Approval & History", href: "/service-order/approval-history" },
];

const personnelRequirements = [
  {
    role: "Coiled Tubing Operator",
    qty: 2,
    assigned: "T. Sousa",
    avatar: "/placeholder.svg?height=24&width=24",
    status: "Pending",
    date: "01 Jun 2026",
  },
  {
    role: "HSE Technician",
    qty: 1,
    assigned: null,
    status: "Pending",
    date: "01 Jun 2026",
  },
  {
    role: "Toolpusher",
    qty: 1,
    assigned: "J. Mendes",
    avatar: "/placeholder.svg?height=24&width=24",
    status: "Assigned",
    date: "01 Jun 2026",
  },
  {
    role: "Rigger",
    qty: 2,
    assigned: null,
    status: "Open",
    date: "02 Jun 2026",
  },
];

const equipmentRequired = [
  {
    equipment: "Coiled Tubing Unit",
    qty: 1,
    unit: "Unit",
    availability: "Available",
    date: "01 Jun 2026",
  },
  {
    equipment: "High Pressure Pump",
    qty: 1,
    unit: "Unit",
    availability: "Pending",
    date: "31 May 2026",
  },
  {
    equipment: "Tool Container (20ft)",
    qty: 1,
    unit: "Unit",
    availability: "Booked",
    date: "28 May 2026",
  },
];

const supportRequired = [
  { label: "Procurement", checked: true },
  { label: "Recruitment", checked: true },
  { label: "IT Support", checked: false },
  { label: "Logistics", checked: true },
  { label: "HSE", checked: true },
  { label: "Finance Follow-up", checked: false },
];

const materials = [
  { item: "PPE Kit", qty: 6, status: "Confirmed" },
  { item: "Filtration Package", qty: 1, status: "Confirmed" },
  { item: "Cleaning Brushes", qty: 4, status: "Pending" },
];

export function ResourcesDetail() {
  const [mobilizationRequired, setMobilizationRequired] = useState(true);
  const [transport, setTransport] = useState(true);
  const [accommodation, setAccommodation] = useState(true);
  const [siteAccess, setSiteAccess] = useState(true);

  return (
    <div className="container mx-auto max-w-360 bg-white">
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
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
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
          <div className="col-span-8 space-y-6">
            {/* Personnel Requirements */}
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Personnel Requirements
                  </CardTitle>
                  <Button variant="outline" size="sm" className="gap-1">
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
                      <th className="text-left py-2 font-medium">
                        Required Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {personnelRequirements.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-700">
                              {item.role}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 rounded text-sm text-slate-700">
                            {item.qty}
                          </span>
                        </td>
                        <td className="py-3">
                          {item.assigned ? (
                            <div className="flex items-center gap-2">
                              <Avatar>
                                <AvatarImage src="" alt="@evilrabbit" />
                                <AvatarFallback>
                                  {item.assigned.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-slate-700">
                                {item.assigned}
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
                                ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                : item.status === "Assigned"
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-100"
                            }
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">
                              {item.date}
                            </span>
                            <Calendar className="h-4 w-4 text-slate-400" />
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50">
                      <td className="py-3 text-sm font-medium text-slate-700">
                        Total
                      </td>
                      <td className="py-3 text-center text-sm font-medium text-slate-700">
                        6
                      </td>
                      <td colSpan={3}></td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Equipment Required */}
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Equipment Required
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-[#1e3a5f] border-[#1e3a5f]"
                  >
                    <Plus className="h-4 w-4" />
                    Add Equipment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-slate-500 border-b border-slate-200">
                      <th className="text-left py-2 font-medium">Equipment</th>
                      <th className="text-center py-2 font-medium">Qty</th>
                      <th className="text-left py-2 font-medium">Unit</th>
                      <th className="text-left py-2 font-medium">
                        Availability
                      </th>
                      <th className="text-left py-2 font-medium">
                        Required Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipmentRequired.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-700">
                              {item.equipment}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 rounded text-sm text-slate-700">
                            {item.qty}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-slate-500">
                          {item.unit}
                        </td>
                        <td className="py-3">
                          <Badge
                            className={
                              item.availability === "Available"
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                : item.availability === "Pending"
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                  : "bg-slate-700 text-white hover:bg-slate-700"
                            }
                          >
                            <span className="mr-1">•</span>
                            {item.availability}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">
                              {item.date}
                            </span>
                            <Calendar className="h-4 w-4 text-slate-400" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Support Required */}
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Support Required
                  </CardTitle>
                  <MoreHorizontal className="h-4 w-4 text-slate-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {supportRequired.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Checkbox
                        checked={item.checked}
                        className="border-[#1e3a5f] data-[state=checked]:bg-[#1e3a5f]"
                      />
                      <span className="text-sm text-slate-700">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mobilization */}
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Mobilization
                  </CardTitle>
                  <MoreHorizontal className="h-4 w-4 text-slate-400" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">
                    Mobilization Required
                  </span>
                  <Switch
                    checked={mobilizationRequired}
                    onCheckedChange={setMobilizationRequired}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Start Date</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-700">30 May 2026</span>
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Transport</span>
                  <Switch checked={transport} onCheckedChange={setTransport} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Accommodation</span>
                  <Switch
                    checked={accommodation}
                    onCheckedChange={setAccommodation}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">
                    Site Access / Permits
                  </span>
                  <Switch
                    checked={siteAccess}
                    onCheckedChange={setSiteAccess}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Materials & PPE */}
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Materials & PPE
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-[#1e3a5f]"
                  >
                    <Plus className="h-4 w-4" />
                    Add Item
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
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-700">
                              {item.item}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 text-center text-sm text-slate-700">
                          {item.qty}
                        </td>
                        <td className="py-2">
                          <Badge
                            className={
                              item.status === "Confirmed"
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                            }
                          >
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <MessageSquare className="h-4 w-4" />
              Comments
              <Badge className="bg-slate-200 text-slate-600 hover:bg-slate-200">
                2
              </Badge>
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Save</Button>
            <Button className="text-white">Submit for Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
