
import { User2 } from "lucide-react";
import { InnovationData } from "../../types";
import CompanyCard from "../CompanyCard";

interface IndustryPartnersProps {
  data: InnovationData;
}

export const IndustryPartners = ({ data }: IndustryPartnersProps) => {
  // Debug logging
  console.log("IndustryPartners - received data:", data);
  console.log("IndustryPartners - persona_companies:", data?.output?.persona_companies);
  
  // Check for valid output and persona_companies
  if (!data || !data.output || !data.output.persona_companies) {
    console.log("IndustryPartners - no valid persona_companies data");
    return null;
  }
  
  const companies = data.output.persona_companies;
  console.log("IndustryPartners - companies length:", companies.length);
  
  // If there are no companies, don't render this component
  if (companies.length === 0) {
    console.log("IndustryPartners - no companies available");
    return null;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <User2 className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Potential Partner Personas</h2>
      </div>

      <div className="space-y-4">
        {companies.map((company, index) => (
          <CompanyCard key={index} company={company} index={index} />
        ))}
      </div>
    </div>
  );
};
