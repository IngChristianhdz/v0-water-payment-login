"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet } from "lucide-react"

interface LoginFormProps {
  onLogin: (email: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      onLogin(email)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <Droplet className="h-10 w-10 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-balance">Sistema de Pagos AguaNet</CardTitle>
            <CardDescription className="mt-2">
              Ingresa tu correo electrónico para gestionar tus cuentas de agua
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Acceder
            </Button>
          </form>

          <div className="mt-6 rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground text-pretty">
              <strong className="text-foreground">Nota:</strong> Un correo puede estar vinculado a múltiples cuentas de
              diferentes domicilios
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
