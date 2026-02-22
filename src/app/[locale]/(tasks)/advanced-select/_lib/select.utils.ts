import { Option, GroupHeader } from './select.types';

export function filterOptions<TValue>(
  options: Option<TValue>[],
  search: string
): Option<TValue>[] {
  if (!search) return options;
  const lowerSearch = search.toLowerCase();
  return options.filter((option) =>
    option.label.toLowerCase().includes(lowerSearch) ||
    option.group?.toLowerCase().includes(lowerSearch)
  );
}

export function flattenOptions<TValue>(
  options: Option<TValue>[]
): (Option<TValue> | GroupHeader)[] {
  const grouped = options.reduce((acc, option) => {
    const groupName = option.group || '';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(option);
    return acc;
  }, {} as Record<string, Option<TValue>[]>);

  const result: (Option<TValue> | GroupHeader)[] = [];

  const groupNames = Object.keys(grouped).sort((a, b) => {
    if (a === '') return 1;
    if (b === '') return -1;
    return a.localeCompare(b);
  });

  groupNames.forEach((name) => {
    if (name !== '') {
      result.push({ isGroup: true, label: name });
    }
    result.push(...grouped[name]);
  });

  return result;
}

export function isGroupHeader(item: any): item is GroupHeader {
  return item && (item as GroupHeader).isGroup === true;
}

export function isEqual<TValue>(a: TValue, b: TValue): boolean {
  if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}
