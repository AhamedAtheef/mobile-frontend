import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Users, 
  Award, 
  Globe, 
  Shield, 
  Zap, 
  Heart,
  ArrowRight,
  Star,
  CheckCircle
} from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, number: "50,000+", label: "Happy Customers" },
    { icon: Smartphone, number: "10,000+", label: "Products Sold" },
    { icon: Award, number: "5+", label: "Years Experience" },
    { icon: Globe, number: "25+", label: "Countries Served" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous quality checks to ensure you receive only authentic, premium devices."
    },
    {
      icon: Zap,
      title: "Fast Service",
      description: "Lightning-fast shipping and responsive customer support to get your device to you quickly."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority. We go above and beyond to ensure a perfect shopping experience."
    },
    {
      icon: Star,
      title: "Best Prices",
      description: "Competitive pricing and exclusive deals to give you the best value for your money."
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/api/placeholder/150/150",
      bio: "Passionate about technology and customer service with 10+ years in mobile retail."
    },
    {
      name: "Mike Chen",
      role: "Head of Operations",
      image: "/api/placeholder/150/150",
      bio: "Ensures smooth operations and quality control across all our processes."
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Success Manager",
      image: "/api/placeholder/150/150",
      bio: "Dedicated to providing exceptional customer experiences and support."
    },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Started as a small mobile phone retailer with a vision to make premium devices accessible."
    },
    {
      year: "2020",
      title: "Online Expansion",
      description: "Launched our e-commerce platform, reaching customers nationwide."
    },
    {
      year: "2021",
      title: "50,000 Customers",
      description: "Reached our first major milestone of serving 50,000 happy customers."
    },
    {
      year: "2023",
      title: "International Launch",
      description: "Expanded operations to serve customers in 25+ countries worldwide."
    },
    {
      year: "2024",
      title: "Innovation Hub",
      description: "Opened our technology center to better serve customer needs and expand our product range."
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-primary/10 text-[15px] lg:text-[20px] text-[#25e425] hover:bg-primary/20">
              About Super Cell City
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Connecting You to the 
              <span className="bg-[linear-gradient(to_right,#8de21f,#25e425)] bg-clip-text text-transparent"> Future</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're more than just a mobile phone retailer. We're your trusted partner in staying connected 
              with the latest technology, offering premium devices at unbeatable prices with exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="shop-card text-center border-0">
                <CardContent className="pt-8">
                  <div className="bg-green-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{stat.number}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Founded in 2019, Super Cell City began with a simple mission: to make the latest mobile technology 
              accessible to everyone. What started as a small retail operation has grown into a trusted global 
              platform serving customers in over 25 countries.
            </p>
            <p className="text-lg text-muted-foreground">
              We believe that technology should enhance lives, not complicate them. That's why we carefully 
              curate every product in our catalog, ensuring quality, authenticity, and value. Our team of 
              mobile technology experts works tirelessly to bring you the best devices at competitive prices.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What We Stand For</h2>
            <p className="text-lg text-muted-foreground">The values that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="shop-card border-0 text-center h-full">
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-[#10d68ae0]" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">Key milestones in our growth story</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="bg-[#10d68ae0] p-3 rounded-full flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <Badge variant="secondary">{milestone.year}</Badge>
                      <h3 className="text-xl font-semibold text-foreground">{milestone.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">The passionate people behind Super Cell City</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="shop-card border-0 text-center">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-green-400 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Experience the Difference?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied customers who trust Super Cell City for their mobile needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="cart" className="text-lg px-8 bg-green-400">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;