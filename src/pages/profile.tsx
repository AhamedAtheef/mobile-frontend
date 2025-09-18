import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/inputs";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Calendar, Settings, Shield, Heart, Package } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, NY 12345",
    joinDate: "January 2023",
    avatar: "/api/placeholder/100/100",
  };

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 1199,
      items: 1,
      product: "iPhone 15 Pro Max",
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 899,
      items: 1,
      product: "Google Pixel 8 Pro",
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Processing",
      total: 299,
      items: 2,
      product: "Phone Case & Screen Protector",
    },
  ];

  const wishlist = [
    {
      id: 1,
      name: "Samsung Galaxy S24 Ultra",
      price: 1099,
      image: "/api/placeholder/80/80",
      inStock: true,
    },
    {
      id: 2,
      name: "OnePlus 12",
      price: 699,
      image: "/api/placeholder/80/80",
      inStock: true,
    },
    {
      id: 3,
      name: "Xiaomi 14 Pro",
      price: 899,
      image: "/api/placeholder/80/80",
      inStock: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-success/10 text-success";
      case "Shipped":
        return "bg-primary/10 text-primary";
      case "Processing":
        return "bg-warning/10 text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shop-card border-0">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Badge variant="secondary" className="mt-2">
                      Member since {user.joinDate}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="account" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="mt-6">
                <Card className="shop-card border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your account details and information</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          defaultValue={user.name}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={user.email}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          defaultValue={user.phone}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          defaultValue={user.address}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button variant="cart" onClick={() => setIsEditing(false)}>
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <Card className="shop-card border-0">
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View and track your recent orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="font-semibold text-foreground">Order {order.id}</p>
                              <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-foreground">{order.product}</p>
                              <p className="text-xs text-muted-foreground">{order.items} item(s)</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold price-text">${order.total}</p>
                              <Button variant="link" size="sm" className="h-auto p-0 text-[#a2eeb9]">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist" className="mt-6">
                <Card className="shop-card border-0">
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                    <CardDescription>Items you've saved for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {wishlist.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 border border-border rounded-lg p-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{item.name}</h4>
                            <p className="price-text font-semibold">${item.price}</p>
                            <p className={`text-sm ${item.inStock ? 'text-success' : 'text-destructive'}`}>
                              {item.inStock ? 'In Stock' : 'Out of Stock'}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="cart" size="sm" disabled={!item.inStock} className="bg-[#06c750]">
                              Add to Cart
                            </Button>
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="space-y-6">
                  <Card className="shop-card border-0">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Change Password</p>
                          <p className="text-sm text-muted-foreground">Update your password regularly</p>
                        </div>
                        <Button variant="outline">Change</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shop-card border-0">
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                      <CardDescription>Customize your experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive updates about orders and promotions</p>
                        </div>
                        <Button variant="outline">Manage</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Privacy Settings</p>
                          <p className="text-sm text-muted-foreground">Control your data and privacy preferences</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;