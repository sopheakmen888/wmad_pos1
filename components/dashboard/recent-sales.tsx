import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getRecentSales } from "@/lib/data"

export async function RecentSales() {
  const recentSales = await getRecentSales()

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>{sale.customer.firstName[0]}{sale.customer.lastName[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{sale.customer.firstName} {sale.customer.lastName}</p>
                <p className="text-sm text-muted-foreground">
                  {sale.customer.email}
                </p>
              </div>
              <div className="ml-auto font-medium">+${sale.grandTotalAmount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

