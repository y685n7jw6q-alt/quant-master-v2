export const formatAccuracy = (accuracy: number): string => {
  return `${Math.round(accuracy * 100) / 100}%`;
};

export const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds} ثانية`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} د ${remainingSeconds} ث`;
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('ar-EG');
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleString('ar-EG');
};

export const formatCurrency = (amount: number, currency: string = 'SAR'): string => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toLocaleString('ar-EG', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const truncateString = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
