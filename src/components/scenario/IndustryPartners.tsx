
import { User2 } from "lucide-react";
import { InnovationData } from "../../types";
import CompanyCard from "../CompanyCard";

interface IndustryPartnersProps {
  data: InnovationData;
}

export const IndustryPartners = ({ data }: IndustryPartnersProps) => {
  // Check for valid output and persona_companies
  if (!data.output || !data.output.persona_companies) {
    return null;
  }
  
  const companies = data.output.persona_companies;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <User2 className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Industry Target Companies</h2>
      </div>

      <div className="space-y-4">
        {companies.map((company, index) => (
          <CompanyCard key={index} company={company} />
        ))}
      </div>
    </div>
  );
};
