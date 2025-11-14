'use client';

import styled from '@emotion/styled';
import { mockOrders } from '@/data/orders';
import { Minus, Plus } from 'lucide-react';
import { theme } from '@/styles/theme';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: ${theme.colors.background.primary};
`;

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const TopBar = styled.div`
  background: ${theme.colors.background.darker};
  padding: ${theme.spacing.md} ${theme.spacing.xxl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.text.white};
  border-bottom: 1px solid ${theme.colors.border.darker};
`;

const TableInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

const TableBadge = styled.div`
  background: ${theme.colors.brand.blue};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fontFamily.miwon};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
`;

const TableAmount = styled.div`
  font-family: ${theme.fontFamily.miwon};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.light};
`;

const DateTime = styled.div`
  font-family: ${theme.fontFamily.miwon};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.light};
`;

const OrderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
`;

const OrderCard = styled.div`
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadow.sm};
  transition: ${theme.transition.all};

  &:hover {
    box-shadow: ${theme.shadow.md};
    transform: translateY(-2px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 2px solid ${theme.colors.border.secondary};
`;

const OrderTableName = styled.div`
  font-family: ${theme.fontFamily.ttangsbudae};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
`;

const OrderStatus = styled.div`
  background: ${theme.colors.brand.blue};
  color: ${theme.colors.text.white};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fontFamily.miwon};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
`;

const OrderDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
  font-family: ${theme.fontFamily.miwon};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.secondary};
`;

const OrderLabel = styled.span`
  color: ${theme.colors.text.tertiary};
`;

const OrderValue = styled.span`
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
`;

const OrderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border.secondary};
`;

const TimeControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex: 1;
  background: ${theme.colors.background.light};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
`;

const TimeButton = styled.button`
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.primary};
  width: ${theme.sizes.buttonSm};
  height: ${theme.sizes.buttonSm};
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.border.secondary};
    border-color: #ccc;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const TimeDisplay = styled.span`
  font-family: ${theme.fontFamily.miwon};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.secondary};
  flex: 1;
  text-align: center;
`;

const ConfirmButton = styled.button`
  background: ${theme.colors.brand.blue};
  color: ${theme.colors.text.white};
  border: none;
  padding: 10px ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontFamily.miwon};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.brand.blueHover};
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
