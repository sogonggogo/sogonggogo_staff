export interface Delivery {
  id: string;
  status: 'dispatched' | 'delivering' | 'delivered';
  statusText: string;
  driver: string;
  phone: string;
  customer: string;
  address: string;
  dispatchTime: string;
  estimatedTime: string;
}

export const mockDeliveries: Delivery[] = [
  {
    id: 'ORD-001',
    status: 'delivering',
    statusText: '배달중',
    driver: '김배달',
    phone: '010-1111-2222',
    customer: '김철수',
    address: '서울시 강남구 역삼동 123-45',
    dispatchTime: '18:35',
    estimatedTime: '15분',
  },
  {
    id: 'ORD-002',
    status: 'dispatched',
    statusText: '배차완료',
    driver: '이배달',
    phone: '010-3333-4444',
    customer: '이영희',
    address: '서울시 서초구 서초동 456-78',
    dispatchTime: '18:50',
    estimatedTime: '25분',
  },
  {
    id: 'ORD-003',
    status: 'delivered',
    statusText: '배달완료',
    driver: '박배달',
    phone: '010-5555-6666',
    customer: '박민수',
    address: '서울시 송파구 잠실동 789-12',
    dispatchTime: '18:20',
    estimatedTime: '완료',
  },
  {
    id: 'ORD-004',
    status: 'delivering',
    statusText: '배달중',
    driver: '최배달',
    phone: '010-7777-8888',
    customer: '최지우',
    address: '서울시 강동구 천호동 321-54',
    dispatchTime: '18:40',
    estimatedTime: '10분',
  },
  {
    id: 'ORD-005',
    status: 'dispatched',
    statusText: '배차완료',
    driver: '정배달',
    phone: '010-9999-0000',
    customer: '정수진',
    address: '서울시 광진구 구의동 654-32',
    dispatchTime: '18:55',
    estimatedTime: '30분',
  },
];
