
import { EvaluationResult } from "../types";

export const calculateAverageScores = (evaluationResults: EvaluationResult[] | undefined) => {
  if (!evaluationResults || evaluationResults.length === 0) {
    return null;
  }
  
  const totals = {
    uniqueness: 0,
    painPoint: 0,
    features: 0,
    marketFit: 0,
    value: 0,
    barriers: 0,
    finalScore: 0
  };
  
  evaluationResults.forEach(evaluation => {
    totals.uniqueness += evaluation.uniqueness_score;
    totals.painPoint += evaluation.pain_point_effectiveness;
    totals.features += evaluation.feature_superiority;
    totals.marketFit += evaluation.market_fit;
    totals.value += evaluation.perceived_value;
    totals.barriers += evaluation.barrier_to_entry;
    totals.finalScore += evaluation.final_score;
  });
  
  const count = evaluationResults.length;
  
  return {
    uniqueness: +(totals.uniqueness / count).toFixed(1),
    painPoint: +(totals.painPoint / count).toFixed(1),
    features: +(totals.features / count).toFixed(1),
    marketFit: +(totals.marketFit / count).toFixed(1),
    value: +(totals.value / count).toFixed(1),
    barriers: +(totals.barriers / count).toFixed(1),
    finalScore: +(totals.finalScore / count).toFixed(1)
  };
};
