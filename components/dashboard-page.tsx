"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Droplets,
  CreditCard,
  FileText,
  Bell,
  LogOut,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

export function DashboardPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<"dashboard" | "payment" | "history">("dashboard")

  // Datos simulados
  const currentBill = {
    amount: 485.5,
    dueDate: "2025-01-15",
    period: "Diciembre 2024",
    consumption: "18 m³",
    status: "pending",
  }

  const paymentHistory = [
    { id: 1, date: "2024-11-10", amount: 450.0, period: "Noviembre 2024", status: "paid" },
    { id: 2, date: "2024-10-12", amount: 432.0, period: "Octubre 2024", status: "paid" },
    { id: 3, date: "2024-09-08", amount: 468.5, period: "Septiembre 2024", status: "paid" },
  ]

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-(--color-border) sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-(--color-primary) rounded-lg flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-(--color-text)">OAPAS</h1>
                <p className="text-xs text-(--color-text-light)">Portal de Pagos</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-(--color-text)">{user?.name}</p>
                <p className="text-xs text-(--color-text-light)">Cuenta: {user?.accountNumber}</p>
              </div>
              <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2 bg-transparent">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navegación de pestañas */}
      <div className="bg-white border-b border-(--color-border)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "dashboard"
                  ? "border-(--color-primary) text-(--color-primary)"
                  : "border-transparent text-(--color-text-light) hover:text-(--color-text)"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("payment")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "payment"
                  ? "border-(--color-primary) text-(--color-primary)"
                  : "border-transparent text-(--color-text-light) hover:text-(--color-text)"
              }`}
            >
              Pagar Recibo
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "history"
                  ? "border-(--color-primary) text-(--color-primary)"
                  : "border-transparent text-(--color-text-light) hover:text-(--color-text)"
              }`}
            >
              Historial
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Alerta de pago pendiente */}
            <div className="bg-orange-50 border-l-4 border-(--color-primary) p-4 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-(--color-primary) flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-(--color-text)">Pago pendiente</h3>
                <p className="text-sm text-(--color-text-light) mt-1">
                  Tienes un recibo pendiente por{" "}
                  <span className="font-bold text-(--color-primary)">${currentBill.amount.toFixed(2)} MXN</span> con
                  vencimiento el {currentBill.dueDate}
                </p>
              </div>
            </div>

            {/* Tarjetas de información */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-(--color-border)">
                <CardHeader className="pb-3">
                  <CardDescription>Saldo Actual</CardDescription>
                  <CardTitle className="text-3xl font-bold text-(--color-primary)">
                    ${currentBill.amount.toFixed(2)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-(--color-text-light)">
                    <Calendar className="w-4 h-4" />
                    <span>Vence: {currentBill.dueDate}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-(--color-border)">
                <CardHeader className="pb-3">
                  <CardDescription>Consumo Actual</CardDescription>
                  <CardTitle className="text-3xl font-bold text-(--color-accent)">{currentBill.consumption}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-(--color-text-light)">
                    <Droplets className="w-4 h-4" />
                    <span>Periodo: {currentBill.period}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-(--color-border)">
                <CardHeader className="pb-3">
                  <CardDescription>Estado del Servicio</CardDescription>
                  <CardTitle className="text-xl font-bold text-(--color-success) flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Activo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-(--color-text-light)">
                    <Bell className="w-4 h-4" />
                    <span>Sin reportes</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Acciones rápidas */}
            <Card className="border-(--color-border)">
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Gestiona tu servicio de agua potable</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    className="h-auto flex-col gap-3 py-6 bg-(--color-primary) hover:bg-(--color-primary-dark) text-white"
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="w-8 h-8" />
                    <span>Pagar Recibo</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-3 py-6 border-(--color-border) bg-transparent"
                  >
                    <FileText className="w-8 h-8" />
                    <span>Descargar Recibo</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-3 py-6 border-(--color-border) bg-transparent"
                  >
                    <Bell className="w-8 h-8" />
                    <span>Reportar Fuga</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-3 py-6 border-(--color-border) bg-transparent"
                  >
                    <DollarSign className="w-8 h-8" />
                    <span>Contratos</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="border-(--color-border)">
              <CardHeader>
                <CardTitle>Pagar Recibo en Línea</CardTitle>
                <CardDescription>Completa el pago de tu servicio de agua potable</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-(--color-surface) p-6 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-(--color-text-light)">Periodo:</span>
                    <span className="font-semibold text-(--color-text)">{currentBill.period}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-(--color-text-light)">Consumo:</span>
                    <span className="font-semibold text-(--color-text)">{currentBill.consumption}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-(--color-text-light)">Vencimiento:</span>
                    <span className="font-semibold text-(--color-text)">{currentBill.dueDate}</span>
                  </div>
                  <div className="border-t border-(--color-border) pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-(--color-text)">Total a pagar:</span>
                      <span className="text-2xl font-bold text-(--color-primary)">
                        ${currentBill.amount.toFixed(2)} MXN
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-(--color-text)">Método de Pago</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <button className="p-4 border-2 border-(--color-primary) bg-orange-50 rounded-lg flex items-center gap-3 hover:bg-orange-100 transition-colors">
                      <CreditCard className="w-6 h-6 text-(--color-primary)" />
                      <div className="text-left flex-1">
                        <p className="font-semibold text-(--color-text)">Tarjeta de Crédito/Débito</p>
                        <p className="text-sm text-(--color-text-light)">Pago inmediato</p>
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-(--color-primary) flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-(--color-primary)"></div>
                      </div>
                    </button>
                    <button className="p-4 border-2 border-(--color-border) rounded-lg flex items-center gap-3 hover:border-(--color-primary) transition-colors">
                      <FileText className="w-6 h-6 text-(--color-text-light)" />
                      <div className="text-left flex-1">
                        <p className="font-semibold text-(--color-text)">SPEI/Transferencia</p>
                        <p className="text-sm text-(--color-text-light)">Confirmación en 24-48 hrs</p>
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-(--color-border)"></div>
                    </button>
                  </div>
                </div>

                <Button className="w-full bg-(--color-primary) hover:bg-(--color-primary-dark) text-white py-6 text-lg">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceder al Pago
                </Button>

                <p className="text-xs text-center text-(--color-text-light)">
                  🔒 Pago seguro protegido con encriptación SSL de 256 bits
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6">
            <Card className="border-(--color-border)">
              <CardHeader>
                <CardTitle>Historial de Pagos</CardTitle>
                <CardDescription>Consulta todos tus pagos realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 border border-(--color-border) rounded-lg hover:bg-(--color-surface) transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-(--color-success)" />
                        </div>
                        <div>
                          <p className="font-semibold text-(--color-text)">{payment.period}</p>
                          <p className="text-sm text-(--color-text-light)">{payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-(--color-text)">${payment.amount.toFixed(2)}</p>
                        <span className="inline-block px-2 py-1 bg-green-100 text-(--color-success) text-xs rounded-full font-medium">
                          Pagado
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
