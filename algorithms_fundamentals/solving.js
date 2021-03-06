/* Example 1: Knapsack Problem solution */

function knapsackFn(items, cap, itemIndex, memo) {
  if (memo[cap][itemIndex]) {
    return memo[cap][itemIndex];
  }
  if (cap === 0 || itemIndex < 0) {
    return { items: [], value: 0, weight: 0 };
  }
  if (cap < items[itemIndex].weight) {
    return knapsackFn(items, cap, itemIndex - 1, memo);
  }
  const sackWithItem = knapsackFn(
    items,
    cap - items[itemIndex].weight,
    itemIndex - 1,
    memo
  );
  const sackWithoutItem = knapsackFn(items, cap, itemIndex - 1, memo);

  const valueWithItem = sackWithItem.value + items[itemIndex].value;
  const valueWithoutItem = sackWithoutItem.value;

  let resultSack;

  if (valueWithItem > valueWithoutItem) {
    const updatedSack = {
      items: sackWithItem.items.concat(items[itemIndex]),
      value: sackWithItem.value + items[itemIndex].value,
      weight: sackWithItem.weight + items[itemIndex].weight,
    };
    resultSack = updatedSack;
  } else {
    resultSack = sackWithoutItem;
  }

  memo[cap][itemIndex] = resultSack;

  return resultSack;
}

function knapsack(items, cap, index) {
  const mem = Array.from(Array(cap + 1), () =>
    Array(items.length).fill(undefined)
  );
  return knapsackFn(items, cap, index, mem);
}

const items = [
  { name: 'a', value: 3, weight: 3 },
  { name: 'b', value: 6, weight: 8 },
  { name: 'c', value: 10, weight: 3 },
  { name: 'd', value: 2, weight: 2 },
];
const maxCap = 8;

const sack = knapsack(items, maxCap, items.length - 1);
console.log(sack);

// Time Complexity (without memoization): O(2^n)
// Time Complexity (with memoization): O(n*C)

/* Example 2: Knapsack Problem with 'greedy' approach */

function knapsack(elements, capacity) {
  const sack = { items: [], value: 0, weight: 0 }
  const remainingCapacity = capacity;

  for (const el of elements) {
    if (el.weight <= remainingCapacity) {
      sack.items.push(el);
      sack.value += el.value;
      sack.weight += el.weight;
      remainingCapacity -= el.weight;
    }
  }

  return sack;
}

const items = [
  { name: 'a', value: 3, weight: 3 },
  { name: 'b', value: 6, weight: 8 },
  { name: 'c', value: 10, weight: 3 }
];
const maxCap = 8;

const sack = knapsack(items, maxCap);
console.log(sack);


/* Example 4: Greedy change making algorithm */

function computeChange(coins, amount) {
  let remainingAmount = amount;

  const calculatedChange = {
    selectedCoins: {},
    numberOfCoins: 0,
  };

  for (const coin of coins) {
    const count = Math.floor(remainingAmount / coin);
    calculatedChange[coin] = count;
    calculatedChange.numberOfCoins += count;
    remainingAmount = remainingAmount - coin * count;
  }

  return calculatedChange;
}

function computeChangeBruteForce(coins, amount) {
  const results = [];
  for (let i = 0; i < coins.length; i++) {
    results.push(computeChange(coins.slice(i), amount));
  }

  let smallestAmountOfCoins = Number.MAX_SAFE_INTEGER;
  let finalResult;
  for (const result of results) {
    if (result.numberOfCoins < smallestAmountOfCoins) {
      smallestAmountOfCoins = result.numberOfCoins;
      finalResult = result;
    }
  }

  return finalResult;
}

const availableCoins = [8, 6, 5, 1];
const targetAmount = 63;

const change = computeChangeBruteForce(availableCoins, targetAmount);
console.log(change);

// Time Complexity (Greedy Solution): O(n)
// Time Complexity (Brute Force): O(n^2)
