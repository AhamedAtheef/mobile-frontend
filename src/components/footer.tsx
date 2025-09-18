import { Link } from "react-router-dom";
import { Smartphone, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-500 p-2 rounded-lg">
                <Smartphone className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-foreground logotext">Super Cell City</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted destination for the latest mobile phones and accessories. 
              Quality products, competitive prices, exceptional service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-green-300 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-green-300 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-green-300 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/mobiles" className="block text-sm text-muted-foreground hover:text-[#8de21f] transition-colors">
                All Mobiles
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-[#8de21f] transition-colors">
                About Us
              </Link>
              <Link to="/orders" className="block text-sm text-muted-foreground hover:text-[#8de21f] transition-colors">
                Track Order
              </Link>
              <Link to="/cart" className="block text-sm text-muted-foreground hover:text-[#8de21f] transition-colors">
                Shopping Cart
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Categories</h3>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground hover:text-[#8de21f] cursor-pointer transition-colors">
                Smartphones
              </div>
              <div className="text-sm text-muted-foreground hover:text-[#8de21f]  cursor-pointer transition-colors">
                Accessories
              </div>
              <div className="text-sm text-muted-foreground hover:text-[#8de21f]  cursor-pointer transition-colors">
                Cases & Covers
              </div>
              <div className="text-sm text-muted-foreground hover:text-[#8de21f]  cursor-pointer transition-colors">
                Chargers
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-sm text-muted-foreground">support@supercellcity.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-sm text-muted-foreground">123 Tech Street, Digital City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Super Cell City. All rights reserved. Built with passion for mobile technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;