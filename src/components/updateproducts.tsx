import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputs";
import { uploadFile } from "@/utils/imageupload";
import { deleteImages } from "@/utils/deleteimages"; // supabase delete util
import axios from "axios";
import toast from "react-hot-toast";

interface UpdateProductModalProps {
  product: any; // product object
  token: string;
  onClose: () => void;
  onUpdated: () => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  product,
  token,
  onClose,
  onUpdated,
}) => {
  const [formData, setFormData] = useState({
    title: product.title || "",
    description: product.description || "",
    price: product.price || "",
    labeledprice: product.labeledprice || "",
    category: product.category || "",
    stock: product.stock || "",
    //  ensure images is always an array
    existingImages: Array.isArray(product.image)
      ? product.image
      : product.image
        ? [product.image]
        : [],
    newImages: [] as File[], // new uploads
  });

  const [loading, setLoading] = useState(false);

  //  remove an existing Supabase image
  const removeExistingImage = async (idx: number) => {
    try {
      const imgUrl = formData.existingImages[idx];
      if (!imgUrl) return;

      // delete from Supabase bucket
      await deleteImages([imgUrl]);

      // remove from state
      const updated = [...formData.existingImages];
      updated.splice(idx, 1);
      setFormData({ ...formData, existingImages: updated });

      toast.success("Image deleted");
    } catch (err) {
      console.error("Failed to delete image:", err);
      toast.error("Failed to delete image");
    }
  };

  // remove a newly uploaded (local) image
  const removeNewImage = (idx: number) => {
    const updated = [...formData.newImages];
    updated.splice(idx, 1);
    setFormData({ ...formData, newImages: updated });
  };

  //  handle update
  const handleUpdate = async () => {
    try {
      setLoading(true);

      // upload new images to Supabase
      let uploadedUrls: string[] = [];
      if (formData.newImages.length > 0) {
        const uploadPromises = formData.newImages.map((img) => uploadFile(img));
        uploadedUrls = await Promise.all(uploadPromises);
      }

      // combine existing + new
      const finalImages = [...formData.existingImages, ...uploadedUrls];

      const productData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        labeledprice: formData.labeledprice,
        category: formData.category,
        stock: formData.stock,
        image: finalImages, //  send as array
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${product.productid}`,
        productData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Product updated successfully");
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Error updating product", err);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 space-y-4">
        <h2 className="text-xl font-bold text-green-900">Update Product</h2>

        <Input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          className="hide-arrows"
        />

        {/* Image Upload Grid (8 slots) */}
        <div className="space-y-2">
          <input
            id="update-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const newImgs = [...formData.newImages];
                if (formData.existingImages.length + newImgs.length < 8) {
                  newImgs.push(e.target.files[0]);
                  setFormData({ ...formData, newImages: newImgs });
                }
                e.target.value = "";
              }
            }}
          />

          <div className="grid grid-cols-4 gap-2 mt-2">
            {Array.from({ length: 8 }).map((_, idx) => {
              const existingImg = formData.existingImages[idx];
              const newImg =
                formData.newImages[idx - formData.existingImages.length];

              return (
                <div
                  key={idx}
                  className="w-20 h-20 flex items-center justify-center border rounded bg-gray-50 text-gray-400 text-sm cursor-pointer relative"
                  onClick={() => {
                    if (!existingImg && !newImg) {
                      document.getElementById("update-image-upload")?.click();
                    }
                  }}
                >
                  {existingImg ? (
                    <>
                      <img
                        src={existingImg}
                        alt={`existing-${idx}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeExistingImage(idx);
                        }}
                      >
                        ×
                      </button>
                    </>
                  ) : newImg ? (
                    <>
                      <img
                        src={URL.createObjectURL(newImg)}
                        alt={`new-${idx}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNewImage(idx - formData.existingImages.length);
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

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
