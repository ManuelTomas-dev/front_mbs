"use client";

import { useState } from "react";
import {
  Clock,
  Target,
  Users,
  Truck,
  DollarSign,
  BarChart2,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Edit,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const taskColumns = [
  {
    label: "To Do",
    color: "bg-blue-600",
    tasks: [
      { name: "Tank Cleaning \\ Initial Setup", done: true, error: false },
    ],
  },
  {
    label: "In Progress",
    color: "bg-slate-600",
    tasks: [
      { name: "Tank Cleaning \\ Pump Operation", done: true, error: false },
    ],
  },
  {
    label: "Review",
    color: "bg-slate-600",
    tasks: [
      { name: "Tank Cleaning \\ Pump Operation", done: false, error: true },
    ],
  },
  {
    label: "Approved",
    color: "bg-slate-600",
    tasks: [
      { name: "Tank Cleaning \\ Inspection Report", done: true, error: false },
    ],
  },
  {
    label: "Done",
    color: "bg-slate-600",
    tasks: [],
  },
  {
    label: "Canceled",
    color: "bg-slate-600",
    tasks: [
      {
        name: "Tank Cleaning \\ Extra Crew",
        done: false,
        error: true,
        canceled: true,
      },
    ],
  },
];

const stakeholders = [
  { role: "Procurement Manager", name: "Marcos Neves", bold: true },
  { role: "HR Supervisor", name: "Ana Gomes", bold: false },
  { role: "IT Admin", name: "Ricardo Lopes", bold: true },
  { role: "Finance Manager", name: "Fernando dos Santos", bold: false },
];

type TabKey =
  | "Timesheets"
  | "Targets"
  | "Members"
  | "Mobilization"
  | "Project Cost"
  | "KPI";

const tabs: TabKey[] = [
  "Timesheets",
  "Targets",
  "Members",
  "Mobilization",
  "Project Cost",
  "KPI",
];

const tabIcons: Record<TabKey, React.ReactNode> = {
  Timesheets: <Clock className="h-4 w-4" />,
  Targets: <Target className="h-4 w-4" />,
  Members: <Users className="h-4 w-4" />,
  Mobilization: <Truck className="h-4 w-4" />,
  "Project Cost": <DollarSign className="h-4 w-4" />,
  KPI: <BarChart2 className="h-4 w-4" />,
};

const tabContent: Record<TabKey, React.ReactNode> = {
  Timesheets: (
    <div>
      <p className="text-sm text-slate-500">Total Hours:</p>
      <p className="text-lg font-bold text-blue-600">320h</p>
    </div>
  ),
  Targets: (
    <div>
      <p className="text-sm text-slate-500">Project Code:</p>
      <p className="font-semibold text-slate-700">TC-017</p>
    </div>
  ),
  Members: (
    <div>
      <p className="text-sm text-slate-500">Team Members:</p>
      <p className="font-semibold text-slate-700">8</p>
    </div>
  ),
  Mobilization: (
    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-8">
      Request Resources
    </Button>
  ),
  "Project Cost": (
    <div>
      <p className="text-sm text-slate-500">Total Cost:</p>
      <p className="font-semibold text-slate-700">$450,000</p>
    </div>
  ),
  KPI: (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <DollarSign className="h-4 w-4 text-emerald-500" />
        <span className="text-sm font-semibold text-slate-700">
          Profit: $750,000
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-red-500 inline-block" />
        <span className="text-sm text-slate-600">Incidents: 2</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-amber-400 inline-block" />
        <span className="text-sm text-slate-600">Client Rating:</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`h-3.5 w-3.5 ${s <= 3 ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

export function Module() {
  const [activeTab, setActiveTab] = useState<TabKey>("Timesheets");

  return (
    <div className="bg-white container mx-auto max-w-360 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-bbg-white">
        <h1 className="text-xl font-semibold text-slate-800">Project Module</h1>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100">
        {/* Left column */}
        <div className="px-6 py-5 space-y-3">
          {[
            {
              label: "Project:",
              value: "Tank Cleaning – FPSO Block 17",
              bold: true,
            },
            { label: "Project Owner:", value: "João Mendes" },
            { label: "Project Type:", value: "Tank Cleaning" },
            { label: "Report to:", value: "António Costa" },
            { label: "Create Date:", value: "2024-04-24" },
            { label: "Starting Date:", value: "2024-05-01", bold: true },
            { label: "Deadline:", value: "2024-06-30", bold: true },
          ].map((row) => (
            <div key={row.label} className="flex items-start gap-2">
              <span className="text-sm font-semibold text-slate-600 min-w-[120px]">
                {row.label}
              </span>
              <span
                className={`text-sm ${row.bold ? "font-semibold text-slate-800" : "text-slate-600"}`}
              >
                {row.value}
              </span>
            </div>
          ))}

          {/* Stakeholders */}
          <div className="flex items-start gap-2">
            <span className="text-sm font-semibold text-slate-600 min-w-[120px]">
              Stakeholders:
            </span>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-[8px] bg-blue-100 text-blue-700">
                    JM
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-slate-600">João Mendes</span>
              </div>
              {stakeholders.map((s) => (
                <div key={s.role} className="flex items-center gap-2 pl-1">
                  <span className="text-xs text-slate-400 w-36">{s.role}</span>
                  <span
                    className={`text-sm ${s.bold ? "font-semibold text-slate-700" : "text-slate-600"}`}
                  >
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="px-6 py-5 space-y-3 shadow-md">
          {[
            { label: "Client:", value: "PetroAngola", bold: true },
            { label: "Work Location:", value: "Offshore Block 17" },
            { label: "Contact:", value: "Carlos Silva" },
            { label: "Email:", value: "carlos.silva@example.com" },
            { label: "Telephone:", value: "+244 923 456 789" },
            { label: "Objective:", value: "Tank Cleaning Operation" },
            {
              label: "Scope:",
              value: "Cleaning and waste disposal of tanks as per contract",
            },
          ].map((row) => (
            <div key={row.label} className="flex items-start gap-2">
              <span className="text-sm font-semibold text-slate-600 min-w-[110px]">
                {row.label}
              </span>
              <span
                className={`text-sm ${row.bold ? "font-semibold text-slate-800" : "text-slate-600"}`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-slate-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab
                ? "border-blue-600 text-white bg-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            {tabIcons[tab]}
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-6 py-4 min-h-[80px] border-b border-slate-100">
        {tabContent[activeTab]}
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-6 divide-x divide-slate-100 border-b border-slate-100">
        {taskColumns.map((col) => (
          <div key={col.label} className="flex flex-col">
            <div
              className={`px-3 py-2 text-center text-xs font-semibold text-white ${col.color}`}
            >
              {col.label}
            </div>
            <div className="p-2 space-y-2 min-h-[80px]">
              {col.tasks.map((task) => (
                <div
                  key={task.name}
                  className="bg-slate-50 rounded-lg p-2 border border-slate-200"
                >
                  <p className="text-xs text-slate-700 leading-tight">
                    {task.name}
                  </p>
                  <div className="mt-1.5 h-1 bg-slate-200 rounded-full w-full" />
                  <div className="flex justify-end mt-1">
                    {/* {task.canceled ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : task.error ? (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 flex justify-center">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Plus className="h-4 w-4" />
          Create New Task
        </Button>
      </div>
    </div>
  );
}
