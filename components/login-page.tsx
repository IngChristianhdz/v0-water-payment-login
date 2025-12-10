"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Droplets, Lock, Mail, AlertCircle } from "lucide-react"

export function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email || !password) {
      setError("Por favor completa todos los campos")
      setIsLoading(false)
      return
    }

    const success = await login(email, password)

    if (!success) {
      setError("Correo o contraseña incorrectos")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo - Información institucional */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-(--color-primary) to-(--color-primary-dark) p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Droplets className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">OAPAS</h1>
              <p className="text-sm text-white/80">Organismo Operador</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">Portal de Pagos en Línea</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Gestiona tus servicios de agua potable de manera fácil y segura desde cualquier lugar.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
            <div>
              <h3 className="font-semibold mb-1">Pagos seguros 24/7</h3>
              <p className="text-sm text-white/80">Realiza tus pagos en cualquier momento</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
            <div>
              <h3 className="font-semibold mb-1">Consulta tu historial</h3>
              <p className="text-sm text-white/80">Accede a todos tus recibos y pagos anteriores</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
            <div>
              <h3 className="font-semibold mb-1">Reporta problemas</h3>
              <p className="text-sm text-white/80">Envía reportes de fugas o fallas en el servicio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario de login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface">
        <div className="w-full max-w-md">
          {/* Logo móvil */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-(--color-primary) rounded-xl flex items-center justify-center">
              <Droplets className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-(--color-text)">OAPAS</h1>
              <p className="text-sm text-(--color-text-light)">Portal de Pagos</p>
            </div>
          </div>

          <Card className="border-(--color-border) shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-(--color-text)">Iniciar Sesión</CardTitle>
              <CardDescription className="text-(--color-text-light)">
                Ingresa tu correo y contraseña para acceder al portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-(--color-text)">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-(--color-text-light)" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="usuario@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-(--color-border) focus:border-(--color-primary) focus:ring-(--color-primary)"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-(--color-text)">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-(--color-text-light)" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 border-(--color-border) focus:border-(--color-primary) focus:ring-(--color-primary)"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-(--color-primary) hover:bg-(--color-primary-dark) text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Iniciando sesión...
                    </span>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>

              <div className="mt-6 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-(--color-border)" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-(--color-text-light)">Usuarios de prueba</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm space-y-2">
                  <p className="font-semibold text-blue-900">Demo:</p>
                  <p className="text-blue-800">📧 usuario@ejemplo.com</p>
                  <p className="text-blue-800">🔑 12345678</p>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-(--color-primary) hover:text-(--color-primary-dark) font-medium"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-(--color-text-light)">
            ¿No tienes cuenta?{" "}
            <button className="text-(--color-primary) hover:text-(--color-primary-dark) font-medium">
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
