'use client';

import styled from '@emotion/styled';
import { Order } from '@/data/orders';
import { theme } from '@/styles/theme';

const Card = styled.div`
  background: ${theme.colors.background.secondary};
  border: 2px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  transition: ${theme.transition.allNormal};
  box-shadow: ${theme.shadow.sm};

  &:hover {
    border-color: ${theme.colors.brand.primary};
    box-shadow: ${theme.shadow.lg};
    transform: translateY(-2px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.border.primary};
`;

const OrderId = styled.span`
  font-family: ${theme.fontFamily.ttangsbudae};
  font-size: ${theme.fontSize['2xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
`;

const OrderStatus = styled.span<{ status: string }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  background-color: ${({ status }) => {
    const colors = {
      pending: theme.colors.status.pending,
      preparing: theme.colors.status.preparing,
      completed: theme.colors.status.completed,
    };
    return colors[status as keyof typeof colors];
  }};
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.ttangsbudae};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  box-shadow: ${theme.shadow.button};
`;

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const OrderDetailRow = styled.div`
  font-family: ${theme.fontFamily.miwon};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.primary};
  display: flex;
  gap: ${theme.spacing.sm};

  strong {
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.colors.brand.primary};
    min-width: 80px;
  }
`;

const OrderItems = styled.div`
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 2px dashed ${theme.colors.border.primary};
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${theme.fontFamily.miwon};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.md};
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.gradientPrimary};
  border-radius: ${theme.borderRadius.lg};
  font-family: ${theme.fontFamily.ttangsbudae};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
  box-shadow: ${theme.shadow.xl};
`;

const ItemName = styled.span`
  font-weight: ${theme.fontWeight.semibold};
`;

const ItemPrice = styled.span`
  font-weight: ${theme.fontWeight.semibold};
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
