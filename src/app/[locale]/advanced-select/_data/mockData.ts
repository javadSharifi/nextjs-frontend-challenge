import { SelectData, SelectOption } from '../_types';

export const fruitsData: SelectOption[] = [
  { value: 'apple', label: 'Apple', icon: '🍎' },
  { value: 'banana', label: 'Banana', icon: '🍌' },
  { value: 'orange', label: 'Orange', icon: '🍊' },
  { value: 'mango', label: 'Mango', icon: '🥭' },
  { value: 'grape', label: 'Grape', icon: '🍇' },
  { value: 'strawberry', label: 'Strawberry', icon: '🍓' },
  { value: 'watermelon', label: 'Watermelon', icon: '🍉' },
  { value: 'pineapple', label: 'Pineapple', icon: '🍍' },
  { value: 'peach', label: 'Peach', icon: '🍑' },
  { value: 'cherry', label: 'Cherry', icon: '🍒' },
];

export const vegetablesData: SelectOption[] = [
  { value: 'carrot', label: 'Carrot', icon: '🥕' },
  { value: 'broccoli', label: 'Broccoli', icon: '🥦' },
  { value: 'tomato', label: 'Tomato', icon: '🍅' },
  { value: 'potato', label: 'Potato', icon: '🥔' },
  { value: 'onion', label: 'Onion', icon: '🧅' },
  { value: 'garlic', label: 'Garlic', icon: '🧄' },
  { value: 'pepper', label: 'Bell Pepper', icon: '🫑' },
  { value: 'cucumber', label: 'Cucumber', icon: '🥒' },
];

export const groupedData: SelectData[] = [
  { title: 'Fruits', options: fruitsData },
  { title: 'Vegetables', options: vegetablesData },
];

export const largeDataset: SelectOption[] = Array.from({ length: 1000 }, (_, i) => ({
  value: `item-${i}`,
  label: `Item ${i + 1}`,
  icon: '📦',
}));
