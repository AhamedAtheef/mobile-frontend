import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";;
import { Input } from "@/components/ui/inputs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star, Heart } from "lucide-react";

const Mobiles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [filterCategory, setFilterCategory] = useState("all");

  const mobiles = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 1199,
      originalPrice: 1299,
      image: "/api/placeholder/250/350",
      rating: 4.8,
      reviews: 2847,
      badge: "Bestseller",
      category: "flagship",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      price: 1099,
      originalPrice: 1199,
      image: "/api/placeholder/250/350",
      rating: 4.7,
      reviews: 1925,
      badge: "New",
      category: "flagship",
    },
    {
      id: 3,
      name: "Google Pixel 8 Pro",
      brand: "Google",
      price: 899,
      originalPrice: 999,
      image: "/api/placeholder/250/350",
      rating: 4.6,
      reviews: 1456,
      badge: "AI Camera",
      category: "flagship",
    },
    {
      id: 4,
      name: "OnePlus 12",
      brand: "OnePlus",
      price: 699,
      originalPrice: 799,
      image: "/api/placeholder/250/350",
      rating: 4.5,
      reviews: 892,
      badge: "Fast Charging",
      category: "flagship",
    },
    {
      id: 5,
      name: "Xiaomi Redmi Note 13",
      brand: "Xiaomi",
      price: 299,
      originalPrice: 349,
      image: "/api/placeholder/250/350",
      rating: 4.3,
      reviews: 1247,
      badge: "Best Value",
      category: "budget",
    },
    {
      id: 6,
      name: "Samsung Galaxy A54",
      brand: "Samsung",
      price: 399,
      originalPrice: 449,
      image: "/api/placeholder/250/350",
      rating: 4.2,
      reviews: 956,
      badge: "Popular",
      category: "budget",
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "flagship", label: "Flagship" },
    { value: "budget", label: "Budget" },
    { value: "gaming", label: "Gaming" },
    { value: "camera", label: "Camera" },
  ];

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
  ];

  const filteredMobiles = mobiles.filter(mobile => {
    const matchesSearch = mobile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mobile.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || mobile.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Mobile Phones
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover the latest smartphones from top brands
        </p>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search mobiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger>
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" className="md:col-span-1">
          <Filter className="h-4 w-4 mr-2 " />
          More Filters
        </Button>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredMobiles.length} of {mobiles.length} results
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMobiles.map((mobile) => (
          <Card key={mobile.id} className="shop-card border-0 overflow-hidden group">
            <div className="relative">
              <img 
                src={mobile.image} 
                alt={mobile.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-3 left-3 cursor-pointer text-primary-foreground">
                {mobile.badge}
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-3 right-3 bg-background/80 hover:bg-background"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-4">
              <div className="mb-2">
                <p className="text-sm text-muted-foreground">{mobile.brand}</p>
                <h3 className="font-semibold text-foreground line-clamp-2">{mobile.name}</h3>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < Math.floor(mobile.rating) ? 'fill-rating text-rating' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">({mobile.reviews})</span>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <span className="text-lg font-bold price-text">${mobile.price}</span>
                {mobile.originalPrice > mobile.price && (
                  <span className="discount-text text-xs">${mobile.originalPrice}</span>
                )}
              </div>

              <Link to={`/mobiles/${mobile.id}`}>
                <Button className="w-full bg-[#4be43d] hover:bg-[#35c54dd8]" variant="cart" size="sm">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </div>
  );
};

export default Mobiles;