"use client";

import styled from "@emotion/styled";
import { theme } from "@/styles/theme";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OrderListSidebar from "@/components/order/OrderListSidebar";
import OrderDetail from "@/components/order/OrderDetail";
import { Order } from "@/types/api";
import { getOrders } from "@/services/orders";
import { isCompletedStatus } from "@/utils/order/orderHelpers";

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

  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 주문 데이터 가져오기
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("주문 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 현재 탭에 맞는 주문 필터링 (메모이제이션)
  const currentOrders = useMemo(
    () =>
      activeTab === "processing"
        ? orders.filter((order) => !isCompletedStatus(order.status))
        : orders.filter((order) => isCompletedStatus(order.status)),
    [activeTab, orders]
  );

  // 탭 변경 시 첫 번째 주문 선택
  useEffect(() => {
    setSelectedOrderId(currentOrders[0]?.id || null);
  }, [currentOrders]);

  const selectedOrder = currentOrders.find(
    (order) => order.id === selectedOrderId
  );

  // 주문 상태 업데이트 후 목록 갱신
  const handleOrderUpdate = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to refresh orders:", err);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>주문 데이터를 불러오는 중...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

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
        <OrderDetail order={selectedOrder} onOrderUpdate={handleOrderUpdate} />
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

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.lg};
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${theme.colors.status.danger};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.lg};
`;

// Dynamic export를 사용하여 SSR 비활성화
export const dynamic = 'force-dynamic';

export default function OrdersPage() {
  return (
    <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
      <OrdersPageContent />
    </Suspense>
  );
}
