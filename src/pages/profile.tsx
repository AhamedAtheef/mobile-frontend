import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/inputs";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Settings, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const navigate = useNavigate();

  //  Fetch profile
  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data.user);
      setFormData({
        name: res.data.user.name || "",
        email: res.data.user.email || "",
        mobile: res.data.user.mobile || "",
      });

      toast.success(res.data.message);
    } catch (error: any) {
      console.error("Profile fetch error:", error);
      toast.error("Error fetching user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  //  Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Update user
  const updateUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      getUser();
      setIsEditing(false);
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete user
  const deleteUser = async () => {
    try {
      const confirmed = window.confirm("⚠️ Are you sure you want to delete your account? This action cannot be undone.");
      if (!confirmed) return;

      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error: any) {
      console.error("Delete user error:", error);
      toast.error("Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (blocked: boolean) =>
    blocked ? (
      <Badge className="bg-red-500/10 text-red-600">Blocked</Badge>
    ) : (
      <Badge className="bg-green-500/10 text-green-600">Active</Badge>
    );

  const getVerifyBadge = (verified: boolean) =>
    verified ? (
      <Badge className="bg-blue-500/10 text-blue-600">Email Verified</Badge>
    ) : (
      <Badge className="bg-gray-400/10 text-gray-500">Not Verified</Badge>
    );

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">No user data found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shop-card border-0">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={user.image || "/api/placeholder/80/80"}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground">
                      {user.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.email}
                    </p>
                    <div className="flex justify-center gap-2 mt-2">
                      {getStatusBadge(user.isBlocked)}
                      {getVerifyBadge(user.isEmailverifyed)}
                    </div>
                    <Badge variant="secondary" className="mt-2">
                      Member since{" "}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Account Tab */}
              <TabsContent value="account" className="mt-6">
                <Card className="shop-card border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                          Update your account details
                        </CardDescription>
                      </div>
                      <Button
                        className="hidden md:block"
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" defaultValue={user.role} disabled />
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex justify-end space-x-4">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-green-500 hover:bg-green-600 text-white"
                          variant="cart"
                          onClick={updateUser}
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                    {/*  Delete button */}
                    <div className="flex justify-between md:justify-end mt-6">
                      <Button
                        className="md:hidden"
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                      <Button
                        className="bg-red-600 hover:bg-red-700  text-[15px] text-white font-bold"
                        onClick={deleteUser}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="mt-6">
                <Card className="shop-card border-0">
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                    <CardDescription>
                      Items you've saved for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No wishlist items yet.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-6">
                <Card className="shop-card border-0">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          Change Password
                        </p>
                        <p className="text-sm hidden md:block text-muted-foreground">
                          Update your password regularly
                        </p>
                      </div>
                      <Link to={"/reset-password"} className="text-blue-green border-2 border-green-500 px-5 py-1 ml-2 rounded-lg" >Change</Link>

                    </div>
                    <div className="flex items-center  w-full ">
                      <Link to="/login" onClick={() => localStorage.removeItem("token")} className="md:hidden border-2 border-red-500 px-5 w-full rounded-lg">
                        <Button variant="ghost" size="sm" className="flex justify-between text-center">
                          <LogOut className="h-4 w-4 mr-10 text-[18px] " />
                          Logout
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
