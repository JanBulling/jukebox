export function randomInteger(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Picks the random item based on its weight.
 * The items with higher weight will be picked more often (with a higher probability).
 *
 * For example:
 * - items = ['banana', 'orange', 'apple']
 * - weights = [0, 0.2, 0.8]
 * - weightedRandom(items, weights) in 80% of cases will return 'apple', in 20% of cases will return
 * 'orange' and it will never return 'banana' (because probability of picking the banana is 0%)
 *
 * @param {any[]} items
 * @param {number[]} weights
 * @returns {{item: any, index: number}}
 */
export function weightedRandom(items: any, weights: number[]) {
  const cumulativeWeights: number[] = [];

  // weights = [1, 4, 3]
  // cumulativeWeights = [1, 5, 8]
  for (let i = 0; i < weights.length; i++) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  // weights = [1, 4, 3]
  // maxCumulativeWeight = 8
  // range for the random number is [0...8]
  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = maxCumulativeWeight * Math.random();

  // Picking the random item based on its weight.
  // The items with higher weight will be picked more often.
  for (let i = 0; i < items.length; i++) {
    if (cumulativeWeights[i] >= randomNumber) {
      return {
        item: items[i],
        index: i,
      };
    }
  }
}

export function weightedIndex(weights: number[]) {
  if (weights.length === 1) return 0;

  const cumulativeWeights: number[] = [];
  for (let i = 0; i < weights.length; i++) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = maxCumulativeWeight * Math.random();
  for (let i = 0; i < weights.length; i++) {
    if (cumulativeWeights[i] >= randomNumber) {
      return i;
    }
  }

  return 0;
}
