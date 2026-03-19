"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Search,
  Bell,
  MoreHorizontal,
  Info,
  FileText,
  Plus,
  Clock,
  Users,
  FileIcon,
  Calendar,
  ChevronDown,
  ChevronUp,
  Send,
  ThumbsUp,
  ThumbsDown,
  Undo,
  Redo,
} from "lucide-react";

export function TaskDetail() {
  const subtasks = [
    {
      name: "Rig-up & Safety Checks",
      progress: 72,
      color: "bg-amber-400",
      completed: true,
      hasToggle: true,
      toggleOn: true,
    },
    {
      name: "Brushing Downhole",
      progress: 70,
      color: "bg-blue-500",
      completed: true,
      hasToggle: true,
      toggleOn: true,
    },
    {
      name: "Circulate & Displace Debris",
      progress: 30,
      color: "bg-slate-300",
      completed: false,
      hasToggle: false,
    },
  ];

  const activities = [
    {
      user: "Tyler Sousa",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "20 minutes ago",
      message:
        "@JoaoMendes Working on brushing downhole now. Progress at 70%. Bit of resistance, but manageable.",
      mention: "JoaoMendes",
      hasReactions: true,
    },
    {
      user: "Joao Mendes",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "1 minute ago",
      message:
        "@TylerSousa Got it. Keep working through it, but let me know if it gets stuck.",
      mention: "TylerSousa",
    },
    {
      user: "Joao Mendes",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "2 hours ago",
      message:
        "@team. Team, we need to prepare the wellbore for the brushing operation set for tomorrow. Let's make sure all tools are ready and that safety protocols are reviewed.",
      mention: "team",
      expandable: true,
    },
    {
      user: "Marcos Neves",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "3 days ago",
      isActivity: true,
      activityText: "Joao Mendes assigned task to Tyler Sousa",
      expandable: true,
    },
    {
      user: "Joao Mendes",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "3 days ago",
      isActivity: true,
      activityText: "Tyler Sousa set for Subtask Rig-up & Safety Checks",
    },
  ];

  const files = [
    {
      name: "Daily_Log_2024-05-24.pdf",
      size: "2.1M",
      sizeBytes: "2.1 MB",
      timeStart: "08:00",
      timeEnd: "11:00.090",
      count: 4,
    },
    {
      name: "Tool_Specifications_05-24.xlsx",
      size: "0.0M",
      sizeBytes: "0.8 MB",
      timeStart: "08:00",
      timeEnd: "11:00.030",
      count: 3,
    },
  ];

  return (
    <div className="container mx-auto max-w-360 bg-white">
      {/* Breadcrumb */}
      <div className="px-6 py-3 text-sm text-slate-600 flex items-center gap-2">
        <span className="text-slate-500">{"<"}</span>
        <span>Project: Wellborecleanout</span>
        <span className="text-slate-400">{">"}</span>
        <span>Task: Wellborecleanout \ Brushing Operation</span>
      </div>

      <div className="px-6 pb-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Title Section */}
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" className="text-slate-600">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold text-slate-800">
                Wellborecleanout \ Brushing Operation
              </h1>
              <Badge className="bg-amber-100 text-amber-700 border-amber-300">
                Delayed
              </Badge>
            </div>

            {/* Client Info */}
            <Card className="mb-6 bg-white/80">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-y-3">
                  <div>
                    <span className="text-slate-500 text-sm">Client:</span>
                    <span className="ml-2 font-medium">Chevron</span>
                  </div>
                  <div></div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-sm">Contact:</span>
                    <span className="font-medium">Tyler Sousa</span>
                    <span className="text-slate-400 text-sm">678</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span className="text-sm">
                      Email: tylersousa@chevron.com
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="text-sm">
                      Telephone: +1 (361) 555-7890
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-sm">Urgency:</span>
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="font-medium">High</span>
                    <Avatar className="h-6 w-6 ml-4">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Joao Mendes</span>
                    <span className="text-slate-400 text-sm">673</span>
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Clock className="h-4 w-4 mr-2" />
                      Timer
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-sm text-slate-600">
                    Total Completion: 55%
                  </span>
                  <span className="text-blue-500">●</span>
                  <span className="text-sm text-slate-500">
                    Total Hour: 62 /100 h est.
                  </span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: "62%" }}
                    ></div>
                  </div>
                  <span className="text-sm text-slate-600">
                    62 / 100 h est.
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4">
                <Info className="h-4 w-4 mr-2" />
                Subtasks
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-4 border-slate-300"
              >
                <FileText className="h-4 w-4 mr-2" />
                Files
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-4 border-slate-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Timesheets
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-4 border-slate-300"
              >
                <Clock className="h-4 w-4 mr-2" />
                History
              </Button>
            </div>

            {/* Subtasks Card */}
            <Card className="bg-white/80">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Checkbox checked className="rounded-full" />
                  <span className="font-semibold">Suttasks</span>
                  <Badge variant="outline" className="text-xs">
                    EM4
                  </Badge>
                  <MoreHorizontal className="h-4 w-4 text-slate-400 ml-auto" />
                </div>

                {/* Subtask Items */}
                <div className="space-y-3">
                  {subtasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-3 py-2">
                      <Checkbox
                        checked={task.completed}
                        className={
                          task.completed ? "bg-green-500 border-green-500" : ""
                        }
                      />
                      <span
                        className={`flex-1 ${task.completed ? "text-slate-700" : "text-slate-500"}`}
                      >
                        {task.name}
                      </span>
                      <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${task.color} rounded-full`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-500 w-12">
                        {task.progress}%
                      </span>
                      <Users className="h-4 w-4 text-slate-400" />
                      <FileText className="h-4 w-4 text-slate-400" />
                      {task.hasToggle ? (
                        <Switch
                          checked={task.toggleOn}
                          className="data-[state=checked]:bg-blue-500"
                        />
                      ) : (
                        <>
                          <FileText className="h-4 w-4 text-slate-400" />
                          <MoreHorizontal className="h-4 w-4 text-slate-400" />
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <Button variant="ghost" className="text-blue-600 mt-2">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Subtask
                </Button>

                {/* Description */}
                <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600">
                    <strong>Conduct brushing of</strong> the wellbore to remove{" "}
                    <strong>scale, sand, and debris</strong>. Use downhole
                    brushes to scrub the casing and dislodge built-up deposits.
                    Ensure proper circulation to remove dislodged material to
                    the surface.
                  </p>
                </div>

                {/* Files */}
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 py-2 px-3 bg-slate-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                        <FileIcon className="h-4 w-4 text-red-600" />
                      </div>
                      <span className="text-sm font-medium flex-1">
                        {file.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {file.size}
                      </span>
                      <span className="text-xs text-slate-400">
                        {file.sizeBytes}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        <Calendar className="h-3 w-3" />
                        <span>{file.timeStart}</span>
                        <span className="text-slate-300">—</span>
                        <span>{file.timeEnd}</span>
                        <Badge className="bg-blue-500 text-white text-xs px-1.5">
                          {file.count}+
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Undo/Redo */}
            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-slate-600 text-white hover:bg-slate-700"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-slate-600 text-white hover:bg-slate-700"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Activities Sidebar */}
          <div className="w-96 mt-15">
            <Card className="bg-white/80">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">
                  Activities
                </CardTitle>
                <MoreHorizontal className="h-5 w-5 text-slate-400" />
              </CardHeader>
              <CardContent className="space-y-4">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="border-b border-slate-100 pb-4 last:border-0"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activity.avatar} />
                        <AvatarFallback>
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800">
                            {activity.user}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">
                              {activity.time}
                            </span>
                            {activity.expandable && (
                              <ChevronDown className="h-4 w-4 text-slate-400" />
                            )}
                          </div>
                        </div>
                        {activity.isActivity ? (
                          <p className="text-sm text-slate-600 mt-1">
                            {activity.activityText}
                          </p>
                        ) : (
                          <p className="text-sm text-slate-600 mt-1">
                            <span className="text-blue-600 font-medium">
                              @{activity.mention}
                            </span>{" "}
                            {activity?.message?.replace(
                              `@${activity.mention}`,
                              "",
                            )}
                          </p>
                        )}
                        {activity.hasReactions && (
                          <div className="flex items-center gap-2 mt-2">
                            <ThumbsUp className="h-4 w-4 text-amber-500" />
                            <ThumbsDown className="h-4 w-4 text-slate-300" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Note */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add a note... @ for mentioning"
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg"
                  />
                  <Button
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
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
