import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/inputs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radiogroup";
import { Checkbox } from "@/components/ui/checkoutbox";
import { Separator } from "@/components/ui/seporator";

import { 
  CreditCard, 
  Truck, 
  Shield, 
  MapPin, 
  User, 
  CheckCircle,
  ArrowLeft,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 1199,
      quantity: 1,
      image: "/api/placeholder/80/80",
    },
    {
      id: 2,
      name: "Wireless Charger",
      brand: "Apple",
      price: 79,
      quantity: 1,
      image: "/api/placeholder/80/80",
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === "express" ? 25 : shippingMethod === "overnight" ? 45 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "5-7 business days",
      price: 0,
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "2-3 business days",
      price: 25,
    },
    {
      id: "overnight",
      name: "Overnight Delivery", 
      description: "Next business day",
      price: 45,
    },
  ];

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="flex items-center text-muted-foreground hover:text-[#a8e953] mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#82f155] mb-2">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-6">
            {[
              { number: 1, name: "Shipping" },
              { number: 2, name: "Payment" },
              { number: 3, name: "Review" },
            ].map((stepItem) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepItem.number 
                    ? "bg-white text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {step > stepItem.number ? <CheckCircle className="h-4 w-4 " /> : stepItem.number}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= stepItem.number ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {stepItem.name}
                </span>
                {stepItem.number < 3 && (
                  <div className={`w-12 h-px mx-4 ${
                    step > stepItem.number ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="space-y-6">
                <Card className="shop-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" placeholder="+94 723 456 789" required/>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input id="address" placeholder="123 Main Street" required/>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" placeholder="New York" required/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code *</Label>
                        <Input id="zip" placeholder="12345" required/>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shop-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Shipping Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
                      {shippingOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-3 border border-border rounded-lg p-4">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div className="flex-1">
                            <Label htmlFor={option.id} className="font-medium cursor-pointer">
                              {option.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {option.price === 0 ? "FREE" : `$${option.price}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={handleNextStep} variant="cart" size="lg" className="bg-[#6dec82]">
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <div className="space-y-6">
                <Card className="shop-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div className="flex items-center space-x-3 border border-border rounded-lg p-4">
                        <RadioGroupItem value="card" id="card" />
                        <div className="flex-1">
                          <Label htmlFor="card" className="font-medium cursor-pointer">
                            Credit/Debit Card
                          </Label>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 border border-border rounded-lg p-4">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <div className="flex-1">
                          <Label htmlFor="paypal" className="font-medium cursor-pointer">
                            PayPal
                          </Label>
                          <p className="text-sm text-muted-foreground">Pay with your PayPal account</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {paymentMethod === "card" && (
                  <Card className="shop-card border-0">
                    <CardHeader>
                      <CardTitle>Card Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date *</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card *</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="shop-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Billing Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox 
                        id="sameAsShipping" 
                        checked={sameAsShipping}
                        onCheckedChange={(checked) => setSameAsShipping(checked === true)}
                      />
                      <Label htmlFor="sameAsShipping">Same as shipping address</Label>
                    </div>
                    
                    {!sameAsShipping && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="billingAddress">Address *</Label>
                          <Input id="billingAddress" placeholder="123 Main Street" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="billingCity">City *</Label>
                            <Input id="billingCity" placeholder="New York" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingState">State *</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ny">New York</SelectItem>
                                <SelectItem value="ca">California</SelectItem>
                                <SelectItem value="tx">Texas</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingZip">ZIP Code *</Label>
                            <Input id="billingZip" placeholder="12345" />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button onClick={handlePrevStep} variant="outline" size="lg">
                    Back to Shipping
                  </Button>
                  <Button onClick={handleNextStep} variant="cart" size="lg" className="bg-[#6de280]">
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {step === 3 && (
              <div className="space-y-6">
                <Card className="shop-card border-0">
                  <CardHeader>
                    <CardTitle>Order Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.brand}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold price-text">${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button onClick={handlePrevStep} variant="outline" size="lg">
                    Back to Payment
                  </Button>
                  <Button variant="cart" size="lg" className="flex items-center bg-[#6de280]">
                    <Lock className="h-4 w-4 mr-2 " />
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shop-card border-0 sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium price-text">${item.price}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${subtotal}</span>
                  </div>
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

                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="price-text">${total}</span>
                </div>

                {/* Security Notice */}
                <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                  <div className="flex items-center text-success text-sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Secure checkout with SSL encryption
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;