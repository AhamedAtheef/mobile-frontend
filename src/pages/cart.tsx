import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/seporator";
import { Input } from "@/components/ui/inputs";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag,
  Shield,
  Truck,
  Heart
} from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 1199,
      originalPrice: 1299,
      quantity: 1,
      image: "/api/placeholder/120/120",
      inStock: true,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung", 
      price: 1099,
      originalPrice: 1199,
      quantity: 1,
      image: "/api/placeholder/120/120",
      inStock: true,
    },
    {
      id: 3,
      name: "Wireless Charger",
      brand: "Apple",
      price: 79,
      originalPrice: 99,
      quantity: 2,
      image: "/api/placeholder/120/120",
      inStock: true,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const moveToWishlist = (id: number) => {
    // In a real app, this would move the item to wishlist
    removeItem(id);
  };

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo({ code: "SAVE10", discount: 50 });
    } else if (promoCode.toLowerCase() === "newuser") {
      setAppliedPromo({ code: "NEWUSER", discount: 100 });
    } else {
      setAppliedPromo(null);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const promoDiscount = appliedPromo?.discount || 0;
  const shipping = subtotal > 99 ? 0 : 15;
  const tax = Math.round((subtotal - promoDiscount) * 0.08);
  const total = subtotal - promoDiscount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-8" />
          <h1 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/mobiles">
            <Button size="lg" variant="cart" className="bg-green-400">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="shop-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                          <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xl font-bold price-text">${item.price}</span>
                            {item.originalPrice > item.price && (
                              <>
                                <span className="discount-text">${item.originalPrice}</span>
                                <Badge variant="secondary" className="bg-success/10 text-success">
                                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium">Qty:</span>
                          <div className="flex items-center border border-border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1 min-w-12 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveToWishlist(item.id)}
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="mt-3">
                        {item.inStock ? (
                          <div className="flex items-center text-success text-sm">
                            <Shield className="h-4 w-4 mr-1" />
                            In Stock - Ships within 24 hours
                          </div>
                        ) : (
                          <div className="flex items-center text-destructive text-sm">
                            <Shield className="h-4 w-4 mr-1" />
                            Out of Stock
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link to="/mobiles">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shop-card border-0 sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Promo Code</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="flex items-center text-success text-sm">
                      <Tag className="h-4 w-4 mr-1" />
                      {appliedPromo.code} applied - ${appliedPromo.discount} off
                    </div>
                  )}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                    <span className="text-foreground">${subtotal}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Savings</span>
                      <span className="text-success">-${savings}</span>
                    </div>
                  )}
                  
                  {appliedPromo && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Promo ({appliedPromo.code})</span>
                      <span className="text-success">-${appliedPromo.discount}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {shipping === 0 ? (
                        <span className="text-success">FREE</span>
                      ) : (
                        `$${shipping}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">${tax}</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="price-text">${total}</span>
                </div>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                    <div className="flex items-center text-primary text-sm">
                      <Truck className="h-4 w-4 mr-2" />
                      Add ${99 - subtotal} more for FREE shipping
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <Link to="/checkout">
                  <Button size="lg" variant="cart" className="w-full bg-[#65e47a]">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                {/* Security Notice */}
                <div className="text-center text-xs text-muted-foreground">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Secure checkout with SSL encryption
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;