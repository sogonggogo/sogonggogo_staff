// 재고 관련 타입 정의

export interface InventoryItem {
  id: number;
  productId: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  stockLevel: 'low' | 'medium' | 'good';
  stockLevelText: string;
  lastRestocked: string;
  saleStatus: '판매중' | '판매중지';
  price: number;
  expectedPrice: number;
  hasStock: boolean;
}

