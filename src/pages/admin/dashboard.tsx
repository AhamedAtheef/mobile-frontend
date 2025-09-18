import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Smartphone,
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,234",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Orders",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      description: "vs last month",
    },
    {
      title: "Customers",
      value: "3,456",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Products",
      value: "89",
      change: "-2.1%",
      trend: "down",
      icon: Smartphone,
      description: "vs last month",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      product: "iPhone 15 Pro Max",
      amount: 1199,
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      product: "Samsung Galaxy S24",
      amount: 899,
      status: "processing",
      date: "2024-01-15",
    },
    {
      id: "ORD-003",
      customer: "Mike Wilson",
      product: "Google Pixel 8 Pro",
      amount: 699,
      status: "shipped",
      date: "2024-01-14",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      product: "OnePlus 12",
      amount: 799,
      status: "completed",
      date: "2024-01-14",
    },
    {
      id: "ORD-005",
      customer: "David Brown",
      product: "iPhone 15",
      amount: 999,
      status: "cancelled",
      date: "2024-01-13",
    },
  ];

  const lowStockProducts = [
    { name: "iPhone 15 Pro Max", stock: 3, threshold: 5 },
    { name: "Samsung Galaxy S24 Ultra", stock: 1, threshold: 5 },
    { name: "Google Pixel 8", stock: 2, threshold: 5 },
    { name: "OnePlus 12", stock: 4, threshold: 10 },
  ];

  const topProducts = [
    { name: "iPhone 15 Pro Max", sales: 145, revenue: 173555 },
    { name: "Samsung Galaxy S24", sales: 98, revenue: 88102 },
    { name: "Google Pixel 8 Pro", sales: 76, revenue: 53144 },
    { name: "OnePlus 12", sales: 54, revenue: 43146 },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return { label: "Completed", color: "bg-success/10 text-success", icon: CheckCircle };
      case "processing":
        return { label: "Processing", color: "bg-warning/10 text-warning", icon: Clock };
      case "shipped":
        return { label: "Shipped", color: "bg-primary/10 text-primary", icon: Package };
      case "cancelled":
        return { label: "Cancelled", color: "bg-destructive/10 text-destructive", icon: AlertTriangle };
      default:
        return { label: status, color: "bg-muted text-muted-foreground", icon: Clock };
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shop-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <Badge 
                        variant="secondary"
                        className={`text-xs ${
                          stat.trend === "up" 
                            ? "bg-success/10 text-success" 
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card className="shop-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-foreground">{order.id}</p>
                        <Badge className={statusConfig.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.product}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-medium price-text">${order.amount}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="shop-card border-0">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium price-text">${product.revenue.toLocaleString()}</p>
                    <div className="flex items-center text-success text-sm">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+12%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Low Stock Alert */}
        <Card className="shop-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                  Low Stock Alert
                </CardTitle>
                <CardDescription>Products running low on inventory</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-warning/10 text-warning">
                {lowStockProducts.length} items
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div key={product.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">Threshold: {product.threshold} units</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="secondary"
                      className={`${
                        product.stock <= 2 
                          ? "bg-destructive/10 text-destructive" 
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {product.stock} left
                    </Badge>
                    <Button variant="link" size="sm" className="h-auto p-0 mt-1">
                      Restock
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shop-card border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Smartphone className="h-6 w-6" />
                <span>Add Product</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Package className="h-6 w-6" />
                <span>View Orders</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span>Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;