import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/inputs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  Download,
  RefreshCw
} from "lucide-react";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 1199,
      items: [
        {
          name: "iPhone 15 Pro Max",
          quantity: 1,
          price: 1199,
          image: "/api/placeholder/80/80"
        }
      ],
      shipping: {
        address: "123 Main Street, Anytown, NY 12345",
        method: "Express Shipping",
        trackingNumber: "TRK123456789"
      },
      deliveryDate: "2024-01-18"
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-20",
      status: "shipped",
      total: 1599,
      items: [
        {
          name: "Samsung Galaxy S24 Ultra",
          quantity: 1,
          price: 1099,
          image: "/api/placeholder/80/80"
        },
        {
          name: "Wireless Charger",
          quantity: 1,
          price: 79,
          image: "/api/placeholder/80/80"
        },
        {
          name: "Phone Case",
          quantity: 1,
          price: 29,
          image: "/api/placeholder/80/80"
        }
      ],
      shipping: {
        address: "123 Main Street, Anytown, NY 12345",
        method: "Standard Shipping",
        trackingNumber: "TRK987654321"
      },
      estimatedDelivery: "2024-01-25"
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-22",
      status: "processing",
      total: 899,
      items: [
        {
          name: "Google Pixel 8 Pro",
          quantity: 1,
          price: 899,
          image: "/api/placeholder/80/80"
        }
      ],
      shipping: {
        address: "123 Main Street, Anytown, NY 12345",
        method: "Express Shipping"
      },
      estimatedDelivery: "2024-01-26"
    },
    {
      id: "ORD-2024-004",
      date: "2024-01-25",
      status: "cancelled",
      total: 599,
      items: [
        {
          name: "OnePlus 11",
          quantity: 1,
          price: 599,
          image: "/api/placeholder/80/80"
        }
      ],
      cancelDate: "2024-01-26",
      cancelReason: "Customer requested cancellation"
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "delivered":
        return { 
          label: "Delivered", 
          icon: CheckCircle, 
          color: "bg-success/10 text-success",
          description: "Your order has been delivered successfully"
        };
      case "shipped":
        return { 
          label: "Shipped", 
          icon: Truck, 
          color: "bg-primary/10 text-primary",
          description: "Your order is on its way"
        };
      case "processing":
        return { 
          label: "Processing", 
          icon: Clock, 
          color: "bg-warning/10 text-warning",
          description: "We're preparing your order"
        };
      case "cancelled":
        return { 
          label: "Cancelled", 
          icon: AlertCircle, 
          color: "bg-destructive/10 text-destructive",
          description: "This order has been cancelled"
        };
      default:
        return { 
          label: status,
          icon: Package,
          color: "bg-muted text-muted-foreground",
          description: ""
        };
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">My Orders</h1>
          <p className="text-lg text-muted-foreground">
            Track and manage all your orders in one place
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders by ID or product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Order Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({getOrdersByStatus('processing').length})</TabsTrigger>
            <TabsTrigger value="shipped">Shipped ({getOrdersByStatus('shipped').length})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({getOrdersByStatus('delivered').length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({getOrdersByStatus('cancelled').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-6">
              {filteredOrders.length === 0 ? (
                <Card className="shop-card border-0">
                  <CardContent className="p-12 text-center">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
                    <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
                  </CardContent>
                </Card>
              ) : (
                filteredOrders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <Card key={order.id} className="shop-card border-0">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">Order {order.id}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={statusConfig.color}>
                            <StatusIcon className="h-4 w-4 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Order Items */}
                        <div className="space-y-3 mb-6">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold price-text">${item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Details */}
                        <div className="border-t border-border pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Shipping Information</h4>
                              <p className="text-sm text-muted-foreground mb-1">{order.shipping.address}</p>
                              <p className="text-sm text-muted-foreground">{order.shipping.method}</p>
                              {order.shipping.trackingNumber && (
                                <p className="text-sm text-primary mt-1">
                                  Tracking: {order.shipping.trackingNumber}
                                </p>
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Order Summary</h4>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Items ({order.items.length})</span>
                                <span className="text-foreground">${order.total}</span>
                              </div>
                              <div className="flex justify-between font-semibold">
                                <span className="text-foreground">Total</span>
                                <span className="price-text">${order.total}</span>
                              </div>
                              {order.estimatedDelivery && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                                </p>
                              )}
                              {order.deliveryDate && (
                                <p className="text-sm text-success mt-2">
                                  Delivered on: {new Date(order.deliveryDate).toLocaleDateString()}
                                </p>
                              )}
                              {order.cancelDate && (
                                <p className="text-sm text-destructive mt-2">
                                  Cancelled on: {new Date(order.cancelDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-6">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          {order.status === "shipped" && (
                            <Button variant="outline" size="sm">
                              <Truck className="h-4 w-4 mr-2" />
                              Track Package
                            </Button>
                          )}
                          {order.status === "delivered" && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download Invoice
                            </Button>
                          )}
                          {order.status === "processing" && (
                            <Button variant="destructive" size="sm">
                              Cancel Order
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reorder
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>

          {/* Other tab contents would filter by status */}
          {['processing', 'shipped', 'delivered', 'cancelled'].map(status => (
            <TabsContent key={status} value={status} className="mt-6">
              <div className="space-y-6">
                {getOrdersByStatus(status).map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <Card key={order.id} className="shop-card border-0">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">Order {order.id}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={statusConfig.color}>
                            <StatusIcon className="h-4 w-4 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{statusConfig.description}</p>
                        {/* Simplified view for filtered tabs */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {order.items.length} item{order.items.length > 1 ? 's' : ''}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.items[0].name}{order.items.length > 1 ? ` and ${order.items.length - 1} more` : ''}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold price-text">${order.total}</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
