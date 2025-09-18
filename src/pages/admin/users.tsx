import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/inputs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Eye, Edit, Trash2, UserPlus } from "lucide-react";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      avatar: "/api/placeholder/40/40",
      role: "customer",
      status: "active",
      orders: 5,
      totalSpent: 2999,
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com", 
      avatar: "/api/placeholder/40/40",
      role: "customer",
      status: "active",
      orders: 12,
      totalSpent: 5499,
      joinDate: "2024-01-10",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button variant="cart">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card className="shop-card border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Users</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-foreground">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-success/10 text-success">{user.status}</Badge>
                  <span className="price-text font-medium">${user.totalSpent}</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;