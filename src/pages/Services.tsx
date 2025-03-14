
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Value Proposition Refinement",
      description: [
        "Clarify your core message by distilling the benefits and uniqueness of your solution.",
        "Align product features with real-world user needs to stand out in competitive landscapes."
      ]
    },
    {
      title: "Persona Development",
      description: [
        "Identify key stakeholders and decision-makers most likely to adopt or benefit from your innovation.",
        "Build rich, data-driven personas to guide product design and marketing strategies."
      ]
    },
    {
      title: "Prospect Screening",
      description: [
        "Evaluate potential markets and organizations that match your technology or solution.",
        "Use a structured methodology to prioritize leads, ensuring efficient outreach to the best-fit prospects."
      ]
    },
    {
      title: "Competition Analysis",
      description: [
        "Research existing and emerging players relevant to your innovation area.",
        "Gain insights into market gaps, pricing models, and product differentiators to position yourself effectively."
      ]
    },
    {
      title: "First Website Draft",
      description: [
        "Create an initial online presence tailored to showcase your innovation's strengths.",
        "Communicate your value proposition clearly and consistently to generate interest from potential collaborators, customers, and investors."
      ]
    }
  ];

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
          Services for Innovation Researchers
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          At Innovation Highlight Hub, we help researchers transform early-stage ideas into practical, market-ready innovations. 
          Our team provides expert guidance at each step of the innovation process—whether you're refining a single concept or 
          shaping the strategic roadmap for your entire project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="h-full border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                {service.title}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Connect with us to learn more about our {service.title.toLowerCase()} service</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {service.description.map((point, i) => (
                  <li key={i} className="text-muted-foreground">{point}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
