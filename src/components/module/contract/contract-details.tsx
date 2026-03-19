"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Check,
  Pencil,
  Plus,
  FileText,
  Download,
  Mail,
  Phone,
  MessageSquare,
  MoreHorizontal,
  FileIcon,
  ClipboardList,
} from "lucide-react";

export function ContractDetail() {
  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800">
              CTR-2026-0042{" "}
              <span className="text-slate-400 font-normal">|</span> Well
              Intervention Services
            </h1>
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1 px-3 py-1">
              <Check className="h-3.5 w-3.5" />
              Active
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 bg-white">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" className="gap-2 bg-white">
              <Plus className="h-4 w-4" />
              Add Amendment
            </Button>
            <Button variant="outline" className="gap-2 bg-white">
              <ClipboardList className="h-4 w-4" />
              Create Service Order
            </Button>
            <Button type="button">Export PDF</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mt-4">
          <Tabs defaultValue="contract-info" className="w-full">
            <TabsList className="h-auto p-0 w-full">
              <TabsTrigger value="contract-info" className="">
                Contract Information
              </TabsTrigger>
              <TabsTrigger value="contract">Contract</TabsTrigger>
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Contract Information Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Contract Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <span className="text-slate-500 text-sm min-w-[50px]">
                  Client:
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <span className="text-blue-600 font-medium text-sm">
                    MCT Oil Gas
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-500 text-sm min-w-[50px]">
                  Title:
                </span>
                <span className="text-blue-600 font-medium text-sm">
                  Well Intervention Services
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <span className="text-slate-500 text-sm">Contract Type:</span>
                </div>
                <div>
                  <span className="text-slate-800 text-sm">
                    Service Contract
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-sm">Currency:</span>
                </div>
                <div>
                  <span className="text-slate-800 text-sm">USD ($)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-500 text-sm">
                    Total Contract Value:
                  </span>
                  <span className="text-slate-800 font-semibold">
                    $2,500,000
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 text-sm">Payment Terms:</span>
                  <span className="text-slate-800 text-sm">Net 30 Days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operational Links Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Operational Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-800 mb-3">
                  Related Service Orders
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <span className="text-blue-600 text-sm font-medium">
                      ORS-2026-0123
                    </span>
                    <span className="text-slate-500 text-xs">
                      Well Intervention at Bock 9
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <span className="text-blue-600 text-sm font-medium">
                      ORS-2026-0075
                    </span>
                    <span className="text-slate-500 text-xs">
                      Coiled Tubing Operations.
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-500 text-sm">
                    Active Projects:
                  </span>
                  <span className="text-slate-600 text-sm">
                    Subsea Well Cleanup Project
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-sm">Mobilizations:</span>
                  <span className="text-slate-800 font-semibold">2</span>
                  <span className="text-slate-500 text-sm">
                    20-site mobilizations
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scope & Description Downloads */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Scope & Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <FileIcon className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="text-sm text-slate-700">
                    Signed Contract
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">2.1 MB</span>
                  <Download className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <FileIcon className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="text-sm text-slate-700">
                    Technical Specifications
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">1.5 MB</span>
                  <Download className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Financial Summary Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FinancialRow
                label="Total Value:"
                value="$2,500,000"
                percentage={100}
                color="bg-slate-300"
                showBar={false}
              />
              <FinancialRow
                label="Revenue Recognized:"
                value="$1,280,000"
                percentage={51.2}
                color="bg-orange-500"
              />
              <FinancialRow
                label="Remaining Value:"
                value="$1,220,000"
                percentage={48.8}
                color="bg-blue-500"
              />
              <FinancialRow
                label="Invoiced Amount:"
                value="$1,100,000"
                percentage={44}
                color="bg-emerald-500"
              />
              <FinancialRow
                label="Paid Amount:"
                value="$1,050,000"
                percentage={42}
                color="bg-green-600"
              />
              <FinancialRow
                label="Outstanding Balance:"
                value="$50,000"
                percentage={2}
                color="bg-amber-500"
              />
            </CardContent>
          </Card>

          {/* Scope & Description Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Scope & Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-slate-600 text-sm leading-relaxed">
                <span className="font-semibold text-slate-700">
                  Comprehensive:
                </span>{" "}
                Well Intervention Services including Coiled Tubing operations,
                wellbore cleanout, and flow assurance activities to maximize
                production efficiency.
              </p>

              <div>
                <h4 className="font-semibold text-slate-700 text-sm mb-2">
                  Deliverables:
                </h4>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Wellbore debris removal
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Fluid circulation and cleanout
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Data reporting and analysis
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-700 text-sm mb-2">
                  SLA / KPIs:
                </h4>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    24/7 operational readiness
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Daily progress reports
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Adherence to safety and compliance standards
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Contacts Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 ">
                  <Avatar className="h-12 w-12 rounded-lg grayscale text-center flex flex-row justify-center w-full h-full items-center">
                    <AvatarImage src={"/avatars/shadcn.jpg"} alt={"user"} />
                    <AvatarFallback className="rounded-lg text-center">
                      PA
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 text-sm">
                    Pedro Almeida
                  </h4>
                  <p className="text-xs text-slate-500">MCT Oil Gas</p>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">
                        pedro.almeida@mctoilaa...
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        <span>+1 (832) 555-2048</span>
                      </div>
                      <MessageSquare className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                  <Avatar className="h-12 w-12 rounded-lg grayscale text-center flex flex-row justify-center w-full h-full items-center">
                    <AvatarImage src={"/avatars/shadcn.jpg"} alt={"user"} />
                    <AvatarFallback className="rounded-lg text-center">
                      JM
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">
                    João Mendes
                  </h4>
                  <p className="text-xs text-slate-500">
                    Converted Quotation-Q.2028.0053
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Documents
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4 text-slate-500" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <DocumentRow
                name="Signed Contract"
                filename="ctr-2025-0042.pdf"
                size="2 MB"
              />
              <DocumentRow
                name="Technical Specifications"
                size="1.5 kB"
                badge="13"
              />
              <DocumentRow name="Annex: Safety Compliance" size="476 kB" />
            </CardContent>
          </Card>

          {/* Activity Card Bottom */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                  <Avatar className="h-12 w-12 rounded-lg grayscale text-center flex flex-row justify-center w-full h-full items-center">
                    <AvatarImage src={"/avatars/shadcn.jpg"} alt={"user"} />
                    <AvatarFallback className="rounded-lg text-center">
                      JM
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-800 text-sm">
                      João Mendes
                    </h4>
                    <span className="text-xs text-slate-400">3 days ago</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Converted Quotation-Q.2028.-
                    <br />
                    into the contract.
                    <span className="text-slate-400 ml-1">a.2028.a96</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FinancialRow({
  label,
  value,
  percentage,
  color,
  showBar = true,
}: {
  label: string;
  value: string;
  percentage: number;
  color: string;
  showBar?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-slate-600 min-w-[140px]">{label}</span>
      {showBar ? (
        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      ) : (
        <div className="flex-1" />
      )}
      <span className="text-sm font-semibold text-slate-800 min-w-[100px] text-right">
        {value}
      </span>
    </div>
  );
}

function DocumentRow({
  name,
  filename,
  size,
  badge,
}: {
  name: string;
  filename?: string;
  size: string;
  badge?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
          <FileIcon className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700">{name}</p>
          {filename && <p className="text-xs text-slate-400">{filename}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">{size}</span>
        {badge && (
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-600 text-xs px-1.5"
          >
            {badge}
          </Badge>
        )}
      </div>
    </div>
  );
}
