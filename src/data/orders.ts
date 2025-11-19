export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'pending' | 'preparing' | 'delivering' | 'delivered';

export interface Order {
  id: string;
  status: OrderStatus;
  customer: string;
  phone: string;
  address: string;
  time: string;
  menuId?: number; // 메뉴 ID (선택사항)
  items: OrderItem[];
  total: number;
}

// 아이템 가격 가져오기 (additionalOptions.ts의 로직과 동일)
const getItemPrice = (menuId: number | undefined, itemName: string): number => {
  if (!menuId) return 10000; // 기본 가격

  // 메뉴별 개별 가격
  const itemPrices: Record<string, number> = {
    "발렌타인-와인": 25000,
    "발렌타인-스테이크": 35000,
    "하트 장식": 14500,
    "큐피드 장식": 14500,

    // 프렌치 디너 전용
    "프렌치-커피": 15000,
    "프렌치-와인": 25000,
    샐러드: 15000,
    "프렌치-스테이크": 35000,

    // 잉글리시 디너 전용
    "에그 스크램블": 7000,
    베이컨: 8000,
    빵: 5000,
    "잉글리시-스테이크": 35000,

    // 샴페인 축제 디너 전용
    샴페인: 25000,
    "바게트 빵": 4000,
    "샴페인-커피": 15000,
    "샴페인-와인": 25000,
    "샴페인-스테이크": 35000,
  };

  // 메뉴별 아이템 키 매핑
  const getItemPriceKey = (menuId: number, itemName: string): string => {
    switch (menuId) {
      case 1: // 발렌타인
        if (itemName === "와인") return "발렌타인-와인";
        if (itemName === "스테이크") return "발렌타인-스테이크";
        return itemName;
      case 2: // 프렌치
        if (itemName === "커피") return "프렌치-커피";
        if (itemName === "와인") return "프렌치-와인";
        if (itemName === "스테이크") return "프렌치-스테이크";
        return itemName;
      case 3: // 잉글리시
        if (itemName === "스테이크") return "잉글리시-스테이크";
        return itemName;
      case 4: // 샴페인
        if (itemName === "커피") return "샴페인-커피";
        if (itemName === "와인") return "샴페인-와인";
        if (itemName === "스테이크") return "샴페인-스테이크";
        return itemName;
      default:
        return itemName;
    }
  };

  const priceKey = getItemPriceKey(menuId, itemName);
  return itemPrices[priceKey] || 10000;
};

export const getStatusText = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':
      return '승인 대기중';
    case 'preparing':
      return '조리중';
    case 'delivering':
      return '배달중';
    case 'delivered':
      return '배달완료';
  }
};

