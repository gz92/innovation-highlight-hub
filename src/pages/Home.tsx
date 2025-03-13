import { ArrowRightIcon, BeakerIcon, RocketIcon, BarChart3Icon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen w-full">
      <main className="w-full max-w-7xl mx-auto px-6 py-16 pb-24 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Advancing Research,<br />Enabling Market Success
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connecting Innovators with Strategic Partners & Investors
          </p>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At HUN-REN, we support researchers in transforming scientific discoveries into market-ready innovations. 
            Our mission is to bridge the gap between research and commercialization by providing the necessary expertise, 
            strategic partnerships, and access to investment.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/projects">
                Browse Innovations <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/submit">
                Submit Your Innovation <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              From Research to Market: Our Process
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              A structured approach to transform your research into successful commercial innovations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Research Support */}
            <div className="border border-border/40 rounded-xl p-6 bg-card subtle-shadow hover-scale transition-all">
              <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <BeakerIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Research Support</h3>
              <p className="text-muted-foreground mb-5">
                We assist researchers in assessing the commercial potential of their innovations and laying the groundwork for successful market entry:
              </p>
              <ul className="space-y-2">
                {["Innovation research and validation", "Market-driven commercialization strategy", "Science communication and outreach"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Incubation & Development */}
            <div className="border border-border/40 rounded-xl p-6 bg-card subtle-shadow hover-scale transition-all">
              <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <BarChart3Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Incubation & Development</h3>
              <p className="text-muted-foreground mb-5">
                We help refine innovations and align them with market demands:
              </p>
              <ul className="space-y-2">
                {["Product development and positioning", "Competitive landscape analysis", "Development of initial marketing and outreach materials"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Market Entry & Growth */}
            <div className="border border-border/40 rounded-xl p-6 bg-card subtle-shadow hover-scale transition-all">
              <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <RocketIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Market Entry & Growth</h3>
              <p className="text-muted-foreground mb-5">
                We facilitate connections with key stakeholders to accelerate commercialization:
              </p>
              <ul className="space-y-2">
                {["Identifying and engaging potential industry partners", "Strategic business outreach and engagement", "Investor relations and funding opportunities"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        
        {/* Why Collaborate Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Why Collaborate with HUN-REN?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-secondary/50">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary text-2xl">🔹</span>
                Expertise in Research Commercialization
              </p>
              <p className="text-muted-foreground">
                We provide structured guidance to navigate the transition from research to industry.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-secondary/50">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary text-2xl">🔹</span>
                Access to a Strategic Network
              </p>
              <p className="text-muted-foreground">
                We connect researchers with corporate partners, investors, and funding bodies.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-secondary/50">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary text-2xl">🔹</span>
                Tailored Support
              </p>
              <p className="text-muted-foreground">
                We offer personalized strategies to maximize the impact and market potential of each innovation.
              </p>
            </div>
          </div>
          
          <div className="text-center pt-6">
            <Button asChild size="lg">
              <Link to="/submit">
                Submit Your Innovation
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="w-full py-8 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>HUN-REN Innovation Hub © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
