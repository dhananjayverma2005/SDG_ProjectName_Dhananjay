export interface ActivityEntry {
  id: string;
  category: 'transport' | 'energy' | 'food' | 'shopping';
  activity: string;
  value: number;
  unit: string;
  co2kg: number;
  date: string;
}

export const CATEGORIES = {
  transport: {
    label: 'Transport',
    icon: 'Car',
    color: 'hsl(28, 70%, 55%)',
    activities: [
      { name: 'Car (petrol)', factor: 0.21, unit: 'km' },
      { name: 'Car (diesel)', factor: 0.17, unit: 'km' },
      { name: 'Bus', factor: 0.089, unit: 'km' },
      { name: 'Train', factor: 0.041, unit: 'km' },
      { name: 'Domestic flight', factor: 0.255, unit: 'km' },
      { name: 'International flight', factor: 0.195, unit: 'km' },
      { name: 'Bicycle / Walk', factor: 0, unit: 'km' },
    ],
  },
  energy: {
    label: 'Energy',
    icon: 'Zap',
    color: 'hsl(38, 80%, 55%)',
    activities: [
      { name: 'Electricity', factor: 0.5, unit: 'kWh' },
      { name: 'Natural gas', factor: 2.0, unit: 'm³' },
      { name: 'Heating oil', factor: 2.52, unit: 'litre' },
    ],
  },
  food: {
    label: 'Food',
    icon: 'Utensils',
    color: 'hsl(152, 45%, 38%)',
    activities: [
      { name: 'Beef', factor: 27.0, unit: 'kg' },
      { name: 'Chicken', factor: 6.9, unit: 'kg' },
      { name: 'Fish', factor: 6.1, unit: 'kg' },
      { name: 'Dairy', factor: 3.2, unit: 'kg' },
      { name: 'Vegetables', factor: 2.0, unit: 'kg' },
      { name: 'Fruits', factor: 1.1, unit: 'kg' },
    ],
  },
  shopping: {
    label: 'Shopping',
    icon: 'ShoppingBag',
    color: 'hsl(0, 72%, 51%)',
    activities: [
      { name: 'Clothing', factor: 15.0, unit: 'item' },
      { name: 'Electronics', factor: 50.0, unit: 'item' },
      { name: 'Furniture', factor: 30.0, unit: 'item' },
      { name: 'Books / Paper', factor: 1.0, unit: 'item' },
    ],
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const TIPS = [
  { title: 'Switch to public transport', description: 'Taking the bus instead of driving can cut transport emissions by 60%.', category: 'transport' },
  { title: 'Eat less red meat', description: 'Replacing beef with chicken just twice a week saves ~520 kg CO₂/year.', category: 'food' },
  { title: 'Use LED bulbs', description: 'LED bulbs use 75% less energy and last 25x longer than incandescent bulbs.', category: 'energy' },
  { title: 'Buy second-hand', description: 'Thrift shopping reduces manufacturing emissions and textile waste.', category: 'shopping' },
  { title: 'Unplug idle devices', description: 'Phantom loads can account for 10% of home electricity use.', category: 'energy' },
  { title: 'Cycle short distances', description: 'Trips under 5 km are perfect for cycling — zero emissions!', category: 'transport' },
  { title: 'Reduce food waste', description: 'Planning meals prevents ~100 kg CO₂/year from wasted food.', category: 'food' },
  { title: 'Choose local produce', description: 'Locally sourced food travels less, reducing transport emissions.', category: 'food' },
];

const STORAGE_KEY = 'carbon-tracker-entries';

export function loadEntries(): ActivityEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveEntries(entries: ActivityEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}
