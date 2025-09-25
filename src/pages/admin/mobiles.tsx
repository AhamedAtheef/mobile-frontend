import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/inputs";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Edit, Trash2, Plus } from "lucide-react";
import { uploadFile } from "@/utils/imageupload";
import PulseLoader from "@/components/loading";
import { deleteImages } from "@/utils/deleteimages";
import toast from "react-hot-toast";
import UpdateProductModal from "@/components/updateproducts";
import Pagination from "@/components/ui/paginator";

const Mobiles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mobiles, setMobiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;
  const token = localStorage.getItem("token");

  // Modal & form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    labeledprice: "",
    category: "",
    stock: "",
    images: [] as File[],
  });

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/getproducts?page=${page}&limit=${limit}`,
      );
      setMobiles(res.data.products)
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching products", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    console.log("Mobiles:", mobiles);
  }, [page]);

  // Handle Add Product
  const handleAddProduct = async () => {
    try {
      setIsLoading(true);

      let uploadedUrls: string[] = [];
      if (formData.images.length > 0) {
        const uploadPromises = formData.images.map((img) => uploadFile(img));
        uploadedUrls = await Promise.all(uploadPromises);
        console.log("Uploaded URLs:", uploadedUrls);
      }

      const productData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        labeledprice: formData.labeledprice,
        category: formData.category,
        stock: formData.stock,
        images: uploadedUrls,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/productnew`,
        productData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsModalOpen(false);
      fetchProducts();
      setFormData({
        title: "",
        description: "",
        price: "",
        labeledprice: "",
        category: "",
        stock: "",
        images: [],
      });
    } catch (err) {
      console.error("Error adding product", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Delete Product
  const handledeleteproduct = async (productid: string, imageUrls: string[]) => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await deleteImages(imageUrls);
      fetchProducts();
      setIsLoading(false);
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const filteredMobiles = mobiles.filter((mobile) =>
    mobile.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mobile Products</h1>
        <Button variant="cart" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Mobile
        </Button>
      </div>

      {/* Products Card */}
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
          {loading ? (
            <PulseLoader />
          ) : (
            <div className="space-y-4">
              {filteredMobiles.map((mobile) => (
                <div
                  key={mobile._id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={mobile.image?.[0] || "/api/placeholder/60/60"}
                      alt={mobile.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-foreground">
                        {mobile.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {mobile.description}
                      </p>
                      <Badge variant="secondary">{mobile.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="price-text font-medium">
                        RS.{mobile.price}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Stock: {mobile.stock}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProduct(mobile)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handledeleteproduct(mobile.productid, mobile.image)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Mobile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 space-y-4">
            <h2 className="text-xl font-bold text-green-900">Add Mobile</h2>

            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="hide-arrows"
            />
            <Input
              type="number"
              placeholder="Labeled Price"
              value={formData.labeledprice}
              onChange={(e) =>
                setFormData({ ...formData, labeledprice: e.target.value })
              }
              className="hide-arrows"
            />
            <Input
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className="hide-arrows"
            />

            {/* Image Upload Section */}
            <div className="space-y-2">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const newImages = [...formData.images];
                    if (newImages.length < 8) {
                      newImages.push(e.target.files[0]);
                      setFormData({ ...formData, images: newImages });
                    }
                    e.target.value = "";
                  }
                }}
              />

              <div className="grid grid-cols-4 gap-2 mt-2">
                {Array.from({ length: 8 }).map((_, idx) => {
                  const img = formData.images[idx];

                  return (
                    <div
                      key={idx}
                      className="w-20 h-20 flex items-center justify-center border rounded bg-gray-50 text-gray-400 text-sm cursor-pointer relative"
                      onClick={() => {
                        if (!img) document.getElementById("image-upload")?.click();
                      }}
                    >
                      {img ? (
                        <>
                          <img
                            src={typeof img === "string" ? img : URL.createObjectURL(img)}
                            alt={`preview-${idx}`}
                            className="w-full h-full object-cover rounded"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newImages = formData.images.filter((_, i) => i !== idx);
                              setFormData({ ...formData, images: newImages });
                            }}
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <span>+</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>


            {/* Modal Actions */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct} disabled={isLoading}>
                {isLoading ? "Uploading..." : "Add"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <UpdateProductModal
            product={editingProduct}
            token={token}
            onClose={() => setEditingProduct(null)}
            onUpdated={fetchProducts}
          />
        </div>
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage} />
    </div>
  );
};

export default Mobiles;
