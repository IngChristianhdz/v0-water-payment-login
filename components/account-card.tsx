import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, CreditCard, Calendar, Droplets, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface Account {
  id: string
  address: string
  accountNumber: string
  currentBalance: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
  lastPayment: number
  consumption: number
}

interface AccountCardProps {
  account: Account
}

const statusConfig = {
  paid: {
    label: "Pagado",
    variant: "default" as const,
    icon: CheckCircle,
    color: "text-accent",
  },
  pending: {
    label: "Pendiente",
    variant: "secondary" as const,
    icon: Clock,
    color: "text-muted-foreground",
  },
  overdue: {
    label: "Vencido",
    variant: "destructive" as const,
    icon: AlertCircle,
    color: "text-destructive",
  },
}

export function AccountCard({ account }: AccountCardProps) {
  const config = statusConfig[account.status]
  const StatusIcon = config.icon

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm font-medium leading-tight">{account.address}</p>
          </div>
          <Badge variant={config.variant} className="flex items-center gap-1 flex-shrink-0 ml-2">
            <StatusIcon className="w-3 h-3" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Cuenta:</span>
            <span className="font-mono font-medium">{account.accountNumber}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Vencimiento:</span>
            <span className="font-medium">{account.dueDate}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Droplets className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Consumo:</span>
            <span className="font-medium">{account.consumption} m³</span>
          </div>
        </div>

        <div className="pt-3 border-t space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Saldo actual:</span>
            <span className={`text-2xl font-bold ${account.currentBalance > 0 ? "text-destructive" : "text-accent"}`}>
              ${account.currentBalance.toFixed(2)}
            </span>
          </div>

          {account.status !== "paid" && (
            <Button className="w-full" size="sm">
              Pagar Ahora
            </Button>
          )}

          {account.status === "paid" && (
            <Button variant="outline" className="w-full bg-transparent" size="sm">
              Ver Recibo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
