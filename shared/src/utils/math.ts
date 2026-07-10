export const add = (a: number, b: number): number => {
  return a + b;
};

export const subtract = (a: number, b: number): number => {
  return a - b;
};

export const multiply = (a: number, b: number): number => {
  return a * b;
};

export const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error('لا يمكن القسمة على صفر');
  return a / b;
};

export const power = (base: number, exponent: number): number => {
  return Math.pow(base, exponent);
};

export const sqrt = (num: number): number => {
  if (num < 0) throw new Error('لا يمكن إيجاد جذر تربيعي لعدد سالب');
  return Math.sqrt(num);
};

export const round = (num: number, decimals: number = 0): number => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const isEqual = (a: number, b: number, tolerance: number = 0.0001): boolean => {
  return Math.abs(a - b) < tolerance;
};

export const percentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

export const average = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
};

export const median = (numbers: number[]): number => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};
