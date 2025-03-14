
export const getScoreColor = (score: number) => {
  if (score >= 8) return "text-green-500";
  if (score >= 6) return "text-amber-500";
  return "text-red-500";
};

export const getScoreBackgroundColor = (score: number) => {
  if (score >= 8) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  if (score >= 6) return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
  return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
};
