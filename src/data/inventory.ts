export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  stockLevel: 'low' | 'medium' | 'good';
  stockLevelText: string;
  lastRestocked: string;
}

export const mockInventory: InventoryItem[] = [
  {
    id: 1,
    name: '삼겹살',
    category: '육류',
    quantity: 15,
    unit: 'kg',
    minStock: 20,
    stockLevel: 'low',
    stockLevelText: '부족',
    lastRestocked: '2024-11-10',
  },
  {
    id: 2,
    name: '김치',
    category: '채소',
    quantity: 30,
    unit: 'kg',
    minStock: 25,
    stockLevel: 'good',
    stockLevelText: '충분',
    lastRestocked: '2024-11-13',
  },
  {
    id: 3,
    name: '햄',
    category: '육가공',
    quantity: 8,
    unit: 'kg',
    minStock: 10,
    stockLevel: 'medium',
    stockLevelText: '보통',
    lastRestocked: '2024-11-11',
  },
  {
    id: 4,
    name: '라면',
    category: '면류',
    quantity: 120,
    unit: '개',
    minStock: 100,
    stockLevel: 'good',
    stockLevelText: '충분',
    lastRestocked: '2024-11-12',
  },
  {
    id: 5,
    name: '소시지',
    category: '육가공',
    quantity: 25,
    unit: 'kg',
    minStock: 15,
    stockLevel: 'good',
    stockLevelText: '충분',
    lastRestocked: '2024-11-13',
  },
  {
    id: 6,
    name: '두부',
    category: '채소',
    quantity: 40,
    unit: '모',
    minStock: 30,
    stockLevel: 'good',
    stockLevelText: '충분',
    lastRestocked: '2024-11-14',
  },
  {
    id: 7,
    name: '떡',
    category: '기타',
    quantity: 6,
    unit: 'kg',
    minStock: 10,
    stockLevel: 'low',
    stockLevelText: '부족',
    lastRestocked: '2024-11-09',
  },
  {
    id: 8,
    name: '치즈',
    category: '유제품',
    quantity: 12,
    unit: 'kg',
    minStock: 8,
    stockLevel: 'good',
    stockLevelText: '충분',
    lastRestocked: '2024-11-13',
  },
];
