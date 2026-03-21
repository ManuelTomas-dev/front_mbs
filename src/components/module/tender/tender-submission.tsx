"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Send,
  Download,
  Check,
  Search,
  FileText,
  CheckCircle,
  Clock,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

const tabs = [
  "Overview",
  "Requirements",
  "Documents",
  "Costs",
  "Team",
  "Submission",
  "Result",
];

const checklistItems = [
  {
    item: "Go",
    type: "Technical Proposal.pdf",
    docType: "Technical Proposal",
    approvedBy: "João Mendes",
    status: "Approved",
    statusDate: "Apr 15, 21pes",
    approved: true,
  },
  {
    item: "Go",
    type: "Contract Terms.docx",
    docType: "Contract Terms.docx",
    approvedBy: "Ana Ribeiro",
    approvedDate: "Requested Apr 15, 2026",
    status: "Pending Approval",
    approved: false,
  },
];

export function TenderSubmissionWorkflow() {
  return (
    <div className="bg-white p-6">
      <div className=" space-y-4">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-200 bg-white/50 rounded-t-lg">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                tab === "Submission"
                  ? "text-slate-800 border-b-2 border-slate-800 bg-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">
            Tender Submission
          </h1>
          <div className="flex items-center gap-3">
            <Button type="button" className="text-white">
              <Send className="h-4 w-4 mr-2" />
              Submit Proposal
            </Button>
            <Button
              variant="outline"
              className="border-slate-300 text-slate-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Main Content */}
          <div className="col-span-8 space-y-4">
            {/* Progress Steps */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between relative">
                  {/* Step 1 - Completed */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-800 mt-2">
                      Compile Submission
                    </span>
                  </div>

                  {/* Progress Line 1 */}
                  <div className="absolute top-5 left-[15%] w-[30%] h-0.5 bg-green-600" />

                  {/* Step 2 - Active */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
                      <Search className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-800 mt-2">
                      Review & Approve
                    </span>
                  </div>

                  {/* Progress Line 2 */}
                  <div className="absolute top-5 left-[55%] w-[30%] h-0.5 bg-slate-200" />

                  {/* Step 3 - Pending */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                      <Send className="h-5 w-5 text-slate-400" />
                    </div>
                    <span className="text-sm text-slate-500 mt-2">
                      Submit Proposal
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mt-6">
                  2 / 2 items require approval before submission
                </p>
              </CardContent>
            </Card>

            {/* Review & Approval Checklist */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-slate-800">
                  Review & Approval Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-2 text-sm font-medium text-slate-600">
                        Item
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-slate-600">
                        Type
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-slate-600">
                        Type
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-slate-600">
                        Approved By
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-slate-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {checklistItems.map((item, index) => (
                      <tr key={index} className="border-b border-slate-100">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-medium text-green-700">
                              Go
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm text-slate-700">
                          {item.type}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-slate-700">
                              {item.docType}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <div>
                            <p className="text-sm text-slate-700">
                              {item.approvedBy}
                            </p>
                            {item.approvedDate && (
                              <p className="text-xs text-slate-500">
                                {item.approvedDate}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          {item.approved ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              <Check className="h-3 w-3 mr-1" />
                              Approved
                              <span className="ml-1 text-xs">
                                {item.statusDate}
                              </span>
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending Approval
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-slate-800">
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-300">
                    <Avatar className="h-12 w-12 rounded-lg grayscale text-center flex flex-row justify-center w-full h-full items-center">
                      <AvatarImage src={"/avatars/shadcn.jpg"} alt={"user"} />
                      <AvatarFallback className="rounded-lg text-center">
                        JM
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-800">
                        João Mendes
                      </span>
                      <span className="text-sm text-slate-500">
                        Apr 15, 2026
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">
                      <span className="font-medium">Please</span> review the
                      contract terms document and approve as soon as possible.
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
                      <span className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-[10px]">@</span>
                        </div>
                        João Mendes
                      </span>
                      <span className="text-slate-400">100</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Review Details */}
          <div className="col-span-4">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-slate-800">
                  Review Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Approved By */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-300">
                    <Avatar className="h-12 w-12 rounded-lg grayscale text-center flex flex-row justify-center w-full h-full items-center">
                      <AvatarImage src={"/avatars/shadcn.jpg"} alt={"user"} />
                      <AvatarFallback className="rounded-lg text-center">
                        AR
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Approved by .</p>
                    <p className="font-medium text-slate-800">Ana Riberio</p>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <p className="text-sm text-slate-600 mb-2">Status</p>
                  <Badge className="bg-blue-400 px-4 py-1">
                    Pending Approval
                  </Badge>
                </div>

                {/* Comments */}
                <div>
                  <p className="text-sm text-slate-600 mb-2">Comments</p>
                  <textarea
                    placeholder="Add a comment..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#6b5b95]/50"
                  />
                  <div className="flex justify-end mt-2">
                    <Button type="button" className="text-white">
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
