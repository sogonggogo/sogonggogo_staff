'use client';

import styled from '@emotion/styled';
import { Order } from '@/data/orders';
import OrderCard from './OrderCard';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  return (
    <List>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </List>
  );
}
