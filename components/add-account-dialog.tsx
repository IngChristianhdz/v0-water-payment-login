"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface AddAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userEmail: string
}

export function AddAccountDialog({ open, onOpenChange, userEmail }: AddAccountDialogProps) {
  const [accountNumber, setAccountNumber] = useState("")
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState("")
  const [dueDate, setDueDate] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const key = `accounts_${userEmail}`
    const existing = localStorage.getItem(key)
    const accounts = existing ? JSON.parse(existing) : []

    const newAccount = {
      id: Date.now().toString(),
      accountNumber,
      address,
      balance: Number.parseFloat(balance),
      dueDate,
      status: Number.parseFloat(balance) > 0 ? ("pending" as const) : ("paid" as const),
    }

    accounts.push(newAccount)
    localStorage.setItem(key, JSON.stringify(accounts))

    toast({
      title: "Cuenta agregada",
      description: `La cuenta #${accountNumber} ha sido vinculada exitosamente`,
    })

    setAccountNumber("")
    setAddress("")
    setBalance("")
    setDueDate("")
    onOpenChange(false)
    window.location.reload()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Cuenta</DialogTitle>
          <DialogDescription>Vincula una nueva cuenta de agua a tu correo {userEmail}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Número de Cuenta</Label>
            <Input
              id="accountNumber"
              placeholder="12345678"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Domicilio</Label>
            <Input
              id="address"
              placeholder="Calle Principal 123, Col. Centro"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="balance">Saldo Pendiente</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Fecha de Vencimiento</Label>
            <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          </div>

          <Button type="submit" className="w-full">
            Agregar Cuenta
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
