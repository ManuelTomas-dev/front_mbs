"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  FileText,
  Plus,
  Timer,
  ToggleRight,
  ChevronRight,
  Send,
  MoreHorizontal,
  Shield,
  Drill,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

// ─── Vacuum Unit / Tank Cleaning Task ───────────────────────────────────────

export function TankCleaningTaskDetail() {
  const [note, setNote] = useState("");

  const activities = [
    {
      user: "Francisco Dias",
      initials: "FD",
      time: "20 min",
      text: "@CarlosSilva The vacuum unit is up and running smoothly, and the sludge transfer is 50% complete. Monitoring the levels now.",
      color: "bg-blue-600",
    },
    {
      user: "Carlos Silva",
      initials: "CS",
      time: "4 minute",
      text: "@FranciscoDias Great to hear! Keep up the good work!",
      color: "bg-slate-500",
    },
    {
      user: "Paulo Almeida",
      initials: "PA",
      time: "3 hours ago",
      text: "@FranciscoDias Great to hear! Keep up the good work!",
      color: "bg-slate-400",
    },
  ];

  return (
    <div className="flex gap-0 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4 text-slate-500" />
            </Button>
            <h2 className="font-bold text-slate-800 text-base">
              Tank Cleaning \ Vacuum Unit Operation
            </h2>
          </div>
          <Badge className="bg-blue-600 text-white hover:bg-blue-700 text-xs">
            In Progress
          </Badge>
        </div>

        {/* Meta row */}
        <div className="px-5 py-3 border-b border-slate-100 grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex gap-2">
            <span className="font-semibold text-slate-600">Client:</span>
            <span className="text-slate-700">Carlos Silva — PetroAngola</span>
          </div>
          <div className="flex gap-2 justify-end">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className="text-slate-500">May 10, 2024</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold text-slate-600">Deadline:</span>
            <span className="text-slate-700">May 10, 2024</span>
            <span className="ml-4 font-semibold text-slate-600">Priority:</span>
            <Badge
              variant="outline"
              className="text-amber-600 border-amber-300 bg-amber-50 h-5 text-xs"
            >
              ☺ Medium
            </Badge>
          </div>
          <div />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Responsible:</span>
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-[8px] bg-blue-100 text-blue-700">
                FD
              </AvatarFallback>
            </Avatar>
            <span className="text-slate-700">Francisco Dias</span>
          </div>
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs gap-1.5">
              <Timer className="h-3.5 w-3.5" />
              Timer
            </Button>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <span className="font-semibold text-slate-600">Task:</span>
            <span className="text-slate-700">
              Tank Cleaning \ Pump Operation
            </span>
            <div className="flex-1 mx-3">
              <Progress value={50} className="h-2" />
            </div>
            <span className="text-sm text-slate-500">
              50% &nbsp; 4a / 4 est.
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          {["Subtask Detail", "Files", "Timesheets"].map((tab, i) => (
            <button
              key={tab}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                i === 0
                  ? "border-blue-600 text-white bg-blue-600"
                  : "border-transparent text-slate-600 hover:bg-slate-50"
              }`}
            >
              {i === 0 && <Shield className="h-3.5 w-3.5" />}
              {i === 1 && <FileText className="h-3.5 w-3.5" />}
              {i === 2 && <Plus className="h-3.5 w-3.5" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Subtask Detail */}
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex gap-6 text-sm">
            <div>
              <span className="font-semibold text-slate-600">Progress: </span>
              <span className="text-slate-800 font-bold">50%</span>
            </div>
            <div>
              <span className="font-semibold text-slate-600">
                Hours Logged:{" "}
              </span>
              <span className="text-slate-700">2h / 4h est.</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-slate-500 text-xs">20 /</span>
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-slate-500 text-xs">4 Time</span>
              <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 h-4 w-4 bg-white rounded-full shadow" />
              </div>
            </div>
          </div>
        </div>

        {/* Description Tabs */}
        <div className="flex border-b border-slate-100 px-5 pt-3">
          {["Description", "Files", "Timesheets"].map((tab, i) => (
            <button
              key={tab}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md mr-1 ${
                i === 0
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {i === 1 && <FileText className="h-3.5 w-3.5" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Sub-description item */}
        <div className="px-5 py-3 border-b border-slate-100">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-slate-700" />
              <span className="text-sm font-semibold text-slate-800">
                Tank Cleaning \ Safety Briefing
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">08:00–10:00 2h</span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Timesheets */}
        <div className="px-5 py-3">
          <div className="flex gap-2 mb-3">
            {["Timeseees", "Edit", "Other"].map((tab, i) => (
              <button
                key={tab}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md ${
                  i === 0
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="bg-slate-50 rounded-lg p-3 flex items-center justify-between text-sm border border-slate-100">
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[8px] bg-blue-100 text-blue-700">
                  FD
                </AvatarFallback>
              </Avatar>
              <span className="text-slate-700">
                Francisco Dias. 03:00–10:00 (2h)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-xs">08 6 Time Log</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-2 gap-2 text-sm text-slate-600 border-slate-200"
          >
            <Plus className="h-4 w-4" />
            Add Time Log
          </Button>
        </div>
      </div>

      {/* Right Side - Activities */}
      <div className="w-72 border-l border-slate-100 flex flex-col">
        <div className="px-4 py-3 border-b border-slate-100">
          <h3 className="font-semibold text-slate-700 text-sm">Activities</h3>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {activities.map((act, i) => (
            <div key={i}>
              <div className="flex items-start gap-2">
                <Avatar className="h-7 w-7 mt-0.5">
                  <AvatarFallback
                    className={`text-[9px] text-white ${act.color}`}
                  >
                    {act.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      {act.user}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-slate-400">
                        {act.time}
                      </span>
                      <ChevronRight className="h-3 w-3 text-slate-300" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {act.text}
                  </p>
                </div>
              </div>
              {i < activities.length - 1 && <Separator className="mt-3" />}
            </div>
          ))}
        </div>

        {/* Add note */}
        <div className="px-4 py-3 border-t border-slate-100">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
            <input
              className="flex-1 text-xs outline-none text-slate-600 placeholder:text-slate-400"
              placeholder="Add a note... @ for mentioning"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Send className="h-4 w-4 text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
          </div>
        </div>

        {/* Second activities block */}
        <div className="px-4 py-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-700 text-sm">Activities</h3>
            <MoreHorizontal className="h-4 w-4 text-slate-400 cursor-pointer" />
          </div>
          <div className="space-y-3">
            {[
              {
                initials: "FD",
                name: "FranciscoDias",
                time: "20 minutes ago",
                text: "@FranciscoDias Great to hear! Keep up the good work!",
                color: "bg-blue-600",
              },
              {
                initials: "PA",
                name: "Paulo Almeida",
                time: "3 hours ago",
                text: "@FranciscoDias 'She sure nicee Gched...die taste a",
                color: "bg-slate-400",
              },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback
                    className={`text-[8px] text-white ${act.color}`}
                  >
                    {act.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-semibold text-slate-700">
                      {act.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {act.time}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    {act.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Wellbore Cleanout Brushing Operation Task ───────────────────────────────

export function WellboreTaskDetail() {
  return (
    <div className="flex gap-0 bg-white rounded-xl  container mx-auto max-w-360 shadow-sm overflow-hidden">
      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-5 py-3 border-b">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-slate-800">Task</span>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                className="pl-3 pr-8 py-1.5 rounded-lg text-sm outline-none text-slate-600 placeholder:text-slate-400 bg-white"
                placeholder="Task"
              />
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Shield className="h-4 w-4 text-slate-400" />
            </Button>
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                JM
              </div>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                5
              </span>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="px-5 py-2 text-xs text-slate-400 border-b border-slate-100">
          Project:{" "}
          <span className="text-blue-600 cursor-pointer">Wellborecleanout</span>
          {" > "}Task: Wellborecleanout \ Brushing Operation
        </div>

        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4 text-slate-500" />
            </Button>
            <h2 className="font-bold text-slate-800 text-base">
              Wellborecleanout \ Brushing Operation
            </h2>
          </div>
          <Badge className="bg-amber-500 text-white hover:bg-amber-600 text-xs">
            Delayed
          </Badge>
        </div>

        {/* Meta */}
        <div className="px-5 py-3 space-y-2 text-sm">
          <div className="flex gap-4">
            <span className="font-semibold text-slate-600">Client:</span>
            <span className="text-slate-700">Chevron</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-slate-600">Contact:</span>
            <span className="text-slate-700">Tyler Sousa</span>
            <span className="text-slate-400 text-xs">€28</span>
            <div className="flex items-center gap-1 text-slate-500">
              <Shield className="h-3.5 w-3.5" />
              <span className="text-xs">Email: tylersousa@chevron.com</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <span className="text-xs">Telephone: +1 (361) 555-7890</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-600">Urgency:</span>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500 inline-block" />
              <span className="text-red-500 font-semibold">High</span>
            </div>
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-[8px] bg-blue-100 text-blue-700">
                JM
              </AvatarFallback>
            </Avatar>
            <span className="text-slate-700">João Mendes</span>
            <span className="text-slate-400 text-xs">673</span>
            <div className="ml-auto">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs gap-1.5">
                <Timer className="h-3.5 w-3.5" />
                Timer
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-600">
              Total Completion:
            </span>
            <span className="font-bold text-slate-800">55%</span>
            <div className="flex items-center gap-1 text-slate-500">
              <Shield className="h-3.5 w-3.5" />
            </div>
            <span className="text-slate-500 text-xs">
              Total Hour: 62 /100 h est.
            </span>
            <div className="flex-1">
              <Progress value={62} className="h-2 [&>div]:bg-amber-400" />
            </div>
            <span className="text-xs text-slate-500 whitespace-nowrap">
              62 / 100 h est.
            </span>
          </div>
        </div>

        {/* Sub tabs */}
        <div className="flex border-b border-slate-100">
          {["Subtasks", "Files", "Timesheets", "History"].map((tab, i) => (
            <button
              key={tab}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                i === 0
                  ? "border-blue-600 text-blue-600 bg-white"
                  : "border-transparent text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Subtasks */}
        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 text-sm">
                Suttasks
              </span>
              <div className="flex items-center gap-1 bg-slate-100 rounded px-1.5 py-0.5">
                <FileText className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-500">4</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4 text-slate-400" />
            </Button>
          </div>

          <div className="space-y-2">
            {[
              {
                name: "Rig-up & Safety Checks",
                progress: 72,
                color: "bg-amber-400",
                done: true,
                locked: true,
              },
              {
                name: "Brushing Downhole",
                progress: 70,
                color: "bg-blue-500",
                done: true,
                locked: true,
              },
              {
                name: "Circulate & Displace Debris",
                progress: 0,
                color: "bg-slate-200",
                done: false,
                locked: false,
              },
            ].map((subtask) => (
              <div
                key={subtask.name}
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <div
                  className={`h-5 w-5 rounded flex items-center justify-center ${subtask.done ? "bg-blue-600" : "border-2 border-slate-300"}`}
                >
                  {subtask.done && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="flex-1 text-sm text-slate-700">
                  {subtask.name}
                </span>
                <div className="flex items-center gap-2 w-40">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${subtask.color}`}
                      style={{ width: `${subtask.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 w-8 text-right">
                    {subtask.progress}%
                  </span>
                </div>
                {subtask.locked && (
                  <div className="flex items-center gap-1">
                    <div className="h-3.5 w-3.5 rounded border border-slate-300 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 bg-slate-400 rounded-full" />
                    </div>
                    <div className="h-3.5 w-3.5 rounded border border-slate-300" />
                  </div>
                )}
                <div className="w-10 h-5 bg-blue-600 rounded-full relative flex-shrink-0">
                  <div className="absolute right-0.5 top-0.5 h-4 w-4 bg-white rounded-full shadow" />
                </div>
                {!subtask.locked && (
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3.5 w-3.5 text-slate-400" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="mt-3 text-blue-600 hover:text-blue-700 text-sm gap-1.5 p-0 h-auto"
          >
            <Plus className="h-4 w-4" />
            Add Subtask
          </Button>

          {/* Description */}
          <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800">
              Conduct brushing of
            </span>{" "}
            the wellbore to remove scale, sand, and debris.{" "}
            <span className="font-semibold text-slate-800">
              Use downhole brushes to scrub
            </span>{" "}
            the casing and dislodge built-up deposits. Ensure proper circulation
            to remove dislodged material to the surface.
          </div>

          {/* Files */}
          <div className="mt-3 space-y-2">
            {[
              {
                name: "Daily_Log_2024-05-24.pdf",
                size: "2.1 MB",
                icon: "pdf",
                time: "08:00 — 11:00",
                count: 4,
              },
              {
                name: "Tool_Specifications_05-24.xlsx",
                size: "0.8 MB",
                icon: "xlsx",
                time: "08:00 — 11:00",
                count: 3,
              },
            ].map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50"
              >
                <div
                  className={`h-8 w-8 rounded flex items-center justify-center text-[10px] font-bold text-white ${file.icon === "pdf" ? "bg-red-500" : "bg-emerald-500"}`}
                >
                  {file.icon.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-700 truncate">
                    {file.name}
                  </p>
                  <p className="text-[10px] text-slate-400">{file.size}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span>{file.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">{file.count}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-3.5 w-3.5 text-blue-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Activities */}
      <div className="w-72 border-l border-slate-100 flex flex-col">
        <div className="px-4 py-3 border-b border-slate-100">
          <h3 className="font-semibold text-slate-700 text-sm">Activities</h3>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {[
            {
              initials: "TS",
              name: "Tyler Sousa",
              time: "20 minutes ago",
              text: "@JoaoMendes Working on brushing downhole now. Progress at 70%. Bit of resistance, but manageable.",
              color: "bg-slate-500",
            },
            {
              initials: "JM",
              name: "João Mendes",
              time: "1 minute ago",
              text: "@TylerSousa Got it. Keep working through it, but let me know if it gets stuck.",
              color: "bg-blue-600",
            },
            {
              initials: "JM",
              name: "João Mendes",
              time: "2 hours ago",
              text: "@team. Team, we need to prepare the wellbore for the brushing operation set for tomorrow. Let's make sure all tools are ready and that safety protocols are reviewed.",
              color: "bg-blue-600",
            },
            {
              initials: "MN",
              name: "Marcos Neves",
              time: "3 days ago",
              text: "João Mendes assigned task to Tyler Sousa\nJoão Mendes 3 days ago\nTyler Sousa set for Subtak Rig-up & Safety Checks",
              color: "bg-slate-400",
              system: true,
            },
          ].map((act, i) => (
            <div key={i}>
              <div className="flex items-start gap-2">
                <Avatar className="h-7 w-7 mt-0.5">
                  <AvatarFallback
                    className={`text-[9px] text-white ${act.color}`}
                  >
                    {act.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      {act.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-slate-400">
                        {act.time}
                      </span>
                      {!act.system && (
                        <ChevronRight className="h-3 w-3 text-slate-300" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed whitespace-pre-line">
                    {act.text}
                  </p>
                  {!act.system && (
                    <div className="flex gap-1 mt-1">
                      <button className="text-slate-300 hover:text-amber-400 text-sm">
                        👍
                      </button>
                      <button className="text-slate-300 hover:text-slate-500 text-sm">
                        👎
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {i < 3 && <Separator className="mt-3" />}
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-slate-100">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
            <input
              className="flex-1 text-xs outline-none text-slate-600 placeholder:text-slate-400"
              placeholder="Add a note... @ for mentioning"
            />
            <Send className="h-4 w-4 text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
