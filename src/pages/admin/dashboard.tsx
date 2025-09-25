import { useEffect, useState } from "react";
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
  Home,
} from "lucide-react";
import axios from "axios";
import PulseLoader from "@/components/loading";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  // States
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const limit = 8;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [ordersRes, usersRes, productsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${page}/${limit}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${page}/${limit}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getproducts?page=${page}&limit=${limit}`),
        ]);

        setOrders(ordersRes.data.orders || []);
        setUsers(usersRes.data.users || []);
        setProducts(productsRes.data.products || []);
        setTotalPages(ordersRes.data.totalPages || 1); // 👈 consistent key
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token, page]);


  // Stats
  const stats = [
    {
      title: "Total Revenue",
      value: `Rs.${orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0).toLocaleString()}`,
      change: "+0%", // 👉 you can calculate vs last month if needed
      trend: "up",
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Orders",
      value: orders.length,
      change: "+0%",
      trend: "up",
      icon: ShoppingCart,
      description: "vs last month",
    },
    {
      title: "Customers",
      value: users.length,
      change: "+0%",
      trend: "up",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Products",
      value: products.length,
      change: "+0%",
      trend: "up",
      icon: Smartphone,
      description: "vs last month",
    },
  ];

  // Status config
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return { label: "Completed", color: "bg-success/10 text-success cursor-pointer hover:bg-black", icon: CheckCircle };
      case "processing":
        return { label: "Processing", color: "bg-warning/10 text-warning cursor-pointer hover:bg-black", icon: Clock };
      case "shipped":
        return { label: "Shipped", color: "bg-primary/10 text-primary cursor-pointer hover:bg-black", icon: Package };
      case "cancelled":
        return { label: "Cancelled", color: "bg-destructive/10 text-destructive cursor-pointer hover:bg-black", icon: AlertTriangle };
      default:
        return { label: status, color: "bg-muted text-muted-foreground cursor-pointer hover:bg-black", icon: Clock };
    }
  };

  // Low stock filter
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  // Top products by sales
  const topProducts = [...products]
    .sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .slice(0, 4);

  return (
    <div className="p-6 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="flex justify-center items-center col-span-4 py-10">
            <PulseLoader />
          </div>
        ) : (
          stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="shop-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <p className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </p>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${stat.trend === "up"
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
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
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
              <Button variant="outline" size="sm" onClick={() => window.location.href = ("/admin/orders")}>
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div key={order.orderId} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-foreground">{order.orderId}</p>
                        <Badge className={statusConfig.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                      <p className="text-sm text-muted-foreground">Total: Rs.{order.totalPrice}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-medium price-text">Rs.{order.totalPrice}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
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
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium price-text">Rs.{(product.price || 0).toLocaleString()}</p>
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
                <div key={product._id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{product.title}</p>
                    <p className="text-sm text-muted-foreground">Threshold: 5 units</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="secondary"
                      className={`${product.stock <= 2
                        ? "bg-destructive/10 text-destructive"
                        : "bg-warning/10 text-warning"
                        }`}
                    >
                      {product.stock} left
                    </Badge>
                    <Button variant="link" size="sm" className="h-auto p-0 mt-1" onClick={() => window.location.href = ("/admin/mobiles/" + product.productId)}>
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
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2" onClick={() => window.location.href = ("/admin/mobiles/")}>
                <Smartphone className="h-6 w-6" />
                <span>Add Product</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2" onClick={() => window.location.href = ("/admin/orders/")}>
                <Package className="h-6 w-6" />
                <span>View Orders</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2" onClick={() => window.location.href = ("/admin/users/")}>
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2" onClick={() => window.location.href = ("/")}>
                <Home className="h-6 w-6" />
                <span>Home</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;
