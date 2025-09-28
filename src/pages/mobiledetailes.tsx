import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  ShoppingCart,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { addToCart } from "@/utils/cart";

const MobileDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
      );
      setProduct(res.data.product);
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center">No product found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to="/mobiles"
          className="flex items-center text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Mobiles
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4 ">
          <div className="relative md:px-[22%] lg:px-0">
            <img
              src={product.image[selectedImage]}
              alt={product.title}
              className="w-full md:w-[500px] h-96 lg:h-[500px] object-center rounded-xl bg-muted"
            />
          </div>

          {/* Thumbnail Images */}
          {product.image.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.image.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className={`w-full h-20 md:w-[150px] md:h-24 object-center  rounded-lg cursor-pointer border-2 transition-colors ${selectedImage === index
                    ? "border-primary"
                    : "border-border"
                    }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {product.title}
            </h1>

            <div className="flex items-center justify-between md:justify-between  md:gap-[5%] space-x-4 mb-6">
              <span className="text-[20px]  md:text-3xl font-bold price-text">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.labeledprice > product.price && (
                <>
                  <span className="hidden md:block discount-text md:text-3xl  text-xl line-through">
                    Rs. {product.labeledprice.toLocaleString()}
                  </span>
                  <Badge variant="secondary" className="bg-success/10 text-success ">
                    {Math.round(
                      ((product.labeledprice - product.price) /
                        product.labeledprice) *
                      100
                    )}
                    % OFF
                  </Badge>
                </>

              )}
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-5 lg:py-2 min-w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange("increase")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row  gap-4">
              <Button size="lg" variant="cart" className="flex-1 py-[8px] bg-green-400"
                onClick={() => {
                  addToCart(product, quantity);
                  toast.success("Added to cart!");
                }}>
                <ShoppingCart className="mr-2 h-5 w-5 " />
                Add to Cart
              </Button>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-success" />
                <span className="text-success">
                  In Stock - Ships within 24 hours
                </span>
              </div>
              <div>
                <Badge variant="secondary" className="bg-success/10 md:hidden text-success ">
                  {Math.round(
                    ((product.labeledprice - product.price) /
                      product.labeledprice) *
                    100
                  )}
                  % OFF
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDetails;
