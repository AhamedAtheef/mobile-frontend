import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/inputs";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Package } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Pagination from "@/components/ui/paginator";
import PulseLoader from "@/components/loading";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewOrder, setViewOrder] = useState<any | null>(null);
  const [openView, setopenView] = useState(false);
  const limit = 8;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${page}/${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders);
      console.log(res.data.orders);
      setTotalPages(res.data.totalpage);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const filtereOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
      toast.success(res.data.message);
      setLoading(false);
    } catch (err) {
      console.error("Error updating order status", err);
      toast.error("Error updating order status");
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return { label: "Completed", color: "bg-success/10 text-success/100 hover:bg-black cursor-pointer" };
      case "processing":
        return { label: "Processing", color: "bg-warning/10 text-warning hover:bg-black cursor-pointer" };
      default:
        return { label: status, color: "bg-muted text-muted-foreground hover:bg-black cursor-pointer" };
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders Management</h1>
      </div>
       {loading ? <PulseLoader/> :
      <Card className="shop-card border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Orders</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 relative">
            {filtereOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              return (
                <div
                  key={order.orderId}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-foreground">{order.orderId}</h3>
                    <p className="text-sm text-muted-foreground">{order.name}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                    <span className="price-text font-medium text-green-300">Rs.{order.totalPrice}</span>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setViewOrder(order);
                          setopenView(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Package className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {openView && viewOrder && (
              <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
                <div className="relative bg-black p-6 ml-[5%] rounded-xl shadow-lg w-full max-w-lg">
                  {/* Close button */}
                  <button
                    onClick={() => setopenView(false)}
                    className="absolute top-1 right-3 text-yellow-100 hover:text-white"
                  >
                    ✕
                  </button>

                  <h2 className="text-xl text-center font-bold mb-5 tracking-wider text-white">
                    Order Details
                  </h2>

                  <div className="space-y-2 text-[16px] text-white">
                    <p>
                      <span className="font-medium text-yellow-300 text-[18px]">Order ID:</span>{" "}
                      {viewOrder.orderId}
                    </p>

                    {/* Status dropdown */}
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-yellow-300 text-[18px]">Status:</span>
                      <select
                        value={viewOrder.status}
                        onChange={(e) =>
                          setViewOrder({ ...viewOrder, status: e.target.value })
                        }
                        className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-[15px]"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <p>
                      <span className="font-medium text-yellow-300 text-[18px]">Created At:</span>{" "}
                      {new Date(viewOrder.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium text-yellow-300 text-[18px]">Updated At:</span>{" "}
                      {new Date(viewOrder.updatedAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium text-yellow-300 text-[18px]">Email:</span>{" "}
                      {viewOrder.email}
                    </p>
                    <p>
                      <span className="font-medium text-yellow-300 text-[18px]">Phone:</span>{" "}
                      {viewOrder.phone}
                    </p>

                    {/* Address */}
                    {viewOrder.address && (
                      <div>
                        <span className="font-medium text-yellow-300 text-[18px]">Address:</span>
                        <p className="ml-4 text-[16px] text-gray-300">
                          {viewOrder.address.street}, {viewOrder.address.city},{" "}
                          {viewOrder.address.postalCode}, {viewOrder.address.country}
                        </p>
                      </div>
                    )}

                    {/* Total */}
                    <p className="font-medium text-lg mt-2 text-green-400">
                      Total: Rs.{viewOrder.totalPrice}
                    </p>
                  </div>

                  {/* Products */}
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 text-white">Products:</h3>
                    <ul className="space-y-2">
                      {viewOrder.products.map((p, index) => (
                        <li
                          key={p._id || index}
                          className="flex items-center space-x-3 text-white"
                        >
                          {/* Product image if available */}
                          {p.image ? (
                            <img
                              src={p.image[0]}
                              alt={p.productId}
                              className="w-12 h-12 rounded-md border"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-md border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                              No Img
                            </div>
                          )}
                          <div>
                            <p className="text-[16px] font-medium">
                              <span className="text-yellow-300 tracking-wide">productId:- </span> {p.name || p.productId}
                            </p>
                            <p className="text-sm text-gray-400">Qty: {p.quantity}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Update button */}
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => { updateOrderStatus(viewOrder.orderId, viewOrder.status); setopenView(false); }}
                      className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </CardContent>
      </Card>
      }
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage} />
        
    </div>
  );
};

export default Orders;
