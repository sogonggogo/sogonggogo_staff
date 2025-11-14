'use client';

import styled from '@emotion/styled';
import { Order } from '@/data/orders';

const Card = styled.div`
  background-color: #1e2939;
  border: 1px solid #364153;
  border-radius: 12px;
  padding: 20px;
  transition: border-color 0.2s;

  &:hover {
    border-color: #1565FC;
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const OrderId = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
`;

const OrderStatus = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 16px;
  background-color: ${({ status }) => {
    const colors = {
      pending: '#F59E0B20',
      preparing: '#3B82F620',
      completed: '#10B98120',
    };
    return colors[status as keyof typeof colors];
  }};
  color: ${({ status }) => {
    const colors = {
      pending: '#F59E0B',
      preparing: '#3B82F6',
      completed: '#10B981',
    };
    return colors[status as keyof typeof colors];
  }};
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
`;

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OrderDetailRow = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #99A1AE;
`;

const OrderItems = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #364153;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #D1D5DC;
  margin-bottom: 4px;
`;

const OrderTotal = styled(OrderItem)`
  margin-top: 8px;
  font-weight: 600;
  color: #FFFFFF;
`;

const ItemName = styled.span`
  color: #D1D5DC;
`;

const ItemPrice = styled.span`
  color: #D1D5DC;
`;

const TotalLabel = styled.span`
  color: #FFFFFF;
  font-weight: 600;
`;

const TotalPrice = styled.span`
  color: #FFFFFF;
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
        <OrderDetailRow>고객: {order.customer}</OrderDetailRow>
        <OrderDetailRow>연락처: {order.phone}</OrderDetailRow>
        <OrderDetailRow>주소: {order.address}</OrderDetailRow>
        <OrderDetailRow>주문시간: {order.time}</OrderDetailRow>
      </OrderDetails>
      <OrderItems>
        {order.items.map((item, idx) => (
          <OrderItem key={idx}>
            <ItemName>{item.name} x{item.quantity}</ItemName>
            <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
          </OrderItem>
        ))}
        <OrderTotal>
          <TotalLabel>합계</TotalLabel>
          <TotalPrice>{order.total.toLocaleString()}원</TotalPrice>
        </OrderTotal>
      </OrderItems>
    </Card>
  );
}
