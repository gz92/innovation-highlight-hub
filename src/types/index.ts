
export interface Company {
  name: string;
  characteristics: string;
  pain_points: string;
  apollo_filter: string;
  relevance_indicators: string;
  company_research_focus: string;
}

export interface InnovationOutput {
  persona_companies: Company[];
}

export interface InnovationData {
  Innovation: string;
  output: InnovationOutput;
}
