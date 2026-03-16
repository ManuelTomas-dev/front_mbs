"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { ChartAreaInteractive } from "../charts/chart"

const chartData = [
  { day: "S", value: 45, label: "Sunday" },
  { day: "M", value: 75, label: "Monday" },
  { day: "T", value: 74, label: "Tuesday" },
  { day: "W", value: 92, label: "Wednesday" },
  { day: "T", value: 35, label: "Thursday" },
  { day: "F", value: 60, label: "Friday" },
  { day: "S", value: 50, label: "Saturday" },
]

const barColors = ["#059669", "#047857", "#10b981", "#065f46", "#059669", "#047857", "#10b981"]

export function ProjectAnalytics() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const maxValue = Math.max(...chartData.map((d) => d.value))
  const average = Math.round(chartData.reduce((acc, d) => acc + d.value, 0) / chartData.length)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-foreground text-background px-3 py-2 rounded-lg text-xs font-semibold shadow-lg">
          <p className="font-bold">{payload[0].value}%</p>
          <p className="text-[10px] opacity-80">{payload[0].payload.label}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card
      className="p-6 transition-all duration-500 hover:shadow-xl animate-slide-in-up bg-linear-to-br from-background to-muted/20"
      style={{ animationDelay: "400ms" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Project Analytics</h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
          <span>Weekly Activity</span>
        </div>
      </div>

      <div className="h-64 mb-4 relative">
        <ResponsiveContainer width="100%" height="100%">
         <ChartAreaInteractive/>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="pt-4 border-t border-muted/50 flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground">Average: </span>
          <span className="font-semibold text-foreground">{average}%</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Peak: </span>
          <span className="font-semibold text-blue-600">{maxValue}%</span>
        </div>
      </div>
    </Card>
  )
}
