"use client";

import styled from "@emotion/styled";
import { mockOrders } from "@/data/orders";
import { Minus, Plus } from "lucide-react";
import { theme } from "@/styles/theme";
import { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${theme.colors.background.primary};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

// 좌측 주문 목록 사이드바
const OrderListSidebar = styled.aside`
  width: 320px;
  background: ${theme.colors.background.secondary};
  border-right: 1px solid ${theme.colors.border.primary};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const OrderSection = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.background.light};
  border-bottom: 1px solid ${theme.colors.border.secondary};
  display: flex;
  justify-content: flex-start;
  gap: ${theme.spacing.sm};
  align-items: center;
`;

const CategorySectionTitle = styled.h3`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.extrabold};
  color: ${theme.colors.text.primary};
`;

const SectionCount = styled.span`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.brand.blue};
`;

const OrderList = styled.div`
  overflow-y: auto;
  padding: ${theme.spacing.md};
  flex: 1;
`;

const OrderListItem = styled.div<{ active: boolean }>`
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
  background: ${({ active }) =>
    active ? theme.colors.brand.blue : theme.colors.background.secondary};
  border: 2px solid
    ${({ active }) =>
      active ? theme.colors.brand.blue : theme.colors.border.secondary};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    border-color: ${theme.colors.brand.blue};
    box-shadow: ${theme.shadow.sm};
  }
`;

const OrderItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
`;

const OrderItemId = styled.div<{ active: boolean }>`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  color: ${({ active }) =>
    active ? theme.colors.text.white : theme.colors.text.primary};
`;

const OrderItemCount = styled.div<{ active: boolean }>`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.normal};
  color: ${({ active }) =>
    active ? theme.colors.text.white : theme.colors.text.muted};
`;

const OrderItemPrice = styled.div<{ active: boolean }>`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${({ active }) =>
    active ? theme.colors.text.white : theme.colors.text.secondary};
  margin-top: ${theme.spacing.xs};
`;

// 우측 메인 콘텐츠 (주문 상세)
const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TopBar = styled.div`
  background: ${theme.colors.background.darker};
  padding: ${theme.spacing.md} ${theme.spacing.xxl};
  display: flex;
  justify-content: flex-end;
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
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.text.light};
`;

const DetailContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.xxl};
  background: ${theme.colors.background.primary};
`;

const DetailCard = styled.div`
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadow.sm};
  max-width: 800px;
  margin: 0 auto;
`;

const DetailHeader = styled.div`
  margin-bottom: ${theme.spacing.xxl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.border.secondary};
`;

const DetailTitle = styled.h1`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize["3xl"]};
  font-weight: ${theme.fontWeight.extrabold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const DetailStatus = styled.div`
  display: inline-block;
  background: ${theme.colors.brand.blue};
  color: ${theme.colors.text.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
`;

const DetailSection = styled.div`
  margin-bottom: ${theme.spacing.xxl};
`;

const SectionTitle = styled.h3`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.extrabold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.border.secondary};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: ${theme.colors.text.tertiary};
  font-weight: ${theme.fontWeight.normal};
`;

const DetailValue = styled.span`
  color: ${theme.colors.text.primary};
  font-weight: ${theme.fontWeight.bold};
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.md};
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontFamily.nanumGothic};
`;

const MenuName = styled.span`
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
`;

const MenuInfo = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.text.secondary};
`;

const OrderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xxl};
  padding-top: ${theme.spacing.xxl};
  border-top: 2px solid ${theme.colors.border.secondary};
`;

const TimeControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex: 1;
  background: ${theme.colors.background.light};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
`;

const TimeButton = styled.button`
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.primary};
  width: ${theme.sizes.buttonMd};
  height: ${theme.sizes.buttonMd};
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
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.extrabold};
  color: ${theme.colors.text.primary};
  flex: 1;
  text-align: center;
`;

const ConfirmButton = styled.button`
  background: ${theme.colors.brand.blue};
  color: ${theme.colors.text.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing["4xl"]};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.extrabold};
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.brand.blueHover};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${theme.colors.text.muted};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.normal};
`;

