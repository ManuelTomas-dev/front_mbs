"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", tv: 222, desktop: 222, mobile: 150 },
  { date: "2024-04-02", tv: 97, desktop: 97, mobile: 180 },
  { date: "2024-04-03", tv: 167, desktop: 167, mobile: 120 },
  { date: "2024-04-04", tv: 242, desktop: 242, mobile: 260 },
  { date: "2024-04-05", tv: 373, desktop: 373, mobile: 290 },
  { date: "2024-04-06", tv: 301, desktop: 301, mobile: 340 },
  { date: "2024-04-07", tv: 245, desktop: 245, mobile: 180 },
  { date: "2024-04-08", tv: 409, desktop: 409, mobile: 320 },
  { date: "2024-04-09", tv: 59, desktop: 59, mobile: 110 },
  { date: "2024-04-10", tv: 261, desktop: 261, mobile: 190 },

  { date: "2024-04-11", tv: 327, desktop: 327, mobile: 350 },
  { date: "2024-04-12", tv: 292, desktop: 292, mobile: 210 },
  { date: "2024-04-13", tv: 342, desktop: 342, mobile: 380 },
  { date: "2024-04-14", tv: 137, desktop: 137, mobile: 220 },
  { date: "2024-04-15", tv: 120, desktop: 120, mobile: 170 },
  { date: "2024-04-16", tv: 138, desktop: 138, mobile: 190 },
  { date: "2024-04-17", tv: 446, desktop: 446, mobile: 360 },
  { date: "2024-04-18", tv: 364, desktop: 364, mobile: 410 },
  { date: "2024-04-19", tv: 243, desktop: 243, mobile: 180 },
  { date: "2024-04-20", tv: 89, desktop: 89, mobile: 150 },
  { date: "2024-04-21", tv: 137, desktop: 137, mobile: 200 },
  { date: "2024-04-22", tv: 224, desktop: 224, mobile: 170 },
  { date: "2024-04-23", tv: 138, desktop: 138, mobile: 230 },
  { date: "2024-04-24", tv: 387, desktop: 387, mobile: 290 },
  { date: "2024-04-25", tv: 215, desktop: 215, mobile: 250 },

  { date: "2024-04-26", tv: 75, desktop: 75, mobile: 130 },
  { date: "2024-04-27", tv: 383, desktop: 383, mobile: 420 },
  { date: "2024-04-28", tv: 122, desktop: 122, mobile: 180 },
  { date: "2024-04-29", tv: 315, desktop: 315, mobile: 240 },
  { date: "2024-04-30", tv: 454, desktop: 454, mobile: 380 },
  { date: "2024-05-01", tv: 165, desktop: 165, mobile: 220 },
  { date: "2024-05-02", tv: 293, desktop: 293, mobile: 310 },
  { date: "2024-05-03", tv: 247, desktop: 247, mobile: 190 },
  { date: "2024-05-04", tv: 385, desktop: 385, mobile: 420 },
  { date: "2024-05-05", tv: 481, desktop: 481, mobile: 390 },
  { date: "2024-05-06", tv: 498, desktop: 498, mobile: 520 },
  { date: "2024-05-07", tv: 388, desktop: 388, mobile: 300 },
  { date: "2024-05-08", tv: 149, desktop: 149, mobile: 210 },
  { date: "2024-05-09", tv: 227, desktop: 227, mobile: 180 },
  { date: "2024-05-10", tv: 293, desktop: 293, mobile: 330 },

  { date: "2024-05-11", tv: 335, desktop: 335, mobile: 270 },
  { date: "2024-05-12", tv: 197, desktop: 197, mobile: 240 },
  { date: "2024-05-13", tv: 197, desktop: 197, mobile: 160 },
  { date: "2024-05-14", tv: 448, desktop: 448, mobile: 490 },
  { date: "2024-05-15", tv: 473, desktop: 473, mobile: 380 },
  { date: "2024-05-16", tv: 338, desktop: 338, mobile: 400 },
  { date: "2024-05-17", tv: 499, desktop: 499, mobile: 420 },
  { date: "2024-05-18", tv: 315, desktop: 315, mobile: 350 },

  { date: "2024-05-19", tv: 235, desktop: 235, mobile: 180 },
  { date: "2024-05-20", tv: 177, desktop: 177, mobile: 230 },
  { date: "2024-05-21", tv: 82, desktop: 82, mobile: 140 },
  { date: "2024-05-22", tv: 81, desktop: 81, mobile: 120 },
  { date: "2024-05-23", tv: 252, desktop: 252, mobile: 290 },
  { date: "2024-05-24", tv: 294, desktop: 294, mobile: 220 },
  { date: "2024-05-25", tv: 201, desktop: 201, mobile: 250 },
  { date: "2024-05-26", tv: 213, desktop: 213, mobile: 170 },
  { date: "2024-05-27", tv: 420, desktop: 420, mobile: 460 },
  { date: "2024-05-28", tv: 233, desktop: 233, mobile: 190 },
  { date: "2024-05-29", tv: 78, desktop: 78, mobile: 130 },
  { date: "2024-05-30", tv: 340, desktop: 340, mobile: 280 },
  { date: "2024-05-31", tv: 178, desktop: 178, mobile: 230 },
  { date: "2024-06-01", tv: 178, desktop: 178, mobile: 200 },

  { date: "2024-06-02", tv: 470, desktop: 470, mobile: 410 },
  { date: "2024-06-03", tv: 103, desktop: 103, mobile: 160 },
  { date: "2024-06-04", tv: 439, desktop: 439, mobile: 380 },
  { date: "2024-06-05", tv: 88, desktop: 88, mobile: 140 },
  { date: "2024-06-06", tv: 294, desktop: 294, mobile: 250 },
  { date: "2024-06-07", tv: 323, desktop: 323, mobile: 370 },
  { date: "2024-06-08", tv: 385, desktop: 385, mobile: 320 },
  { date: "2024-06-09", tv: 438, desktop: 438, mobile: 480 },
  { date: "2024-06-10", tv: 155, desktop: 155, mobile: 200 },
  { date: "2024-06-11", tv: 92, desktop: 92, mobile: 150 },
  { date: "2024-06-12", tv: 492, desktop: 492, mobile: 420 },
  { date: "2024-06-13", tv: 81, desktop: 81, mobile: 130 },
  { date: "2024-06-14", tv: 426, desktop: 426, mobile: 380 },
  
  { date: "2024-06-15", tv: 307, desktop: 307, mobile: 350 },
  { date: "2024-06-16", tv: 371, desktop: 371, mobile: 310 },
  { date: "2024-06-17", tv: 475, desktop: 475, mobile: 520 },
  { date: "2024-06-18", tv: 107, desktop: 107, mobile: 170 },
  { date: "2024-06-19", tv: 341, desktop: 341, mobile: 290 },
  { date: "2024-06-20", tv: 408, desktop: 408, mobile: 450 },
  { date: "2024-06-21", tv: 169, desktop: 169, mobile: 210 },
  { date: "2024-06-22", tv: 317, desktop: 317, mobile: 270 },
  { date: "2024-06-23", tv: 480, desktop: 480, mobile: 530 },
  { date: "2024-06-24", tv: 132, desktop: 132, mobile: 180 },
  { date: "2024-06-25", tv: 141, desktop: 141, mobile: 190 },
  { date: "2024-06-26", tv: 434, desktop: 434, mobile: 380 },
  { date: "2024-06-27", tv: 448, desktop: 448, mobile: 490 },
  { date: "2024-06-28", tv: 149, desktop: 149, mobile: 200 },
  { date: "2024-06-29", tv: 103, desktop: 103, mobile: 160 },
  { date: "2024-06-30", tv: 446, desktop: 446, mobile: 400 },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Receipt",
    color: "var(--primary)",
  },
  mobile: {
    label: "Invoice",
    color: "var(--primary)",
  },
  tv: {
    label: "Customer P O",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Customer P O | Invoice | Receipt</CardTitle>

        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <Area
              dataKey="tv"
              type="natural"
              fill="var(--color-tv)"
              stroke="var(--color-tv)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
