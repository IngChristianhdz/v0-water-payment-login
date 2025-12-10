"use client"
import { useAuth } from "@/lib/auth-context"
import { LoginPage } from "@/components/login-page"
import { DashboardPage } from "@/components/dashboard-page"

export default function Home() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-(--color-primary) border-t-transparent rounded-full animate-spin"></div>
          <p className="text-(--color-text-light)">Cargando...</p>
        </div>
      </div>
    )
  }

  return user ? <DashboardPage /> : <LoginPage />
}
