'use client';

import styled from '@emotion/styled';
import { Order } from '@/data/orders';

const Card = styled.div`
  background: var(--card);
  border: 2px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    border-color: var(--primary);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--border);
`;

const OrderId = styled.span`
  font-family: var(--font-ttangsbudae);
  font-size: 20px;
  font-weight: 700;
  color: var(--foreground);
`;

const OrderStatus = styled.span<{ status: string }>`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${({ status }) => {
    const colors = {
      pending: 'var(--secondary)',
      preparing: '#3B82F6',
      completed: '#10B981',
    };
    return colors[status as keyof typeof colors];
  }};
  color: #FFFFFF;
  font-family: var(--font-ttangsbudae);
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

const OrderDetailRow = styled.div`
  font-family: var(--font-miwon);
  font-size: 15px;
  color: var(--foreground);
  display: flex;
  gap: 8px;

  strong {
    font-weight: 600;
    color: var(--primary);
    min-width: 80px;
  }
`;

const OrderItems = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px dashed var(--border);
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: var(--font-miwon);
  font-size: 15px;
  color: var(--foreground);
  margin-bottom: 8px;
  padding: 8px 12px;
  background: var(--muted);
  border-radius: 8px;
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  border-radius: 12px;
  font-family: var(--font-ttangsbudae);
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-foreground);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ItemName = styled.span`
  font-weight: 600;
`;

const ItemPrice = styled.span`
  font-weight: 600;
`;

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Card>
      <OrderHeader>
        <OrderId>{order.id}</OrderId>
        <OrderStatus status={order.status}>{order.statusText}</OrderStatus>
      </OrderHeader>
      <OrderDetails>
        <OrderDetailRow><strong>고객</strong> {order.customer}</OrderDetailRow>
        <OrderDetailRow><strong>연락처</strong> {order.phone}</OrderDetailRow>
        <OrderDetailRow><strong>주소</strong> {order.address}</OrderDetailRow>
        <OrderDetailRow><strong>시간</strong> {order.time}</OrderDetailRow>
      </OrderDetails>
      <OrderItems>
        {order.items.map((item, idx) => (
          <OrderItem key={idx}>
            <ItemName>{item.name} x{item.quantity}</ItemName>
            <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
          </OrderItem>
        ))}
        <OrderTotal>
          <span>합계</span>
          <span>{order.total.toLocaleString()}원</span>
        </OrderTotal>
      </OrderItems>
    </Card>
  );
}
