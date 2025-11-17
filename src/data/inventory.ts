// additionalOptions.ts의 가격 정보 (통일된 메뉴명 사용)
const itemPrices: Record<string, number> = {
  // 통일된 메뉴
  와인: 23333, // 평균 가격
  스테이크: 31250, // 평균 가격
  커피: 15000, // 평균 가격
  
  // 발렌타인 디너
  "하트 장식": 14500,
  "큐피드 장식": 14500,
  
  // 프렌치 디너
  샐러드: 15000,
  
  // 잉글리시 디너
  "에그 스크램블": 7000,
  베이컨: 8000,
  빵: 5000,
  
  // 샴페인 축제 디너
  샴페인: 25000,
  "바게트 빵": 3750,
};

export interface InventoryItem {
  id: number;
  productId: string; // 상품ID
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  stockLevel: 'low' | 'medium' | 'good';
  stockLevelText: string;
  lastRestocked: string;
  saleStatus: '판매중' | '판매중지'; // 판매상태
  price: number; // 가격
  expectedPrice: number; // 예상판매가
  hasStock: boolean; // 재고 유무
  changeQuantity: number; // 증감수량
}

// additionalOptions.ts의 itemPrices를 기반으로 재료 목록 생성
const getCategory = (name: string): string => {
  if (name.includes('와인') || name.includes('샴페인') || name.includes('커피')) {
    return '음료';
  }
  if (name.includes('스테이크') || name.includes('베이컨')) {
    return '육류';
  }
  if (name.includes('빵') || name.includes('에그 스크램블')) {
    return '식품';
  }
  if (name.includes('샐러드')) {
    return '채소';
  }
  if (name.includes('장식')) {
    return '장식품';
  }
  return '기타';
};

const getUnit = (name: string): string => {
  if (name.includes('빵')) {
    return '개';
  }
  if (name.includes('와인') || name.includes('샴페인') || name.includes('커피')) {
    return '병';
  }
  if (name.includes('스테이크') || name.includes('베이컨')) {
    return '인분';
  }
  if (name.includes('에그 스크램블')) {
    return '인분';
  }
  if (name.includes('샐러드')) {
    return '인분';
  }
  if (name.includes('장식')) {
    return '개';
  }
  return '개';
};

const getStockLevel = (quantity: number, minStock: number): 'low' | 'medium' | 'good' => {
  if (quantity < minStock) return 'low';
  if (quantity < minStock * 1.5) return 'medium';
  return 'good';
};

const getStockLevelText = (level: 'low' | 'medium' | 'good'): string => {
  const texts = { low: '부족', medium: '보통', good: '충분' };
  return texts[level];
};

const getPrice = (name: string): number => {
  return itemPrices[name] || 10000;
};

const getExpectedPrice = (price: number): number => {
  return Math.round(price * 1.2); // 20% 마진
};