export const mockOrders: Order[] = [
  // 기존 주문 업데이트 - 발렌타인 디너 (기본 아이템 모두 포함)
  {
    id: 'ORD-001',
    status: 'pending',
    customer: '김철수',
    phone: '010-1234-5678',
    address: '서울시 강남구 역삼동 123-45',
    time: '18:30',
    menuId: 1, // 발렌타인 디너
    items: [
      { name: '와인', quantity: 1, price: getItemPrice(1, '와인') },
      { name: '스테이크', quantity: 1, price: getItemPrice(1, '스테이크') },
      { name: '하트 장식', quantity: 1, price: getItemPrice(1, '하트 장식') },
      { name: '큐피드 장식', quantity: 1, price: getItemPrice(1, '큐피드 장식') },
    ],
    total: 89000,
  },
  // 프렌치 디너 (샐러드 제거)
  {
    id: 'ORD-002',
    status: 'preparing',
    customer: '이영희',
    phone: '010-2345-6789',
    address: '서울시 서초구 서초동 456-78',
    time: '18:45',
    menuId: 2, // 프렌치 디너
    items: [
      { name: '커피', quantity: 1, price: getItemPrice(2, '커피') }, // 15000
      { name: '와인', quantity: 1, price: getItemPrice(2, '와인') }, // 25000
      { name: '스테이크', quantity: 1, price: getItemPrice(2, '스테이크') }, // 35000
    ],
    total: 75000, // 15000 + 25000 + 35000
  },
  // 잉글리시 디너 (기본 아이템 + 추가 아이템)
  {
    id: 'ORD-003',
    status: 'delivering',
    customer: '박민수',
    phone: '010-3456-7890',
    address: '서울시 송파구 잠실동 789-12',
    time: '18:15',
    menuId: 3, // 잉글리시 디너
    items: [
      { name: '에그 스크램블', quantity: 2, price: getItemPrice(3, '에그 스크램블') }, // 7000 * 2 = 14000
      { name: '베이컨', quantity: 1, price: getItemPrice(3, '베이컨') }, // 8000
      { name: '빵', quantity: 1, price: getItemPrice(3, '빵') }, // 5000
      { name: '스테이크', quantity: 1, price: getItemPrice(3, '스테이크') }, // 35000
    ],
    total: 62000, // 14000 + 8000 + 5000 + 35000
  },
  // 샴페인 축제 디너 (기본 아이템 모두 포함)
  {
    id: 'ORD-004',
    status: 'delivered',
    customer: '최수진',
    phone: '010-4567-8901',
    address: '서울시 강동구 천호동 234-56',
    time: '17:50',
    menuId: 4, // 샴페인 축제 디너
    items: [
      { name: '샴페인', quantity: 1, price: getItemPrice(4, '샴페인') }, // 25000
      { name: '바게트 빵', quantity: 4, price: getItemPrice(4, '바게트 빵') }, // 4000 * 4 = 16000
      { name: '커피', quantity: 1, price: getItemPrice(4, '커피') }, // 15000
      { name: '와인', quantity: 1, price: getItemPrice(4, '와인') }, // 25000
      { name: '스테이크', quantity: 1, price: getItemPrice(4, '스테이크') }, // 35000
    ],
    total: 116000, // 25000 + 16000 + 15000 + 25000 + 35000
  },
  // 새로운 주문 1: 발렌타인 디너 (하트 장식, 큐피드 장식 제거)
  {
    id: 'ORD-005',
    status: 'pending',
    customer: '정다은',
    phone: '010-5678-9012',
    address: '서울시 마포구 상암동 345-67',
    time: '19:00',
    menuId: 1, // 발렌타인 디너
    items: [
      { name: '와인', quantity: 1, price: getItemPrice(1, '와인') }, // 25000
      { name: '스테이크', quantity: 1, price: getItemPrice(1, '스테이크') }, // 35000
    ],
    total: 60000, // 25000 + 35000
  },
  // 새로운 주문 2: 프렌치 디너 (기본 아이템 모두 포함)
  {
    id: 'ORD-006',
    status: 'preparing',
    customer: '한지훈',
    phone: '010-6789-0123',
    address: '서울시 용산구 이태원동 456-78',
    time: '19:15',
    menuId: 2, // 프렌치 디너
    items: [
      { name: '커피', quantity: 1, price: getItemPrice(2, '커피') }, // 15000
      { name: '와인', quantity: 1, price: getItemPrice(2, '와인') }, // 25000
      { name: '샐러드', quantity: 1, price: getItemPrice(2, '샐러드') }, // 15000
      { name: '스테이크', quantity: 1, price: getItemPrice(2, '스테이크') }, // 35000
    ],
    total: 90000, // 15000 + 25000 + 15000 + 35000
  },
  // 새로운 주문 3: 잉글리시 디너 (베이컨 제거, 에그 스크램블 추가)
  {
    id: 'ORD-007',
    status: 'delivering',
    customer: '송민지',
    phone: '010-7890-1234',
    address: '서울시 종로구 명동 567-89',
    time: '19:30',
    menuId: 3, // 잉글리시 디너
    items: [
      { name: '에그 스크램블', quantity: 2, price: getItemPrice(3, '에그 스크램블') }, // 7000 * 2 = 14000
      { name: '빵', quantity: 2, price: getItemPrice(3, '빵') }, // 5000 * 2 = 10000
      { name: '스테이크', quantity: 1, price: getItemPrice(3, '스테이크') }, // 35000
    ],
    total: 59000, // 14000 + 10000 + 35000
  },
  // 새로운 주문 4: 샴페인 축제 디너 (와인 제거)
  {
    id: 'ORD-008',
    status: 'pending',
    customer: '윤서연',
    phone: '010-8901-2345',
    address: '서울시 강서구 화곡동 678-90',
    time: '19:45',
    menuId: 4, // 샴페인 축제 디너
    items: [
      { name: '샴페인', quantity: 1, price: getItemPrice(4, '샴페인') }, // 25000
      { name: '바게트 빵', quantity: 4, price: getItemPrice(4, '바게트 빵') }, // 4000 * 4 = 16000
      { name: '커피', quantity: 1, price: getItemPrice(4, '커피') }, // 15000
      { name: '스테이크', quantity: 1, price: getItemPrice(4, '스테이크') }, // 35000
    ],
    total: 91000, // 25000 + 16000 + 15000 + 35000
  },
  // 새로운 주문 5: 발렌타인 디너 (큐피드 장식만 제거, 하트 장식 추가 수량)
  {
    id: 'ORD-009',
    status: 'preparing',
    customer: '강태현',
    phone: '010-9012-3456',
    address: '서울시 노원구 상계동 789-01',
    time: '20:00',
    menuId: 1, // 발렌타인 디너
    items: [
      { name: '와인', quantity: 1, price: getItemPrice(1, '와인') }, // 25000
      { name: '스테이크', quantity: 1, price: getItemPrice(1, '스테이크') }, // 35000
      { name: '하트 장식', quantity: 2, price: getItemPrice(1, '하트 장식') }, // 14500 * 2 = 29000
    ],
    total: 89000, // 25000 + 35000 + 29000
  },
];
