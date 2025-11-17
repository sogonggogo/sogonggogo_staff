"use client";

import styled from "@emotion/styled";
import { mockOrders } from "@/data/orders";
import { theme } from "@/styles/theme";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OrderListSidebar from "@/components/order/OrderListSidebar";
import OrderDetail from "@/components/order/OrderDetail";

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: ${theme.colors.background.primary};
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
`;

function OrdersPageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "processing";
  const activeTab = tab === "completed" ? "completed" : "processing";

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // 현재 탭에 맞는 주문 필터링 (메모이제이션)
  const currentOrders = useMemo(
    () =>
      activeTab === "processing"
        ? mockOrders.filter((order) => order.status !== "delivered")
        : mockOrders.filter((order) => order.status === "delivered"),
    [activeTab]
  );

  // 탭 변경 시 첫 번째 주문 선택
  useEffect(() => {
    setSelectedOrderId(currentOrders[0]?.id || null);
  }, [currentOrders]);

  const selectedOrder = currentOrders.find(
    (order) => order.id === selectedOrderId
  );

  return (
    <Container>
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
    </Container>
  );
}

const LoadingFallback = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.nanumGothic};
`;

export default function OrdersPage() {
  return (
    <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
      <OrdersPageContent />
    </Suspense>
  );
}