export const mockInventory: InventoryItem[] = [
  // 통일된 메뉴
  {
    id: 1,
    productId: '10025701',
    name: '와인',
    category: getCategory('와인'),
    quantity: 67, // 25 + 22 + 20
    unit: getUnit('와인'),
    minStock: 50,
    stockLevel: getStockLevel(67, 50),
    stockLevelText: getStockLevelText(getStockLevel(67, 50)),
    lastRestocked: '2024-11-13',
    saleStatus: '판매중',
    price: getPrice('와인'),
    expectedPrice: getExpectedPrice(getPrice('와인')),
    hasStock: true,
    changeQuantity: 0,
  },
  {
    id: 2,
    productId: '10025702',
    name: '스테이크',
    category: getCategory('스테이크'),
    quantity: 65, // 18 + 20 + 15 + 12
    unit: getUnit('스테이크'),
    minStock: 50,
    stockLevel: getStockLevel(65, 50),
    stockLevelText: getStockLevelText(getStockLevel(65, 50)),
    lastRestocked: '2024-11-12',
    saleStatus: '판매중',
    price: getPrice('스테이크'),
    expectedPrice: getExpectedPrice(getPrice('스테이크')),
    hasStock: true,
    changeQuantity: 0,
  },
  {
    id: 3,
    productId: '10025703',
    name: '커피',
    category: getCategory('커피'),
    quantity: 55, // 30 + 25
    unit: getUnit('커피'),
    minStock: 40,
    stockLevel: getStockLevel(55, 40),
    stockLevelText: getStockLevelText(getStockLevel(55, 40)),
    lastRestocked: '2024-11-14',
    saleStatus: '판매중',
    price: getPrice('커피'),
    expectedPrice: getExpectedPrice(getPrice('커피')),
    hasStock: true,
    changeQuantity: 0,
  },
  // 발렌타인 디너 재료
  {
    id: 4,
    productId: '10025704',
    name: '하트 장식',
    category: getCategory('하트 장식'),
    quantity: 50,
    unit: getUnit('하트 장식'),
    minStock: 30,
    stockLevel: getStockLevel(50, 30),
    stockLevelText: getStockLevelText(getStockLevel(50, 30)),
    lastRestocked: '2024-11-13',
    saleStatus: '판매중',
    price: getPrice('하트 장식'),
    expectedPrice: getExpectedPrice(getPrice('하트 장식')),
    hasStock: true,
    changeQuantity: 0,
  },
  {
    id: 5,
    productId: '10025705',
    name: '큐피드 장식',
    category: getCategory('큐피드 장식'),
    quantity: 45,
    unit: getUnit('큐피드 장식'),
    minStock: 30,
    stockLevel: getStockLevel(45, 30),
    stockLevelText: getStockLevelText(getStockLevel(45, 30)),
    lastRestocked: '2024-11-13',
    saleStatus: '판매중',
    price: getPrice('큐피드 장식'),
    expectedPrice: getExpectedPrice(getPrice('큐피드 장식')),
    hasStock: true,
    changeQuantity: 0,
  },
  // 프렌치 디너 재료
  {
    id: 6,
    productId: '10025706',
    name: '샐러드',
    category: getCategory('샐러드'),
    quantity: 35,
    unit: getUnit('샐러드'),
    minStock: 30,
    stockLevel: getStockLevel(35, 30),
    stockLevelText: getStockLevelText(getStockLevel(35, 30)),
    lastRestocked: '2024-11-15',
    saleStatus: '판매중',
    price: getPrice('샐러드'),
    expectedPrice: getExpectedPrice(getPrice('샐러드')),
    hasStock: true,
    changeQuantity: 0,
  },
  // 잉글리시 디너 재료
  {
    id: 7,
    productId: '10025707',
    name: '에그 스크램블',
    category: getCategory('에그 스크램블'),
    quantity: 40,
    unit: getUnit('에그 스크램블'),
    minStock: 30,
    stockLevel: getStockLevel(40, 30),
    stockLevelText: getStockLevelText(getStockLevel(40, 30)),
    lastRestocked: '2024-11-14',
    saleStatus: '판매중',
    price: getPrice('에그 스크램블'),
    expectedPrice: getExpectedPrice(getPrice('에그 스크램블')),
    hasStock: true,
    changeQuantity: 0,
  },
  {
    id: 8,
    productId: '10025708',
    name: '베이컨',
    category: getCategory('베이컨'),
    quantity: 28,
    unit: getUnit('베이컨'),
    minStock: 20,
    stockLevel: getStockLevel(28, 20),
    stockLevelText: getStockLevelText(getStockLevel(28, 20)),
    lastRestocked: '2024-11-13',
    saleStatus: '판매중',
    price: getPrice('베이컨'),
    expectedPrice: getExpectedPrice(getPrice('베이컨')),
    hasStock: true,
    changeQuantity: 0,
  },
  {
    id: 9,
    productId: '10025709',
    name: '빵',
    category: getCategory('빵'),
    quantity: 60,
    unit: getUnit('빵'),
    minStock: 50,
    stockLevel: getStockLevel(60, 50),
    stockLevelText: getStockLevelText(getStockLevel(60, 50)),
    lastRestocked: '2024-11-15',
    saleStatus: '판매중',
    price: getPrice('빵'),
    expectedPrice: getExpectedPrice(getPrice('빵')),
    hasStock: true,
    changeQuantity: 0,
  },
  // 샴페인 축제 디너 재료
  {
    id: 10,
    productId: '10025710',
    name: '샴페인',
    category: getCategory('샴페인'),
    quantity: 18,
    unit: getUnit('샴페인'),
    minStock: 15,
    stockLevel: getStockLevel(18, 15),
    stockLevelText: getStockLevelText(getStockLevel(18, 15)),
    lastRestocked: '2024-11-12',
    saleStatus: '판매중',
    price: getPrice('샴페인'),
    expectedPrice: getExpectedPrice(getPrice('샴페인')),
    hasStock: true,
    changeQuantity: 0,
  },
  {
    id: 11,
    productId: '10025711',
    name: '바게트 빵',
    category: getCategory('바게트 빵'),
    quantity: 120,
    unit: getUnit('바게트 빵'),
    minStock: 100,
    stockLevel: getStockLevel(120, 100),
    stockLevelText: getStockLevelText(getStockLevel(120, 100)),
    lastRestocked: '2024-11-15',
    saleStatus: '판매중',
    price: getPrice('바게트 빵'),
    expectedPrice: getExpectedPrice(getPrice('바게트 빵')),
    hasStock: true,
    changeQuantity: 0,
  },
  // 판매중지 상태 아이템들
  {
    id: 12,
    productId: '10025712',
    name: '레드 와인',
    category: getCategory('와인'),
    quantity: 15,
    unit: getUnit('와인'),
    minStock: 20,
    stockLevel: getStockLevel(15, 20),
    stockLevelText: getStockLevelText(getStockLevel(15, 20)),
    lastRestocked: '2024-11-10',
    saleStatus: '판매중지',
    price: getPrice('와인'),
    expectedPrice: getExpectedPrice(getPrice('와인')),
    hasStock: true,
    changeQuantity: 0,
  },
  {
    id: 13,
    productId: '10025713',
    name: '양고기 스테이크',
    category: getCategory('스테이크'),
    quantity: 8,
    unit: getUnit('스테이크'),
    minStock: 15,
    stockLevel: getStockLevel(8, 15),
    stockLevelText: getStockLevelText(getStockLevel(8, 15)),
    lastRestocked: '2024-11-11',
    saleStatus: '판매중지',
    price: getPrice('스테이크'),
    expectedPrice: getExpectedPrice(getPrice('스테이크')),
    hasStock: true,
    changeQuantity: 0,
  },
  {
    id: 14,
    productId: '10025714',
    name: '치즈',
    category: getCategory('치즈'),
    quantity: 0,
    unit: '개',
    minStock: 20,
    stockLevel: getStockLevel(0, 20),
    stockLevelText: getStockLevelText(getStockLevel(0, 20)),
    lastRestocked: '2024-10-28',
    saleStatus: '판매중지',
    price: 12000,
    expectedPrice: getExpectedPrice(12000),
    hasStock: false,
    changeQuantity: 0,
  },
];
