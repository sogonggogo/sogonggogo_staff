'use client';

import styled from '@emotion/styled';
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import { mockOrders } from '@/data/orders';

// Styled Components
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background-color: #1e2939;
  border: 1px solid #364153;
  border-radius: 12px;
  padding: 20px;
`;

const StatLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #99A1AE;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #FFFFFF;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OrderCard = styled.div`
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

export default function OrdersPage() {
  const pendingCount = mockOrders.filter(o => o.status === 'pending').length;
  const preparingCount = mockOrders.filter(o => o.status === 'preparing').length;
  const completedCount = mockOrders.filter(o => o.status === 'completed').length;

  return (
    <>
      <PageHeader title="주문 관리" subtitle="실시간 주문 현황을 확인하고 관리합니다" />
      <PageContent>
        <StatsGrid>
        <StatCard>
          <StatLabel>대기중</StatLabel>
          <StatValue>{pendingCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>조리중</StatLabel>
          <StatValue>{preparingCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>완료</StatLabel>
          <StatValue>{completedCount}</StatValue>
        </StatCard>
      </StatsGrid>

      <OrderList>
        {mockOrders.map((order) => (
          <OrderCard key={order.id}>
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
          </OrderCard>
        ))}
      </OrderList>
      </PageContent>
    </>
  );
}
