import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/inputs";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Package} from "lucide-react";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      email: "john@example.com",
      total: 1199,
      status: "completed",
      date: "2024-01-15",
      items: 1,
    },
    {
      id: "ORD-002", 
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      total: 899,
      status: "processing",
      date: "2024-01-14",
      items: 2,
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return { label: "Completed", color: "bg-success/10 text-success" };
      case "processing":
        return { label: "Processing", color: "bg-warning/10 text-warning" };
      default:
        return { label: status, color: "bg-muted text-muted-foreground" };
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders Management</h1>
      </div>

      <Card className="shop-card border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Orders</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              return (
                <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h3 className="font-medium text-foreground">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                    <span className="price-text font-medium">${order.total}</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Package className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;