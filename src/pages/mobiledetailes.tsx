import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Camera, 
  Shield,
  ArrowLeft,
  Plus,
  Minus
} from "lucide-react";

const MobileDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - in real app this would come from API
  const mobile = {
    id: 1,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    originalPrice: 1299,
    images: [
      "/api/placeholder/500/600",
      "/api/placeholder/500/600",
      "/api/placeholder/500/600",
      "/api/placeholder/500/600",
    ],
    rating: 4.8,
    reviews: 2847,
    badge: "Bestseller",
    inStock: true,
    description: "The iPhone 15 Pro Max features the powerful A17 Pro chip, advanced camera system, and premium titanium design. Experience the ultimate in mobile technology.",
    specifications: {
      display: "6.7-inch Super Retina XDR OLED",
      processor: "A17 Pro chip",
      storage: "256GB",
      ram: "8GB",
      camera: "48MP Triple Camera System",
      battery: "4441 mAh",
      os: "iOS 17",
      network: "5G",
    },
    features: [
      "Dynamic Island",
      "Always-On display",
      "Face ID",
      "Wireless charging",
      "Water resistant IP68",
      "Pro camera system",
    ],
  };

  const reviews = [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      comment: "Absolutely amazing phone! The camera quality is outstanding and the performance is top-notch.",
      date: "2024-01-15",
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      comment: "Great phone overall, but the price is quite high. Build quality is excellent though.",
      date: "2024-01-10",
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      comment: "Best iPhone I've ever owned. The battery life is impressive and the display is gorgeous.",
      date: "2024-01-05",
    },
  ];

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/mobiles" className="flex items-center text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Mobiles
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={mobile.images[selectedImage]} 
              alt={mobile.name}
              className="w-full h-96 lg:h-[500px] object-cover rounded-xl bg-muted"
            />
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
              {mobile.badge}
            </Badge>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {mobile.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${mobile.name} ${index + 1}`}
                className={`w-full h-20 object-cover rounded-lg cursor-pointer border-2 transition-colors ${
                  selectedImage === index ? 'border-primary' : 'border-border'
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground mb-2">{mobile.brand}</p>
            <h1 className="text-3xl font-bold text-foreground mb-4">{mobile.name}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(mobile.rating) ? 'fill-rating text-rating' : 'text-muted-foreground'}`} 
                  />
                ))}
              </div>
              <span className="text-muted-foreground">({mobile.reviews} reviews)</span>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold price-text">${mobile.price}</span>
              {mobile.originalPrice > mobile.price && (
                <span className="discount-text text-xl">${mobile.originalPrice}</span>
              )}
              <Badge variant="secondary" className="bg-success/10 text-success">
                {Math.round(((mobile.originalPrice - mobile.price) / mobile.originalPrice) * 100)}% OFF
              </Badge>
            </div>

            <p className="text-muted-foreground mb-6">{mobile.description}</p>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange('increase')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="cart" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="sm:w-auto">
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
              <Button size="lg" variant="ghost" className="sm:w-auto">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-success">In Stock - Ships within 24 hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(mobile.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                      <span className="font-medium text-foreground capitalize">{key.replace('_', ' ')}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mobile.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Camera className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-foreground">{review.user}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'fill-rating text-rating' : 'text-muted-foreground'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MobileDetails;