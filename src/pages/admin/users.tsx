import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/inputs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Eye, Edit, Trash2, UserPlus } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import PulseLoader from "@/components/loading";
import AdminRegister from "@/components/admin/adminregister";
import Pagination from "@/components/ui/paginator";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const limit = 8;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");

  const Fetchusers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${page}/${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };
  useEffect(() => {
    setLoading(true);
    Fetchusers();
    console.log(users)
  }, [page]);

  const filtereUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const blocked = async (userid: string, status: boolean) => {
    try {
      // update local state
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userid ? { ...u, isBlocked: !status } : u
        )
      );


      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userid}`,
        { isBlocked: !status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      toast.error("Error blocking user");

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userid ? { ...u, isBlocked: status } : u
        )
      );
    }
  };

  const Verified = async (userid: string, isEmailverifyed: boolean) => {
    try {
      // update local state instantly
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userid ? { ...u, isEmailverifyed: !isEmailverifyed } : u
        )
      );

      // send request to backend
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userid}`,
        { isEmailverifyed: !isEmailverifyed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User verified successfully");
    } catch (err) {
      toast.error("Error verifying user");
      // revert state if request failed
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userid ? { ...u, isEmailverifyed } : u
        )
      );
    }
  };

  const Delete = async (userid: string) => {
    try {
      setLoading(true);
      axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userid}`, {
        headers: { Authorization: `Bearer ${token}` }
      }
      );
      Fetchusers();
      toast.success("User deleted successfully");
      setLoading(false);
    } catch (err) {
      toast.error("Error deleting user");
    }
  }
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button variant="cart" onClick={() => setShowAdminForm(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Admins
        </Button>
      </div>

      {loading ? (
        <PulseLoader />
      ) : (
        <Card className="shop-card border-0">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>All Users</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 relative">
              {/* Users List */}
              {filtereUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-foreground">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2 gap-2 items-center">
                      <span
                        className={`text-center font-medium cursor-pointer ${user.isBlocked ? "text-red-500" : "text-green-500"
                          }`}
                        onClick={() => blocked(user._id, user.isBlocked)}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>

                      <span
                        className={`text-center font-medium cursor-pointer ${user.isEmailverifyed
                          ? "text-yellow-400"
                          : "text-blue-400"
                          }`}
                        onClick={() =>
                          Verified(user._id, user.isEmailverifyed)
                        }
                      >
                        {user.isEmailverifyed ? "Unverified" : "Verified"}
                      </span>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => Delete(user._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal must be OUTSIDE Card */}
      {showAdminForm && (
        <AdminRegister
          onClose={() => setShowAdminForm(false)}
          fetchusers={Fetchusers}
        />


      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage} />
    </div>

  );
};

export default Users;