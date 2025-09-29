import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/seporator";
import { Input } from "@/components/ui/inputs";
import {
  Trash2, Plus, Minus, ShoppingBag, ArrowRight,
  Tag, Shield, Truck, Heart
} from "lucide-react";
import { getCart, saveCart } from "@/utils/cart";

const Cart = () => {
  const [cartItems, setCartItems] = useState(getCart());
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<any>(null);

  // ✅ Update quantity
  const updateQuantity = (productid: string, change: number) => {
    const updated = cartItems.map(item =>
      item.productid === productid
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCartItems(updated);
    saveCart(updated);
  };

  // ✅ Remove item
  const removeItem = (productid: string) => {
    const updated = cartItems.filter(item => item.productid !== productid);
    setCartItems(updated);
    saveCart(updated);
  };


  // ✅ Apply promo
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo({ code: "SAVE10", discount: 50 });
    } else if (promoCode.toLowerCase() === "newuser") {
      setAppliedPromo({ code: "NEWUSER", discount: 100 });
    } else {
      setAppliedPromo(null);
    }
  };

  // ✅ Price calculations
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const savings = cartItems.reduce((sum, i) => sum + ((i.originalPrice || i.price) - i.price) * i.quantity, 0);
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
            Looks like you haven't added any items yet.
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
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
            Shopping Cart
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
              <Card key={item.productid} className="shop-card border-0">
                <CardContent className="p-4 sm:p-6 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:space-x-4 space-y-3 sm:space-y-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg mx-auto sm:mx-0"
                    />
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="text-center sm:text-left">
                          <p className="text-xs sm:text-sm text-muted-foreground">{item.category}</p>
                          <h3 className="text-base sm:text-lg font-semibold text-foreground">{item.title}</h3>
                          <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-2 mt-1">
                            <span className="text-lg sm:text-xl font-bold price-text">Rs {item.price}</span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <>
                                <span className="discount-text">Rs {item.originalPrice}</span>
                                <Badge variant="secondary" className="bg-success/10 text-success text-xs sm:text-sm">
                                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quantity + Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 sm:mt-4 space-y-3 sm:space-y-0">
                        {/* Quantity */}
                        <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3">
                          <span className="text-xs sm:text-sm font-medium">Qty:</span>
                          <div className="flex items-center border border-border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.productid, -1)}
                              disabled={item.quantity <= 1}
                              className="h-7 w-7 sm:h-8 sm:w-8"
                            >
                              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <span className="px-2 sm:px-3 py-1 min-w-10 sm:min-w-12 text-center text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.productid, 1)}
                              className="h-7 w-7 sm:h-8 sm:w-8"
                            >
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-center sm:justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.productid)}
                            className="text-destructive hover:text-destructive text-xs sm:text-sm"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      {/* Stock */}
                      <div className="mt-2 sm:mt-3 text-center sm:text-left">
                        {item.stock > 0 ? (
                          <div className="flex items-center justify-center sm:justify-start text-success text-xs sm:text-sm">
                            <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            In Stock - Ships within 24 hours
                          </div>
                        ) : (
                          <div className="flex items-center justify-center sm:justify-start text-destructive text-xs sm:text-sm">
                            <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
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
            <div className="mt-4 sm:mt-6 text-center sm:text-left">
              <Link to="/mobiles">
                <Button variant="outline" size="sm" className="px-4 sm:px-6">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Summary (no big change, just padding/font tweak) */}
          <div className="lg:col-span-1">
            <Card className="shop-card border-0 sticky top-2 sm:top-4">
              <CardHeader className="px-4 sm:px-6 py-3 sm:py-4">
                <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 py-3 sm:py-4">
                {/* Promo */}
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
                      {appliedPromo.code} applied - Rs {appliedPromo.discount} off
                    </div>
                  )}
                </div>

                <Separator />

                {/* Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                    <span className="text-foreground">Rs {subtotal}</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Savings</span>
                      <span className="text-success">-Rs {savings}</span>
                    </div>
                  )}

                  {appliedPromo && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Promo ({appliedPromo.code})</span>
                      <span className="text-success">-Rs {appliedPromo.discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {shipping === 0 ? <span className="text-success">FREE</span> : `Rs ${shipping}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">Rs {tax}</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="price-text">Rs {total}</span>
                </div>

                {shipping > 0 && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                    <div className="flex items-center text-primary text-sm">
                      <Truck className="h-4 w-4 mr-2" />
                      Add Rs {99 - subtotal} more for FREE shipping
                    </div>
                  </div>
                )}

                <Link to="/checkout">
                  <Button size="lg" variant="cart" className="mt-[10%] md:mt-[5%] w-full bg-[#65e47a]">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

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
