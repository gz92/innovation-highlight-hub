
import { Building2 } from "lucide-react";
import { InnovationData } from "../../types";
import CompanyCard from "../CompanyCard";

interface IndustryPartnersProps {
  data: InnovationData;
}

export const IndustryPartners = ({ data }: IndustryPartnersProps) => {
  if (!data.output.persona_companies || data.output.persona_companies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Building2 className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Potential Industry Partner Personas</h2>
      </div>

      <div className="space-y-6">
        {data.output.persona_companies.map((company, index) => (
          <CompanyCard key={index} company={company} index={index} />
        ))}
      </div>
    </div>
  );
};
