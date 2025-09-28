import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/inputs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Heart } from "lucide-react";
import PulseLoader from "@/components/loading";

const Mobiles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [filterCategory, setFilterCategory] = useState("all");
  const [mobiles, setMobiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getproducts`)
      .then((response) => {
        setMobiles(response.data.products);
        console.log(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API error:", error);
        setLoading(false);
      });
  }, []);

  const categories = [
    { value: "all", label: "All" },
    { value: "smart phones", label: "Mobile" },
    { value: "laptop", label: "Laptop" },
    { value: "tablet", label: "Tablet" },
  ];

  const filteredMobiles = mobiles.filter((mobile) => {
    const matchesSearch =
      (mobile.title &&
        mobile.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (mobile.category &&
        mobile.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      filterCategory === "all" || mobile.category === filterCategory;
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
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
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
      {loading ? <PulseLoader/> :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMobiles.map((mobile) => (
            <Card
              key={mobile.productid}
              className="shop-card border-0 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={Array.isArray(mobile.image) ? mobile.image[0] : mobile.image}
                  alt={mobile.title}
                  className="w-full h-48 md:h-[260px] object-center  group-hover:scale-105 transition-transform duration-300"
                />
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
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {mobile.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between space-x-2 mb-4">
                  <span className="text-lg font-bold price-text">
                    Rs.{mobile.price}
                  </span>
                  {mobile.labeledprice > mobile.price && (
                    <span className="discount-text text-xs">
                      Rs.{mobile.labeledprice}
                    </span>
                  )}
                </div>

                <Link to={`/mobiles/${mobile.productid}`}>
                  <Button
                    className="w-full bg-[#4be43d] hover:bg-[#35c54dd8]"
                    variant="cart"
                    size="sm"
                  >
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      }

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
