"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  MoreHorizontal,
  MessageSquare,
  Send,
  Target,
  FolderOpen,
  UserPlus,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const tabs = [
  { name: "General", href: "/service-order" },
  { name: "Operational Details", href: "/service-order/operational-details" },
  { name: "Resources", href: "/service-order/resources" },
  { name: "Attachments", href: "/service-order/attachments", active: true },
  { name: "Approval & History", href: "/service-order/approval-history" },
];

const attachedFiles = [
  {
    name: "Chevron Well Intervention 2026 Contract",
    category: "Contract",
    uploadedBy: "João Mendes",
    date: "April 15, 2026",
    avatar: "/placeholder.svg?height=24&width=24",
    icon: FileText,
  },
  {
    name: "SO_Workscope_Specifications_v1.2.pdf",
    category: "Work Scope",
    uploadedBy: "Marcos Neves",
    date: "May 10, 2026",
    avatar: "/placeholder.svg?height=24&width=24",
    icon: FileText,
  },
  {
    name: "Wellbore_Cleanout_HSE_Plan_v1.0.docx",
    category: "HSE",
    uploadedBy: "Antónia Gomes",
    date: "May 10, 2026",
    avatar: "/placeholder.svg?height=24&width=24",
    icon: FileText,
  },
  {
    name: "SO_Quotation_Ref-95872.xlsx",
    category: "Quotation",
    uploadedBy: "João Mendes",
    date: "May 8, 2026",
    avatar: "/placeholder.svg?height=24&width=24",
    icon: FileSpreadsheet,
  },
  {
    name: "P&ID_Well_Piping_Block17_v3.1.dwg",
    category: "Technical Drawing (DWG)",
    uploadedBy: "João Mendes",
    date: "May 7, 2026",
    avatar: "/placeholder.svg?height=24&width=24",
    icon: FileImage,
  },
];

const allAttachments = [
  {
    name: "Chevron Well Intervention 2026 Contract",
    category: "Contract",
    uploadedBy: "João Mendes",
    date: "April 15, 2026",
    avatar: "/placeholder.svg?height=24&width=24",
    icon: FileText,
  },
  {
    name: "SO_Workscope_Specifications_v1.2.pdf",
    category: "Work Scope",
    uploadedBy: "Marcos Neves",
    date: "May 10, 2026",
    avatar: "/placeholder.svg?height=24&width=24",
    icon: FileText,
  },
  {
    name: "SO_Quotation_Ref-95872.xlsx",
    category: "Quotation",
    uploadedBy: "João Mendes",
    date: "May 8, 2026",
    avatar: "/placeholder.svg?height=24&width=24",
    icon: FileSpreadsheet,
  },
];

const activityItems = [
  {
    user: "João Mendes",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "9 days ago",
    message:
      "Added the Chevron Well Intervention 2026 Contract to the service dr.",
  },
  {
    user: "Marcos Neves",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "3.days ago",
    message: "Added the Fesource list 2",
  },
  {
    user: "António Costa",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "2 hours ago",
    message: "Updated resource list",
    hasIndicator: true,
  },
  {
    user: "Antónia Gomes",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "3.days ago",
    subItems: [
      "João Mendes added Chevron Chexdoril",
      "- SO_Workscope_Specifications_v1.2",
      "António Costa updated resource list",
      "Antónia Gomes added",
      "- Wellbore_Cleanout_HSE_Plan_v1.0.docx",
      "- SO_Quotation_Ref-95872.xlsx",
      "- P&D_Well_Piping_Block17_v3.1.dwg.",
    ],
  },
];

export function Attachments() {
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
              className="bg-amber-100 text-amber-700 border-amber-300"
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
            {/* Attachments Header */}
            <h2 className="text-lg font-semibold text-slate-800">
              Attachments
            </h2>

            {/* Attached Files Table */}
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-slate-800">
                    Attached (5)
                    <span className="ml-2 text-slate-500 font-normal">
                      File Type: All
                    </span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">
                      File Type: All
                    </span>
                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-slate-500 border-b border-slate-200 bg-slate-50">
                      <th className="text-left py-3 px-2 font-medium">
                        File Name
                      </th>
                      <th className="text-left py-3 px-2 font-medium">
                        Category
                      </th>
                      <th className="text-left py-3 px-2 font-medium">
                        Uploaded By
                      </th>
                      <th className="text-left py-3 px-2 font-medium">
                        Date Uploaded
                      </th>
                      <th className="text-center py-3 px-2 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {attachedFiles.map((file, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <file.icon className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-[#1e3a5f] hover:underline cursor-pointer">
                              {file.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm text-slate-600">
                          {file.category}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src="" alt="@evilrabbit" />
                              <AvatarFallback>
                                {file.uploadedBy.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-slate-600">
                              {file.uploadedBy}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm text-slate-500">
                          {file.date}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <MoreHorizontal className="h-4 w-4 text-slate-400 inline-block" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    Rows per page:
                    <select className="border border-slate-200 rounded px-2 py-1">
                      <option>1</option>
                      <option>5</option>
                      <option>10</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    1-5 of 5
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-slate-500">1</span>
                    <span className="text-sm text-slate-300">-</span>
                    <span className="text-sm text-slate-500">1</span>
                    <select className="border border-slate-200 rounded px-2 py-1 ml-2">
                      <option>10</option>
                    </select>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All Attachments Table */}
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-500" />
                    Attachments
                    <span className="ml-2 text-slate-500 font-normal">
                      File Type: All
                    </span>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-slate-500 border-b border-slate-200 bg-slate-50">
                      <th className="text-left py-3 px-2 font-medium">
                        File Name
                      </th>
                      <th className="text-left py-3 px-2 font-medium">
                        Category
                      </th>
                      <th className="text-left py-3 px-2 font-medium">
                        Uploaded By
                      </th>
                      <th className="text-left py-3 px-2 font-medium">
                        Date Uploaded
                      </th>
                      <th className="text-center py-3 px-2 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAttachments.map((file, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <file.icon className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-700">
                              {file.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm text-slate-600">
                          {file.category}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src="" alt="@evilrabbit" />
                              <AvatarFallback>
                                {file.uploadedBy.at(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-slate-600">
                              {file.uploadedBy}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm text-slate-500">
                          {file.date}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <MoreHorizontal className="h-4 w-4 text-slate-400 inline-block" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Notes & Activity */}
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
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src="" alt="@evilrabbit" />
                          <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {item.hasIndicator && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-800">
                            {item.user}
                          </span>
                          <span className="text-xs text-slate-400">
                            {item.time}
                          </span>
                        </div>
                        {item.message && (
                          <p className="text-sm text-slate-600 mt-1">
                            {item.message}
                          </p>
                        )}
                        {item.subItems && (
                          <div className="mt-2 space-y-1">
                            {item.subItems.map((subItem, subIndex) => (
                              <p
                                key={subIndex}
                                className="text-xs text-slate-500"
                              >
                                {subItem}
                              </p>
                            ))}
                          </div>
                        )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
