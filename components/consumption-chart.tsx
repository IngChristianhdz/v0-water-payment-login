"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ConsumptionData {
  month: string
  consumption: number
  cost: number
}

interface ConsumptionChartProps {
  data: ConsumptionData[]
}

export function ConsumptionChart({ data }: ConsumptionChartProps) {
  const chartConfig = {
    consumption: {
      label: "Consumo (m³)",
      color: "hsl(var(--chart-1))",
    },
    cost: {
      label: "Costo (MXN)",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis
            yAxisId="left"
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            label={{
              value: "Consumo (m³)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "hsl(var(--muted-foreground))" },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            label={{
              value: "Costo (MXN)",
              angle: 90,
              position: "insideRight",
              style: { textAnchor: "middle", fill: "hsl(var(--muted-foreground))" },
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Bar
            yAxisId="left"
            dataKey="consumption"
            fill="hsl(var(--chart-1))"
            radius={[8, 8, 0, 0]}
            name="Consumo (m³)"
          />
          <Bar yAxisId="right" dataKey="cost" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} name="Costo (MXN)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