export default function OrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    mockOrders[0]?.id || null
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  // 1초마다 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  // 날짜/시간 포맷팅 함수
  const formatDateTime = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}.${day} (${weekday}) ${hours}:${minutes}`;
  };

  const newOrders = mockOrders.filter((order) => order.status === "pending");
  const inProgressOrders = mockOrders.filter(
    (order) => order.status === "preparing" || order.status === "completed"
  );

  const selectedOrder = mockOrders.find(
    (order) => order.id === selectedOrderId
  );

  return (
    <Container>
      <TopBar>
        <DateTime>{formatDateTime(currentTime)}</DateTime>
      </TopBar>

      <ContentWrapper>
        <OrderListSidebar>
          {/* 신규 주문 섹션 */}
          <OrderSection>
            <SectionHeader>
              <CategorySectionTitle>신규</CategorySectionTitle>
              <SectionCount>{newOrders.length}</SectionCount>
            </SectionHeader>
            <OrderList>
              {newOrders.map((order) => (
                <OrderListItem
                  key={order.id}
                  active={selectedOrderId === order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                >
                  <OrderItemHeader>
                    <OrderItemId active={selectedOrderId === order.id}>
                      {order.id}
                    </OrderItemId>
                    <OrderItemCount active={selectedOrderId === order.id}>
                      {order.items.length}개 메뉴
                    </OrderItemCount>
                  </OrderItemHeader>
                  <OrderItemPrice active={selectedOrderId === order.id}>
                    {order.total.toLocaleString()}원
                  </OrderItemPrice>
                </OrderListItem>
              ))}
            </OrderList>
          </OrderSection>

          {/* 진행 주문 섹션 */}
          <OrderSection>
            <SectionHeader>
              <CategorySectionTitle>진행</CategorySectionTitle>
              <SectionCount>{inProgressOrders.length}</SectionCount>
            </SectionHeader>
            <OrderList>
              {inProgressOrders.map((order) => (
                <OrderListItem
                  key={order.id}
                  active={selectedOrderId === order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                >
                  <OrderItemHeader>
                    <OrderItemId active={selectedOrderId === order.id}>
                      {order.id}
                    </OrderItemId>
                    <OrderItemCount active={selectedOrderId === order.id}>
                      {order.items.length}개 메뉴
                    </OrderItemCount>
                  </OrderItemHeader>
                  <OrderItemPrice active={selectedOrderId === order.id}>
                    {order.total.toLocaleString()}원
                  </OrderItemPrice>
                </OrderListItem>
              ))}
            </OrderList>
          </OrderSection>
        </OrderListSidebar>

        <MainContent>
          <DetailContent>
          {selectedOrder ? (
            <DetailCard>
              <DetailHeader>
                <DetailTitle>{selectedOrder.id}</DetailTitle>
                <DetailStatus>{selectedOrder.statusText}</DetailStatus>
              </DetailHeader>

              <DetailSection>
                <SectionTitle>주문 정보</SectionTitle>
                <DetailRow>
                  <DetailLabel>주문 번호</DetailLabel>
                  <DetailValue>{selectedOrder.id}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>주문 시간</DetailLabel>
                  <DetailValue>{selectedOrder.time}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>배달 주소</DetailLabel>
                  <DetailValue>{selectedOrder.address}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>전화번호</DetailLabel>
                  <DetailValue>{selectedOrder.phone}</DetailValue>
                </DetailRow>
              </DetailSection>

              <DetailSection>
                <SectionTitle>주문 메뉴</SectionTitle>
                <MenuList>
                  {selectedOrder.items.map((item, index) => (
                    <MenuItem key={index}>
                      <div>
                        <MenuName>{item.name}</MenuName>
                      </div>
                      <MenuInfo>
                        {item.quantity}개 × {item.price.toLocaleString()}원
                      </MenuInfo>
                    </MenuItem>
                  ))}
                </MenuList>
                <DetailRow
                  style={{
                    marginTop: theme.spacing.lg,
                    paddingTop: theme.spacing.lg,
                  }}
                >
                  <DetailLabel>총 금액</DetailLabel>
                  <DetailValue
                    style={{
                      fontSize: theme.fontSize.xl,
                      color: theme.colors.brand.blue,
                    }}
                  >
                    {selectedOrder.total.toLocaleString()}원
                  </DetailValue>
                </DetailRow>
              </DetailSection>

              <OrderActions>
                <TimeControl>
                  <TimeButton>
                    <Minus size={20} />
                  </TimeButton>
                  <TimeDisplay>5-10분</TimeDisplay>
                  <TimeButton>
                    <Plus size={20} />
                  </TimeButton>
                </TimeControl>
                <ConfirmButton>주문 확인</ConfirmButton>
              </OrderActions>
            </DetailCard>
          ) : (
            <EmptyState>주문을 선택해주세요</EmptyState>
          )}
        </DetailContent>
      </MainContent>
      </ContentWrapper>
    </Container>
  );
}
