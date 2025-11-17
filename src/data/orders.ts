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
  items: OrderItem[];
  total: number;
}

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
  {
    id: 'ORD-001',
    status: 'pending',
    customer: '김철수',
    phone: '010-1234-5678',
    address: '서울시 강남구 역삼동 123-45',
    time: '18:30',
    items: [
      { name: '미스터 대박 세트', quantity: 2, price: 45000 },
      { name: '김치찌개', quantity: 1, price: 12000 },
    ],
    total: 57000,
  },
  {
    id: 'ORD-002',
    status: 'preparing',
    customer: '이영희',
    phone: '010-2345-6789',
    address: '서울시 서초구 서초동 456-78',
    time: '18:45',
    items: [
      { name: '부대찌개', quantity: 3, price: 36000 },
    ],
    total: 36000,
  },
  {
    id: 'ORD-003',
    status: 'delivering',
    customer: '박민수',
    phone: '010-3456-7890',
    address: '서울시 송파구 잠실동 789-12',
    time: '18:15',
    items: [
      { name: '미스터 대박 세트', quantity: 1, price: 22500 },
      { name: '된장찌개', quantity: 1, price: 11000 },
    ],
    total: 33500,
  },
  {
    id: 'ORD-004',
    status: 'delivered',
    customer: '최수진',
    phone: '010-4567-8901',
    address: '서울시 강동구 천호동 234-56',
    time: '17:50',
    items: [
      { name: '부대찌개', quantity: 2, price: 24000 },
    ],
    total: 24000,
  },
];
