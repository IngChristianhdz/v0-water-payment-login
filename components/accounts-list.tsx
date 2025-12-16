"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, DollarSign, Trash2, CreditCard, Droplet } from "lucide-react"
import { PaymentDialog } from "@/components/payment-dialog"

interface WaterAccount {
  id: string
  accountNumber: string
  address: string
  balance: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
}

interface AccountsListProps {
  userEmail: string
  filter: "all" | "pending" | "paid"
}

export function AccountsList({ userEmail, filter }: AccountsListProps) {
  const [accounts, setAccounts] = useState<WaterAccount[]>([])
  const [selectedAccount, setSelectedAccount] = useState<WaterAccount | null>(null)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)

  useEffect(() => {
    loadAccounts()
  }, [userEmail])

  const loadAccounts = () => {
    const key = `accounts_${userEmail}`
    const stored = localStorage.getItem(key)
    if (stored) {
      setAccounts(JSON.parse(stored))
    }
  }

  const deleteAccount = (id: string) => {
    const key = `accounts_${userEmail}`
    const filtered = accounts.filter((acc) => acc.id !== id)
    setAccounts(filtered)
    localStorage.setItem(key, JSON.stringify(filtered))
  }

  const handlePayment = (accountId: string, amount: number) => {
    const key = `accounts_${userEmail}`
    const updated = accounts.map((acc) => {
      if (acc.id === accountId) {
        const newBalance = Math.max(0, acc.balance - amount)
        return {
          ...acc,
          balance: newBalance,
          status: newBalance === 0 ? ("paid" as const) : acc.status,
        }
      }
      return acc
    })
    setAccounts(updated)
    localStorage.setItem(key, JSON.stringify(updated))
  }

  const filteredAccounts = accounts.filter((account) => {
    if (filter === "pending") return account.status === "pending" || account.status === "overdue"
    if (filter === "paid") return account.status === "paid"
    return true
  })

  if (filteredAccounts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Droplet className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No hay cuentas registradas</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAccounts.map((account) => (
          <Card key={account.id} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">Cuenta #{account.accountNumber}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-2">
                    <MapPin className="h-3 w-3" />
                    {account.address}
                  </CardDescription>
                </div>
                <Badge variant={account.status === "paid" ? "default" : "destructive"}>
                  {account.status === "paid" ? "Al Día" : account.status === "overdue" ? "Vencido" : "Pendiente"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Saldo</span>
                </div>
                <span className="text-2xl font-semibold text-foreground">${account.balance.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Vence: {account.dueDate}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 gap-2"
                  disabled={account.balance === 0}
                  onClick={() => {
                    setSelectedAccount(account)
                    setIsPaymentOpen(true)
                  }}
                >
                  <CreditCard className="h-4 w-4" />
                  Pagar
                </Button>
                <Button variant="outline" size="icon" onClick={() => deleteAccount(account.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAccount && (
        <PaymentDialog
          open={isPaymentOpen}
          onOpenChange={setIsPaymentOpen}
          account={selectedAccount}
          onPaymentComplete={handlePayment}
        />
      )}
    </>
  )
}
