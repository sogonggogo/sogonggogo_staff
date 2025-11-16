"use client";

import styled from "@emotion/styled";
import { mockOrders } from "@/data/orders";
import { theme } from "@/styles/theme";
import { useState, useEffect } from "react";
import TopBar, { OrderTab } from "@/components/order/TopBar";
import OrderListSidebar from "@/components/order/OrderListSidebar";
import OrderDetail from "@/components/order/OrderDetail";

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

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderTab>("processing");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    mockOrders[0]?.id || null
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  // 탭 변경 시 첫 번째 주문 선택
  useEffect(() => {
    const orders =
      activeTab === "processing"
        ? mockOrders.filter(
            (order) => order.status === "pending" || order.status === "preparing"
          )
        : mockOrders.filter((order) => order.status === "completed");

    setSelectedOrderId(orders[0]?.id || null);
  }, [activeTab]);

  // 현재 탭에 맞는 주문 필터링
  const currentOrders =
    activeTab === "processing"
      ? mockOrders.filter(
          (order) => order.status === "pending" || order.status === "preparing"
        )
      : mockOrders.filter((order) => order.status === "completed");

  const selectedOrder = currentOrders.find(
    (order) => order.id === selectedOrderId
  );

  return (
    <Container>
      <TopBar
        currentTime={currentTime}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <ContentWrapper>
        <OrderListSidebar
          orders={currentOrders}
          selectedOrderId={selectedOrderId}
          onSelectOrder={setSelectedOrderId}
          showCategories={activeTab === "processing"}
          categoryTitle="완료"
        />

        <MainContent>
          <OrderDetail order={selectedOrder} />
        </MainContent>
      </ContentWrapper>
    </Container>
  );
}
