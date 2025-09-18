import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/inputs";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Edit, Trash2, Plus } from "lucide-react";

const Mobiles = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const mobiles = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 1199,
      stock: 15,
      status: "active",
      image: "/api/placeholder/60/60",
      category: "flagship",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      brand: "Samsung",
      price: 899,
      stock: 8,
      status: "active", 
      image: "/api/placeholder/60/60",
      category: "flagship",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mobile Products</h1>
        <Button variant="cart">
          <Plus className="h-4 w-4 mr-2" />
          Add Mobile
        </Button>
      </div>

      <Card className="shop-card border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Products</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mobiles.map((mobile) => (
              <div key={mobile.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={mobile.image} alt={mobile.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-medium text-foreground">{mobile.name}</h3>
                    <p className="text-sm text-muted-foreground">{mobile.brand}</p>
                    <Badge variant="secondary">{mobile.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="price-text font-medium">${mobile.price}</p>
                    <p className="text-sm text-muted-foreground">Stock: {mobile.stock}</p>
                  </div>
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

export default Mobiles;