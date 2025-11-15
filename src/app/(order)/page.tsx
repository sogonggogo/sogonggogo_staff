"use client";

import styled from "@emotion/styled";
import { mockOrders } from "@/data/orders";
import { theme } from "@/styles/theme";
import { useState, useEffect } from "react";
import TopBar from "@/components/order/TopBar";
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

  const newOrders = mockOrders.filter((order) => order.status === "pending");
  const inProgressOrders = mockOrders.filter(
    (order) => order.status === "preparing" || order.status === "completed"
  );

  const selectedOrder = mockOrders.find(
    (order) => order.id === selectedOrderId
  );

  return (
    <Container>
      <TopBar currentTime={currentTime} />

      <ContentWrapper>
        <OrderListSidebar
          newOrders={newOrders}
          inProgressOrders={inProgressOrders}
          selectedOrderId={selectedOrderId}
          onSelectOrder={setSelectedOrderId}
        />

        <MainContent>
          <OrderDetail order={selectedOrder} />
        </MainContent>
      </ContentWrapper>
    </Container>
  );
}
