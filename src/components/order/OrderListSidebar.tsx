import styled from "@emotion/styled";
import { theme } from "@/styles/theme";
import { Order, getStatusText } from "@/data/orders";

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
  flex: 1;
`;

const OrderListItem = styled.div<{ active: boolean }>`
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.sm};
  background: ${({ active }) =>
    active ? theme.colors.text.primary : theme.colors.background.secondary};
  border: 4px solid
    ${({ active }) =>
      active ? theme.colors.text.primary : theme.colors.border.secondary};
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
`;

const OrderItemStatus = styled.div<{ active: boolean }>`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.bold};
  color: ${({ active }) =>
    active ? theme.colors.background.secondary : theme.colors.text.muted};
  white-space: nowrap;
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
  selectedOrderId: string | null;
  onSelectOrder: (orderId: string) => void;
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
            <SectionCount>{orders.length}</SectionCount>
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
                    {order.id}
                  </OrderItemId>
                  <OrderItemStatus active={selectedOrderId === order.id}>
                    {getStatusText(order.status)}
                  </OrderItemStatus>
                </OrderItemHeader>
                <OrderItemCount active={selectedOrderId === order.id}>
                  {order.items.length}개 메뉴
                </OrderItemCount>
              </OrderListItem>
            ))}
          </OrderList>
        </OrderSection>
      </Sidebar>
    );
  }

  // 처리중 페이지: 신규/진행 카테고리 표시
  const newOrders = orders.filter((order) => order.status === "pending");
  const inProgressOrders = orders.filter(
    (order) => order.status === "preparing" || order.status === "delivering"
  );

  return (
    <Sidebar>
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
              onClick={() => onSelectOrder(order.id)}
            >
              <OrderItemHeader>
                <OrderItemId active={selectedOrderId === order.id}>
                  {order.id}
                </OrderItemId>
                <OrderItemStatus active={selectedOrderId === order.id}>
                  {getStatusText(order.status)}
                </OrderItemStatus>
              </OrderItemHeader>
              <OrderItemCount active={selectedOrderId === order.id}>
                {order.items.length}개 메뉴
              </OrderItemCount>
            </OrderListItem>
          ))}
        </OrderList>
      </OrderSection>

      {/* 진행중 주문 섹션 */}
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
              onClick={() => onSelectOrder(order.id)}
            >
              <OrderItemHeader>
                <OrderItemId active={selectedOrderId === order.id}>
                  {order.id}
                </OrderItemId>
                <OrderItemStatus active={selectedOrderId === order.id}>
                  {getStatusText(order.status)}
                </OrderItemStatus>
              </OrderItemHeader>
              <OrderItemCount active={selectedOrderId === order.id}>
                {order.items.length}개 메뉴
              </OrderItemCount>
            </OrderListItem>
          ))}
        </OrderList>
      </OrderSection>
    </Sidebar>
  );
}
