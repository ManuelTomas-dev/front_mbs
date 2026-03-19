"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Container from "@/components/generic/container";
import Title from "@/components/generic/title";

const projects = [
  {
    id: 1,
    name: "Tankcleaning",
    owner: "João Mendes",
    client: "Total",
    startDate: "May 1, 2024",
    deadline: "Jun 30, 2024",
    status: "Active",
    progress: 72,
    budget: "$450,000",
    budgetTotal: "$600,000",
    variance: null,
  },
  {
    id: 2,
    name: "Wellborecleanout",
    owner: "João Mendes",
    client: "Chevron",
    startDate: "May 10, 2024",
    deadline: "Aug 15, 2024",
    status: "Delayed",
    progress: 55,
    budget: "$400,000",
    budgetTotal: "$700,000",
    variance: "-$100,000",
  },
  {
    id: 3,
    name: "Filtration",
    owner: "João Mendes",
    client: "ESSO",
    startDate: "May 15, 2024",
    deadline: "Jun 30, 2024",
    status: "Completed",
    progress: 100,
    budget: "$300,000",
    budgetTotal: "$300,000",
    variance: null,
  },
  {
    id: 4,
    name: "Fishing",
    owner: "João Mendes",
    client: "ESSO",
    startDate: "May 28, 2024",
    deadline: "Aug 10, 2024",
    status: "Completed",
    progress: 100,
    budget: "$500,000",
    budgetTotal: "$340,000",
    variance: null,
  },
  {
    id: 5,
    name: "Desplacement",
    owner: "João Mendes",
    client: "Azule Energy",
    startDate: "Apr 20, 2024",
    deadline: "Jul 20, 2024",
    status: "Canceled",
    progress: 20,
    budget: "$730,000",
    budgetTotal: "$730,000",
    variance: "-$120,000",
  },
  {
    id: 6,
    name: "BOP Tornet",
    owner: "João Mendes",
    client: "Azule Energy",
    startDate: "Jun 15, 2024",
    deadline: "Aug 15, 2024",
    status: "Inactive",
    progress: 10,
    budget: "$100,000",
    budgetTotal: "$280,000",
    variance: null,
  },
  {
    id: 7,
    name: "Ultra High Pressure Wash",
    owner: "João Mendes",
    client: "Baker",
    startDate: "Jun 2, 2024",
    deadline: "Aug 25, 2024",
    status: "Inactive",
    progress: 5,
    budget: "$50,000",
    budgetTotal: "$250,000",
    variance: null,
  },
  {
    id: 8,
    name: "Cementing",
    owner: "João Mendes",
    client: "Sonangol",
    startDate: "Jun 5, 2024",
    deadline: "Jun 30, 2024",
    status: "Completed",
    progress: 100,
    budget: "$750,000",
    budgetTotal: "$750,000",
    variance: null,
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  Active: {
    label: "Active",
    className: "bg-emerald-500 text-white hover:bg-emerald-600",
  },
  Delayed: {
    label: "Delayed",
    className: "bg-amber-500 text-white hover:bg-amber-600",
  },
  Completed: {
    label: "Completed",
    className: "bg-blue-500 text-white hover:bg-blue-600",
  },
  Canceled: {
    label: "Canceled",
    className: "bg-red-500 text-white hover:bg-red-600",
  },
  Inactive: {
    label: "Inactive",
    className: "bg-slate-400 text-white hover:bg-slate-500",
  },
};

function ProgressBar({ value, status }: { value: number; status: string }) {
  const colorMap: Record<string, string> = {
    Active: "bg-blue-500",
    Delayed: "bg-amber-400",
    Completed: "bg-blue-500",
    Canceled: "bg-slate-300",
    Inactive: "bg-slate-300",
  };
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colorMap[status] || "bg-blue-500"}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-slate-500 w-8 text-right">{value}%</span>
    </div>
  );
}

export function List() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <Container style="container mx-auto max-w-360">
      <Title
        title="Projects"
        description="View projects information in the MBS system."
      />
      <div className="mt-6 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="w-10">
                  <Checkbox />
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Project <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Client <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Start Date <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Deadline <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Status <Filter className="ml-1 h-3 w-3 inline" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Progress <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Budget <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Actions <Filter className="ml-1 h-3 w-3 inline" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => {
                const statusCfg = statusConfig[project.status];
                return (
                  <TableRow
                    key={project.id}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(project.id)}
                        onCheckedChange={() => toggleSelect(project.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">
                          {project.name}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback className="text-[8px] bg-blue-100 text-blue-700">
                              {project.owner
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-slate-400">
                            {project.owner}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {project.client}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {project.startDate}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {project.deadline}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs font-medium ${statusCfg.className}`}
                      >
                        {statusCfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ProgressBar
                        value={project.progress}
                        status={project.status}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {project.budget}
                        </p>
                        <p className="text-xs text-slate-400">
                          {project.budgetTotal}
                        </p>
                        {project.variance && (
                          <p className="text-xs font-semibold text-red-500">
                            {project.variance}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {project.variance ? (
                        <span className="text-xs font-bold text-red-500">
                          {project.variance}
                        </span>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4 text-slate-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Project</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-sm text-slate-500">1–8 of 8 projects.</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Rows per page: 10</span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                disabled
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium px-2">1</span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                disabled
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
