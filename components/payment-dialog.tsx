"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Smartphone } from "lucide-react"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  account: {
    id: string
    accountNumber: string
    address: string
    balance: number
  }
  onPaymentComplete: (accountId: string, amount: number) => void
}

export function PaymentDialog({ open, onOpenChange, account, onPaymentComplete }: PaymentDialogProps) {
  const [amount, setAmount] = useState(account.balance.toString())
  const [paymentMethod, setPaymentMethod] = useState("card")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const paymentAmount = Number.parseFloat(amount)

    if (paymentAmount > account.balance) {
      toast({
        title: "Error",
        description: "El monto no puede ser mayor al saldo pendiente",
        variant: "destructive",
      })
      return
    }

    onPaymentComplete(account.id, paymentAmount)

    toast({
      title: "Pago procesado",
      description: `Se ha pagado $${paymentAmount.toFixed(2)} a la cuenta #${account.accountNumber}`,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Realizar Pago</DialogTitle>
          <DialogDescription>
            Cuenta #{account.accountNumber} - {account.address}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Saldo pendiente</p>
            <p className="text-3xl font-semibold text-foreground">${account.balance.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Monto a Pagar</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAmount((account.balance / 2).toFixed(2))}
              >
                50%
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setAmount(account.balance.toString())}>
                Total
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Método de Pago</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 rounded-lg border border-border p-3 hover:bg-muted/50">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span>Tarjeta de Crédito/Débito</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-border p-3 hover:bg-muted/50">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Smartphone className="h-4 w-4 text-primary" />
                  <span>Transferencia Bancaria</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Confirmar Pago
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
