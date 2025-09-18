import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Zap, Shield, Truck, Smartphone } from "lucide-react";

const Home = () => {
  const featuredMobiles = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 1199,
      originalPrice: 1299,
      image: "/api/placeholder/300/400",
      rating: 4.8,
      reviews: 2847,
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: 1099,
      originalPrice: 1199,
      image: "/api/placeholder/300/400",
      rating: 4.7,
      reviews: 1925,
      badge: "New Arrival",
    },
    {
      id: 3,
      name: "Google Pixel 8 Pro",
      price: 899,
      originalPrice: 999,
      image: "/api/placeholder/300/400",
      rating: 4.6,
      reviews: 1456,
      badge: "AI Camera",
    },
  ];

  const categories = [
    { name: "Flagship", icon: Smartphone, count: 45, color: "bg-blue-500" },
    { name: "Budget", icon: Zap, count: 78, color: "bg-green-500" },
    { name: "Gaming", icon: Shield, count: 23, color: "bg-red-500" },
    { name: "Camera", icon: Star, count: 34, color: "bg-purple-500" },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery on orders over $99",
    },
    {
      icon: Shield,
      title: "Warranty",
      description: "1 year international warranty",
    },
    {
      icon: Zap,
      title: "Fast Support",
      description: "24/7 customer support",
    },
    {
      icon: Star,
      title: "Best Quality",
      description: "Authentic products guaranteed",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient py-20 px-4 overflow-hidden">
        {/* Background Video (md and up only) */}
        <video
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="/bgvedio.mp4"
        />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/50"></div>

        {/* Hero Content */}
        <div className="relative container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-[32px] md:text-7xl font-bold pb-[10px] typing-effect">
              Super Cell
              <span className=" bg-gradient-to-r from-[#08d881] via-[#00FF00] to-green-400 bg-clip-text text-transparent hover:via-green-200 hover:animate-pulse">
                {" "}City
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Discover the latest smartphones with cutting-edge technology.
              Premium quality, unbeatable prices, exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mobiles">
                <Button
                  size="lg"
                  variant="cart"
                  className="text-lg px-8 py-6 bg-transparent border-2 border-[#6de280] hover:bg-[#6de280] text-white hover:text-black hover:border-none"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shop-card text-center border-0">
                <CardContent className="pt-8">
                  <div className="bg-[#71df67] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">Find the perfect mobile for your needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="shop-card cursor-pointer group border-0">
                <CardContent className="p-6 text-center">
                  <div className={`${category.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} products</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Mobiles</h2>
            <p className="text-lg text-muted-foreground">Handpicked premium smartphones just for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMobiles.map((mobile) => (
              <Card key={mobile.id} className="shop-card border-0 overflow-hidden group">
                <div className="relative">
                  <img
                    src={mobile.image}
                    alt={mobile.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4  cursor-pointer hover-bg-green-500 text-primary-foreground">
                    {mobile.badge}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(mobile.rating) ? 'fill-rating text-rating' : 'text-muted-foreground'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">({mobile.reviews})</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{mobile.name}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold price-text">${mobile.price}</span>
                    <span className="discount-text">${mobile.originalPrice}</span>
                  </div>
                  <Link to={`/mobiles/${mobile.id}`}>
                    <Button className="w-full bg-[#4be43d] hover:bg-[#35c54dd8]" variant="cart">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/mobiles">
              <Button size="lg" variant="outline">
                View All Mobiles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;