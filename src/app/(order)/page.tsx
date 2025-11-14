'use client';

import styled from '@emotion/styled';
import { mockOrders } from '@/data/orders';
import { Minus, Plus } from 'lucide-react';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f5f5;
`;

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const TopBar = styled.div`
  background: #2a2a2a;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  border-bottom: 1px solid #3a3a3a;
`;

const TableInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TableBadge = styled.div`
  background: #4285f4;
  padding: 6px 16px;
  border-radius: 6px;
  font-family: var(--font-miwon);
  font-size: 14px;
  font-weight: 600;
`;

const TableAmount = styled.div`
  font-family: var(--font-miwon);
  font-size: 14px;
  color: #e0e0e0;
`;

const DateTime = styled.div`
  font-family: var(--font-miwon);
  font-size: 13px;
  color: #e0e0e0;
`;

const OrderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  padding: 20px;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
`;

const OrderTableName = styled.div`
  font-family: var(--font-ttangsbudae);
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
`;

const OrderStatus = styled.div`
  background: #4285f4;
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-family: var(--font-miwon);
  font-size: 12px;
  font-weight: 600;
`;

const OrderDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-family: var(--font-miwon);
  font-size: 14px;
  color: #333;
`;

const OrderLabel = styled.span`
  color: #666;
`;

const OrderValue = styled.span`
  font-weight: 600;
  color: #1a1a1a;
`;

const OrderActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

const TimeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  background: #f8f8f8;
  padding: 8px 12px;
  border-radius: 8px;
`;

const TimeButton = styled.button`
  background: white;
  border: 1px solid #e0e0e0;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
    border-color: #ccc;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const TimeDisplay = styled.span`
  font-family: var(--font-miwon);
  font-size: 13px;
  font-weight: 600;
  color: #333;
  flex: 1;
  text-align: center;
`;

const ConfirmButton = styled.button`
  background: #4285f4;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-family: var(--font-miwon);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #357ae8;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default function OrdersPage() {
  return (
    <Container>
      <MainSection>
        <TopBar>
          <TableInfo>
            <TableBadge>배달 A1B2 테이블</TableBadge>
            <TableAmount>테이블 2개 총 20,000원 (결제완료)</TableAmount>
          </TableInfo>
          <DateTime>06.25 (화) 00:00</DateTime>
        </TopBar>
        <OrderGrid>
          {mockOrders.map((order) => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <OrderTableName>{order.id}</OrderTableName>
                <OrderStatus>{order.statusText}</OrderStatus>
              </OrderHeader>
              <OrderDetail>
                <OrderLabel>가격</OrderLabel>
                <OrderValue>{order.total.toLocaleString()}원</OrderValue>
              </OrderDetail>
              <OrderDetail>
                <OrderLabel>배달</OrderLabel>
                <OrderValue>{order.address}</OrderValue>
              </OrderDetail>
              <OrderDetail>
                <OrderLabel>전화번호</OrderLabel>
                <OrderValue>{order.phone}</OrderValue>
              </OrderDetail>
              <OrderActions>
                <TimeControl>
                  <TimeButton>
                    <Minus size={14} />
                  </TimeButton>
                  <TimeDisplay>5-10분</TimeDisplay>
                  <TimeButton>
                    <Plus size={14} />
                  </TimeButton>
                </TimeControl>
                <ConfirmButton>확인</ConfirmButton>
              </OrderActions>
            </OrderCard>
          ))}
        </OrderGrid>
      </MainSection>
    </Container>
  );
}
