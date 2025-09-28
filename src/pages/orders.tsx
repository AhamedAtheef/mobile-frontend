import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/login")
    toast.error("please login first");
  }

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${page}/${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data.orders);
      console.log(res.data.orders);
      setTotalPages(res.data.totalpage);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleDelete = async (orderId: string) => {
    try {
      setLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order deleted successfully");
      await fetchOrders(); 
    } catch (err) {
      console.error("Error deleting order", err);
      toast.error("Error deleting order");
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading orders...</p>;
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

  return (
    <div className="w-full h-full">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:px-[10%] xl:py-[2%] gap-6">

        {orders.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No orders found
          </p>
        ) : (
          orders.map((order) => (
            <Card key={order._id} className="shadow-lg rounded-2xl ">
              <CardContent className="p-4 space-y-3">
                <h2 className="font-bold text-lg">Order ID:- {order.orderId}</h2>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={
                      order.status === "pending"
                        ? "text-yellow-500"
                        : order.status === "shipped"
                          ? "text-blue-500"
                          : order.status === "completed"
                            ? "text-green-600"
                            : "text-red-500"
                    }
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-medium">Total:</span> Rs.{order.totalPrice}
                </p>

                <div className="space-y-2">
                  <p className="font-medium">Products:</p>
                  {order.products.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={p.productimage}
                        alt="product"
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm">ID: {p.productId}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {p.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {order.status === "pending" && (
                  <Button className="w-full bg-green-500 text-white hover:bg-red-600"
                    onClick={() => handleDelete(order.orderId)}>
                    Cancel Order
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`mx-2 ${page === index + 1 ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
