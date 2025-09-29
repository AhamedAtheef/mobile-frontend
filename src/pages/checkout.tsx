import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/inputs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radiogroup";
import { Checkbox } from "@/components/ui/checkoutbox";
import { Separator } from "@/components/ui/seporator";
import { Link, useNavigate } from "react-router-dom";
import { getCart, clearCart } from "@/utils/cart";

import {
  CreditCard,
  Truck,
  Shield,
  MapPin,
  User,
  CheckCircle,
  ArrowLeft,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import PulseLoader from "@/components/loading";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

useEffect(() => {
  if (!token) {
    toast.error("Please login to checkout");
    navigate("/login");
  }
}, [token, navigate]);

  // ✅ Shipping form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const isShippingValid = (
    firstName &&
    lastName &&
    email &&
    phone &&
    street &&
    city &&
    zip &&
    shippingMethod
  );
  //  Card details states
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const isCardValid = (
    cardNumber &&
    expiry &&
    cvv &&
    cardName &&
    paymentMethod
  );

  const isCod = paymentMethod === "cod";

  //  Get cart from localStorage
  const cartItems = getCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping =
    shippingMethod === "express" ? 200 : shippingMethod === "overnight" ? 300 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const shippingOptions = [
    { id: "standard", name: "Standard Shipping", description: "5-7 business days", price: 0 },
    { id: "express", name: "Express Shipping", description: "2-3 business days", price: 200 },
    { id: "overnight", name: "Overnight Delivery", description: "Next business day", price: 300 },
  ];

  //  Place Order
  const placeOrder = async () => {

    setLoading(true);
    try {
      const orderData = {
        products: cartItems.map((item) => ({
          productId: item.productid,
          quantity: item.quantity,
          productimage: item.image,
        })),
        name: `${firstName} ${lastName}`,
        address: {
          street,
          city,
          zip,
        },
        phone,
        email,
        totalPrice: total,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Order placed!");
      clearCart();
      navigate("/");
      console.log(res.data);
    } catch (err) {
      toast.error("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? <PulseLoader/> :(
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="flex items-center text-muted-foreground hover:text-green-500 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-green-500 mb-2">Checkout</h1>

          {/* Steps */}
          <div className="hidden md:flex items-center space-x-4 mt-6">
            {[
              { number: 1, name: "Shipping" },
              { number: 2, name: "Payment" },
              { number: 3, name: "Review" },
            ].map((s) => (
              <div key={s.number} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s.number ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                    }`}
                >
                  {step > s.number ? <CheckCircle className="h-4 w-4" /> : s.number}
                </div>
                <span
                  className={`ml-2 text-sm ${step >= s.number ? "text-foreground" : "text-muted-foreground"
                    }`}
                >
                  {s.name}
                </span>
                {s.number < 3 && (
                  <div
                    className={`w-12 h-px mx-4 ${step > s.number ? "bg-green-500" : "bg-border"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" /> Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                      <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <Input placeholder="Address" value={street} onChange={(e) => setStreet(e.target.value)} required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                      <Input placeholder="ZIP Code" value={zip} onChange={(e) => setZip(e.target.value)} required />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2" /> Shipping Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                      className="space-y-4"
                    >
                      {shippingOptions.map((opt) => (
                        <div
                          key={opt.id}
                          className="flex items-center space-x-3 border rounded-lg p-4"
                        >
                          <RadioGroupItem value={opt.id} id={opt.id} />
                          <div className="flex-1">
                            <Label htmlFor={opt.id}>{opt.name}</Label>
                            <p className="text-sm text-muted-foreground">{opt.description}</p>
                          </div>
                          <span>{opt.price === 0 ? "FREE" : `Rs.${opt.price}`}</span>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <div className="flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      className="bg-green-500 text-white"
                      disabled={!isShippingValid}   // disable when fields empty
                    >
                      Continue to Payment
                    </Button>
                  </div>

                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" /> Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 border rounded-lg p-4">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card">Credit/Debit Card</Label>
                      </div>
                      <div className="flex items-center space-x-3 border rounded-lg p-4">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod">Cash on Delivery</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {paymentMethod === "card" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          required
                        />
                        <Input
                          placeholder="CVV"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          required
                        />
                      </div>
                      <Input
                        placeholder="Name on Card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                      />
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" /> Billing Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox
                        checked={sameAsShipping}
                        onCheckedChange={(c) => setSameAsShipping(c === true)}
                      />
                      <Label>Same as shipping address</Label>
                    </div>
                    {!sameAsShipping && (
                      <>
                        <Input placeholder="Billing Address" required />
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <Input placeholder="City" required />
                          <Input placeholder="ZIP Code" required />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button onClick={() => setStep(1)} variant="outline">
                    Back
                  </Button>

                  {(paymentMethod === "cod" || isCardValid) && (
                    <Button
                      onClick={() => setStep(3)}
                      className="bg-green-500 text-white"
                    >
                      Review Order
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.productid} className="flex items-center gap-[12px] md:gap-0 space-x-4">
                        <img src={item.image} className="w-15 h-12 md:w-16 md:h-16 rounded-lg" />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground flex gap-[5px] text-center ">Qty: <span>{item.quantity}</span></p>
                        </div>
                        <p className="font-semibold ">
                          <span className="text-muted-foreground">Item Price:- </span> Rs.{item.price}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button onClick={() => setStep(2)} variant="outline">
                    Back
                  </Button>
                  <Button
                    className="bg-green-500 text-white flex items-center"
                    onClick={placeOrder}
                    disabled={
                      loading ||
                      total === 0 ||
                      (paymentMethod === "card" &&
                        (!cardNumber || !expiry || !cvv || !cardName))
                    }
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    {loading ? "Placing Order..." : "Place Order"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productid} className="flex justify-between items-center">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>Rs.{item.price * item.quantity}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs.{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `Rs.${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Rs.{tax}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>Rs.{total}</span>
                </div>
                <div className="text-sm text-green-600 flex items-center">
                  {total > 0 && <Shield className="h-4 w-4 mr-1" />}
                  {total > 0 && "Secure checkout"}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
)}
    </div>
  );
};

export default Checkout;
