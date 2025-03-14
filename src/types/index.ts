
export interface Company {
  name: string;
  characteristics: string;
  pain_points: string;
  apollo_filter: string;
  relevance_indicators: string;
  company_research_focus: string;
}

export interface Competitor {
  name: string;
  website: string;
  brief_value_proposition: string;
  market_positioning: {
    market_share: string;
    total_revenue: string;
    funding_status: string;
    patents: number;
    key_innovations: string[];
  };
  comparison_vs_our_value_prop: {
    competitor_strengths: string[];
    gaps_in_their_offering: string[];
  };
  relevance_explanation: string;
}

export interface EvaluationResult {
  value_proposition: string;
  uniqueness_score: number;
  pain_point_effectiveness: number;
  feature_superiority: number;
  market_fit: number;
  perceived_value: number;
  barrier_to_entry: number;
  final_score: number;
  status: string;
  recommendations: string[];
}

export interface InnovationOutput {
  persona_companies: Company[];
  competitors?: Competitor[];
  evaluation_results?: EvaluationResult[];
}

export interface InnovationData {
  // Support both old and new formats
  Innovation?: string;
  Original_wording?: string;
  Marketing_version?: string;
  "Original wording"?: string;
  "Marketing version"?: string;
  "Concise description"?: string;
  PropID?: string;
  output: InnovationOutput;
}
