import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Smartphone, Menu, X, ShoppingCart, User, Search } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const cartItemsCount = 3; // This would come from a cart context in a real app

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Mobiles", href: "/mobiles" },
    { name: "About", href: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-transparent sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-1 xl:px-4 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex md:items-center ">
            <img src="/logo.png" alt="" className="w-[180px] md:w-[220px] lg:w-[230px] xl:w-[260px] mt-[5px]" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex border-2 rounded-full px-[20px] lg:px-[25px] lg:mr-[3.5rem] xl:px-[30px] py-[5px] items-center space-x-8 xl:space-x-10 backdrop-blur-md">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-xl font-medium transition-colors ${isActive(item.href) ? "text-[#6de280]" : "text-white"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-green-300">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border mt-4 text-center pt-4 pb-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block text-[18px] font-medium transition-colors hover:text-green-400 ${isActive(item.href) ? "text-green-400" : "text-white"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-around space-x-4 pt-4 border-t border-border">
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {cartItemsCount > 0 && (
                    <Badge className=" h-5 w-5 flex items-center justify-center text-xs bg-green-300">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;