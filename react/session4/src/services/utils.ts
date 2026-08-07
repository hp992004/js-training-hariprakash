
export function formatName(name: string): string {
  return name.trim();
}

export function calculateAverage(scores: number[]): number {
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function isValidScore(score: number): boolean {
  return score >= 0 && score <= 100;
}

const DEFAULT_SCORE = 0;

/*
formatName: Yes. This utility may be used by other modules, so it should remain exported.

calculateAverage: Yes. This function is reusable outside services, so it should remain exported.

isValidScore: No. It's an internal helper used only within this module, so it should not be exported.

DEFAULT_SCORE: No. This is an internal constant and should not be exported.
*/