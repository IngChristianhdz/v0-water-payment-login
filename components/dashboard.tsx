"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AccountCard } from "@/components/account-card"
import { ConsumptionChart } from "@/components/consumption-chart"
import {
  LogOut,
  Droplet,
  TrendingUp,
  Calendar,
  AlertCircle,
  Droplet as DropletOff,
  FileText,
  History,
  HelpCircle,
  User,
  Receipt,
  Power,
  Flag,
  Phone,
  Mail,
  Clock,
} from "lucide-react"
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

        {/* Botones de Reportar Fuga y Contratos */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <Card className="cursor-pointer hover:bg-accent/10 transition-colors">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-[#FF8C00] rounded-full flex items-center justify-center mb-4">
                <DropletOff className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Reportar Fuga</h3>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-accent/10 transition-colors">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-[#FF8C00] rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Contratos</h3>
            </CardContent>
          </Card>
        </div>

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

        {/* Consumo Actual */}
        <Card className="mb-8 border-[#FF8C00]">
          <CardHeader className="border-b border-[#FF8C00]/20">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FF8C00]" />
              <CardTitle className="text-[#FF8C00] uppercase">Consumo Actual</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Droplet className="w-5 h-5" />
                  <span>Consumo</span>
                </div>
                <span className="font-medium">32 m³</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <span>Periodo</span>
                </div>
                <span className="font-medium text-[#FF8C00]">Diciembre 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estado del Servicio */}
        <Card className="mb-8 border-[#FF8C00]">
          <CardHeader className="border-b border-[#FF8C00]/20">
            <div className="flex items-center gap-2">
              <Power className="w-5 h-5 text-[#FF8C00]" />
              <CardTitle className="text-[#FF8C00] uppercase">Estado del Servicio</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Power className="w-5 h-5" />
                  <span>Estado</span>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30 border-emerald-500/30">
                  ACTIVO
                </Badge>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Flag className="w-5 h-5" />
                  <span>Reportes</span>
                </div>
                <span className="font-medium text-destructive">Sin reportes</span>
              </div>
            </div>
          </CardContent>
        </Card>

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
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Mis Cuentas</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        </div>

        {/* Más Opciones */}
        <Card className="mb-8 border-[#FF8C00]">
          <CardHeader className="border-b border-[#FF8C00]/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#FF8C00] rounded flex items-center justify-center">
                <span className="text-white text-sm">⚙</span>
              </div>
              <CardTitle className="text-[#FF8C00] uppercase">Más Opciones</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="justify-between h-14 hover:bg-accent/10 bg-transparent">
                <div className="flex items-center gap-3">
                  <History className="w-5 h-5" />
                  <span className="font-medium">Historial</span>
                </div>
                <span className="text-muted-foreground">→</span>
              </Button>

              <Button variant="outline" className="justify-between h-14 hover:bg-accent/10 bg-transparent">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5" />
                  <span className="font-medium">Ayuda</span>
                </div>
                <span className="text-muted-foreground">→</span>
              </Button>

              <Button variant="outline" className="justify-between h-14 hover:bg-accent/10 bg-transparent">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Mi Perfil</span>
                </div>
                <span className="text-muted-foreground">→</span>
              </Button>

              <Button
                variant="outline"
                className="justify-between h-14 hover:bg-[#FFF3E0] border-[#FF8C00] hover:border-[#FF8C00] bg-transparent"
              >
                <div className="flex items-center gap-3">
                  <Receipt className="w-5 h-5 text-[#FF8C00]" />
                  <span className="font-medium text-[#FF8C00]">Facturas</span>
                </div>
                <span className="text-[#FF8C00]">→</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Información de Contacto */}
        <Card className="border-[#FF8C00]">
          <CardHeader className="border-b border-[#FF8C00]/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#FF8C00] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">i</span>
              </div>
              <CardTitle className="text-[#FF8C00] uppercase">Información de Contacto</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-6">
              Para cualquier consulta sobre tu servicio, facturación o reportes, contacta a nuestro centro de atención
              al cliente.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5" />
                  <span>Teléfono</span>
                </div>
                <span className="font-medium text-[#FF8C00]">411-155-00-50</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                  <span>Correo</span>
                </div>
                <span className="font-medium text-[#FF8C00] text-sm">atencion@jumapac.gob.mx</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>Horario</span>
                </div>
                <span className="font-medium text-[#FF8C00]">Lun-Vie: 8am-4pm</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
