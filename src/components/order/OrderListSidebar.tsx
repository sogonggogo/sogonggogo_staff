import styled from "@emotion/styled";
import { theme } from "@/styles/theme";
import { Order } from "@/data/orders";

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

interface OrderListSidebarProps {
  newOrders: Order[];
  inProgressOrders: Order[];
  selectedOrderId: string | null;
  onSelectOrder: (orderId: string) => void;
}

export default function OrderListSidebar({
  newOrders,
  inProgressOrders,
  selectedOrderId,
  onSelectOrder,
}: OrderListSidebarProps) {
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
    </Sidebar>
  );
}
