export const formatPrice = (price: number): string =>
  `$${price.toFixed(2)}`;

export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

export const slugify = (text: string): string =>
  text.toLowerCase().replace(/\s+/g, '-');