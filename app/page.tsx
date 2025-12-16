"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplet, Plus, Mail } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { AccountsList } from "@/components/accounts-list"
import { AddAccountDialog } from "@/components/add-account-dialog"

export default function WaterPaymentPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    if (email) {
      setUserEmail(email)
    }
  }, [])

  const handleLogin = (email: string) => {
    setUserEmail(email)
    localStorage.setItem("userEmail", email)
  }

  const handleLogout = () => {
    setUserEmail(null)
    localStorage.removeItem("userEmail")
  }

  if (!userEmail) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Droplet className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">AguaNet</h1>
              <p className="text-xs text-muted-foreground">Sistema de Pagos</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{userEmail}</span>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground text-balance">Mis Cuentas de Agua</h2>
            <p className="text-muted-foreground mt-1">Gestiona todas tus cuentas desde un solo lugar</p>
          </div>
          <Button onClick={() => setIsAddAccountOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Agregar Cuenta
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Todas las Cuentas</TabsTrigger>
            <TabsTrigger value="pending">Con Saldo Pendiente</TabsTrigger>
            <TabsTrigger value="paid">Al Día</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <AccountsList userEmail={userEmail} filter="all" />
          </TabsContent>

          <TabsContent value="pending">
            <AccountsList userEmail={userEmail} filter="pending" />
          </TabsContent>

          <TabsContent value="paid">
            <AccountsList userEmail={userEmail} filter="paid" />
          </TabsContent>
        </Tabs>
      </main>

      <AddAccountDialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen} userEmail={userEmail} />
    </div>
  )
}
