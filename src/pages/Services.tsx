
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BeakerIcon, Users, Search, BarChart3Icon, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Services() {
  const services = [
    {
      title: "Value Proposition Refinement",
      description: [
        "Clarify your core message by distilling the benefits and uniqueness of your solution.",
        "Align product features with real-world user needs to stand out in competitive landscapes."
      ],
      icon: <BeakerIcon className="h-10 w-10 text-primary" />
    },
    {
      title: "Persona Development",
      description: [
        "Identify key stakeholders and decision-makers most likely to adopt or benefit from your innovation.",
        "Build rich, data-driven personas to guide product design and marketing strategies."
      ],
      icon: <Users className="h-10 w-10 text-primary" />
    },
    {
      title: "Prospect Screening",
      description: [
        "Evaluate potential markets and organizations that match your technology or solution.",
        "Use a structured methodology to prioritize leads, ensuring efficient outreach to the best-fit prospects."
      ],
      icon: <Search className="h-10 w-10 text-primary" />
    },
    {
      title: "Competition Analysis",
      description: [
        "Research existing and emerging players relevant to your innovation area.",
        "Gain insights into market gaps, pricing models, and product differentiators to position yourself effectively."
      ],
      icon: <BarChart3Icon className="h-10 w-10 text-primary" />
    },
    {
      title: "First Website Draft",
      description: [
        "Create an initial online presence tailored to showcase your innovation's strengths.",
        "Communicate your value proposition clearly and consistently to generate interest from potential collaborators, customers, and investors."
      ],
      icon: <Globe className="h-10 w-10 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="container py-16">
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Services for Innovation Researchers
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At Innovation Highlight Hub, we help researchers transform early-stage ideas into practical, market-ready innovations. 
            Our team provides expert guidance at each step of the innovation process—whether you're refining a single concept or 
            shaping the strategic roadmap for your entire project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="h-full border border-border/40 bg-card subtle-shadow hover-scale transition-all overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-primary/10 group-hover:bg-primary/20 transition-colors"></div>
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <div className="mr-4 mt-1 rounded-full p-2 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mt-2">
                  {service.description.map((point, i) => (
                    <li key={i} className="text-muted-foreground flex items-start">
                      <span className="text-primary mr-2 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to action section */}
        <div className="mt-16 py-10 px-8 rounded-xl bg-secondary/50 border border-border/40 text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to Transform Your Innovation?</h2>
          <div className="mt-4">
            <Button asChild>
              <Link to="/submit">
                Submit Your Innovation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
