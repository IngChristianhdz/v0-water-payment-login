"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AccountCard } from "@/components/account-card"
import { ConsumptionChart } from "@/components/consumption-chart"
import { LogOut, Droplet, TrendingUp, Calendar, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DashboardProps {
  onLogout: () => void
}

// Datos de ejemplo de cuentas
const accounts = [
  {
    id: "001",
    address: "Av. Principal 1234, Col. Centro",
    accountNumber: "AGU-2024-001",
    currentBalance: 0,
    dueDate: "15 Ene 2024",
    status: "paid" as const,
    lastPayment: 850,
    consumption: 25,
  },
  {
    id: "002",
    address: "Calle Juárez 567, Col. Reforma",
    accountNumber: "AGU-2024-002",
    currentBalance: 1250,
    dueDate: "10 Ene 2024",
    status: "overdue" as const,
    lastPayment: 950,
    consumption: 32,
  },
  {
    id: "003",
    address: "Calle Hidalgo 890, Col. Morelos",
    accountNumber: "AGU-2024-003",
    currentBalance: 890,
    dueDate: "20 Ene 2024",
    status: "pending" as const,
    lastPayment: 820,
    consumption: 28,
  },
]

// Datos de ejemplo para la gráfica
const consumptionData = [
  { month: "Jul", consumption: 22, cost: 750 },
  { month: "Ago", consumption: 25, cost: 850 },
  { month: "Sep", consumption: 28, cost: 920 },
  { month: "Oct", consumption: 30, cost: 980 },
  { month: "Nov", consumption: 27, cost: 890 },
  { month: "Dic", consumption: 32, cost: 1050 },
]

export function Dashboard({ onLogout }: DashboardProps) {
  const totalDebt = accounts.reduce((sum, acc) => sum + acc.currentBalance, 0)
  const averageConsumption = accounts.reduce((sum, acc) => sum + acc.consumption, 0) / accounts.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Droplet className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Sistema de Agua</h1>
              <p className="text-sm text-muted-foreground">Panel de control</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Alertas */}
        {totalDebt > 0 && (
          <Alert className="mb-6 border-destructive/50 bg-destructive/10">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <AlertDescription className="text-destructive font-medium">
              Tienes un saldo pendiente de ${totalDebt.toFixed(2)} MXN. Por favor, realiza tu pago para evitar cortes de
              servicio.
            </AlertDescription>
          </Alert>
        )}

        {/* Estadísticas Generales */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cuentas Activas</CardTitle>
              <Droplet className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{accounts.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {accounts.filter((a) => a.status === "paid").length} al corriente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Consumo Promedio</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageConsumption.toFixed(1)} m³</div>
              <p className="text-xs text-muted-foreground mt-1">Por cuenta mensual</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Total</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${totalDebt > 0 ? "text-destructive" : "text-accent"}`}>
                ${totalDebt.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalDebt > 0 ? "Pendiente de pago" : "Sin adeudos"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfica de Consumo */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Consumo Mensual</CardTitle>
                <CardDescription className="mt-1">Historial de los últimos 6 meses</CardDescription>
              </div>
              <Badge variant="secondary" className="hidden sm:flex">
                <TrendingUp className="w-3 h-3 mr-1" />
                Últimos 6 meses
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ConsumptionChart data={consumptionData} />
          </CardContent>
        </Card>

        {/* Lista de Cuentas */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Mis Cuentas</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
