import styled from "@emotion/styled";
import { theme } from "@/styles/theme";
import { Order } from "@/types/api";
import { getStatusText } from "@/utils/order/orderHelpers";

const Sidebar = styled.aside`
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
  background: ${theme.colors.background.secondary};
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
  color: ${theme.colors.brand.blue};
`;

const SectionCount = styled.span`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.brand.blue};
`;

const OrderList = styled.div`
  overflow-y: auto;
  flex: 1;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border.primary};
    border-radius: ${theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.text.muted};
  }
`;

const OrderListItem = styled.div<{ active: boolean }>`
  padding: ${theme.spacing.xl};
  background: ${({ active }) =>
    active ? theme.colors.text.primary : theme.colors.border.secondary};
  border-bottom: 4px solid
    ${({ active }) =>
      active ? theme.colors.text.primary : theme.colors.background.secondary};
  cursor: pointer;
  transition: ${theme.transition.all};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  &:hover {
    border-color: ${theme.colors.text.primary};
    box-shadow: ${theme.shadow.sm};
  }
`;

const OrderItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const OrderItemId = styled.div<{ active: boolean }>`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${({ active }) =>
    active ? theme.colors.background.secondary : theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const OrderIdLabel = styled.span<{ active: boolean }>`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.normal};
  color: ${({ active }) =>
    active ? theme.colors.background.secondary : theme.colors.text.muted};
`;

const OrderItemStatus = styled.div<{ status?: string }>`
  display: inline-block;
  background: ${({ status }) => {
    if (status === "REJECTED") return theme.colors.status.danger;
    if (status === "COMPLETED") return theme.colors.status.completed;
    return theme.colors.status.completed;
  }};
  color: ${theme.colors.text.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.xs};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.medium};
`;

const OrderItemCount = styled.div<{ active: boolean }>`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${({ active }) =>
    active ? theme.colors.background.secondary : theme.colors.text.muted};
`;

interface OrderListSidebarProps {
  orders: Order[];
  selectedOrderId: number | null;
  onSelectOrder: (orderId: number) => void;
  showCategories?: boolean;
  categoryTitle?: string;
}

export default function OrderListSidebar({
  orders,
  selectedOrderId,
  onSelectOrder,
  showCategories = true,
  categoryTitle = "완료",
}: OrderListSidebarProps) {
  if (!showCategories) {
    // 완료 페이지: 단일 카테고리만 표시
    return (
      <Sidebar>
        <OrderSection>
          <SectionHeader>
            <CategorySectionTitle>{categoryTitle}</CategorySectionTitle>
            <SectionCount>{orders.length}건</SectionCount>
          </SectionHeader>
          <OrderList>
            {orders.map((order) => (
              <OrderListItem
                key={order.id}
                active={selectedOrderId === order.id}
                onClick={() => onSelectOrder(order.id)}
              >
                <OrderItemHeader>
                  <OrderItemId active={selectedOrderId === order.id}>
                    <OrderIdLabel active={selectedOrderId === order.id}>
                      ID
                    </OrderIdLabel>
                    {order.id}
                  </OrderItemId>
                  <OrderItemStatus status={order.status}>
                    {getStatusText(order.status)}
                  </OrderItemStatus>
                </OrderItemHeader>
                <OrderItemCount active={selectedOrderId === order.id}>
                  {order.orderItems.length}개 메뉴
                </OrderItemCount>
              </OrderListItem>
            ))}
          </OrderList>
        </OrderSection>
      </Sidebar>
    );
  }

  // 처리중 페이지: 신규/진행 카테고리 표시
  const newOrders = orders.filter((order) => order.status === "PENDING");
  const inProgressOrders = orders.filter(
    (order) => 
      order.status === "APPROVED" || 
      order.status === "COOKING" || 
      order.status === "READY_FOR_DELIVERY" || 
      order.status === "IN_DELIVERY"
  );

  return (
    <Sidebar>
      <OrderList>
        {/* 신규 주문 섹션 */}
        <SectionHeader>
          <CategorySectionTitle>신규</CategorySectionTitle>
          <SectionCount>{newOrders.length}건</SectionCount>
        </SectionHeader>
        {newOrders.map((order) => (
          <OrderListItem
            key={order.id}
            active={selectedOrderId === order.id}
            onClick={() => onSelectOrder(order.id)}
          >
            <OrderItemHeader>
              <OrderItemId active={selectedOrderId === order.id}>
                <OrderIdLabel active={selectedOrderId === order.id}>
                  ID
                </OrderIdLabel>
                {order.id}
              </OrderItemId>
              <OrderItemStatus status={order.status}>
                {getStatusText(order.status)}
              </OrderItemStatus>
            </OrderItemHeader>
            <OrderItemCount active={selectedOrderId === order.id}>
              {order.orderItems.length}개 메뉴
            </OrderItemCount>
          </OrderListItem>
        ))}

        {/* 진행중 주문 섹션 */}
        <SectionHeader>
          <CategorySectionTitle>진행</CategorySectionTitle>
          <SectionCount>{inProgressOrders.length}건</SectionCount>
        </SectionHeader>
        {inProgressOrders.map((order) => (
          <OrderListItem
            key={order.id}
            active={selectedOrderId === order.id}
            onClick={() => onSelectOrder(order.id)}
          >
            <OrderItemHeader>
              <OrderItemId active={selectedOrderId === order.id}>
                <OrderIdLabel active={selectedOrderId === order.id}>
                  ID
                </OrderIdLabel>
                {order.id}
              </OrderItemId>
              <OrderItemStatus status={order.status}>
                {getStatusText(order.status)}
              </OrderItemStatus>
            </OrderItemHeader>
            <OrderItemCount active={selectedOrderId === order.id}>
              {order.orderItems.length}개 메뉴
            </OrderItemCount>
          </OrderListItem>
        ))}
      </OrderList>
    </Sidebar>
  );
}
