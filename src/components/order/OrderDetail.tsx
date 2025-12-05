import { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@/styles/theme";
import { Order } from "@/types/api";
import { getStatusText } from "@/utils/order/orderHelpers";
import {
  approveOrder,
  rejectOrder,
  startCooking,
  markOrderReady,
  startDelivery,
  completeOrder,
} from "@/services/orders";
import { ApiError } from "@/services/client";

const DetailContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.xxxl};
  background: ${theme.colors.background.dark};
`;

const DetailCard = styled.div`
  background: ${theme.colors.background.darker};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxxl};
  max-width: 1200px;
  margin: 0 auto;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.border.dark};
`;

const TabContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xxxl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border.dark};
`;

const TabButton = styled.button<{ active: boolean }>`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${({ active }) =>
    active ? theme.fontWeight.bold : theme.fontWeight.normal};
  color: ${({ active }) =>
    active ? theme.colors.brand.blue : theme.colors.text.tertiary};
  background: none;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  cursor: pointer;
  transition: ${theme.transition.all};
  border-bottom: 2px solid
    ${({ active }) => (active ? theme.colors.brand.blue : "transparent")};
  margin-bottom: -${theme.spacing.lg};

  &:hover {
    color: ${theme.colors.brand.blue};
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
`;

const ActionButton = styled.button<{ variant: "approve" | "reject" | "primary" }>`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.bold};
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.sm};
  border: none;
  cursor: pointer;
  transition: ${theme.transition.all};

  ${({ variant }) => {
    if (variant === "approve" || variant === "primary") {
      return `
        background: ${theme.colors.brand.blue};
        color: ${theme.colors.text.white};
        
        &:hover {
          background: ${theme.colors.brand.blue};
          opacity: 0.9;
          box-shadow: ${theme.shadow.sm};
        }
      `;
    }
    return `
      background: ${theme.colors.background.darkest};
      color: ${theme.colors.text.light};
      border: 1px solid ${theme.colors.border.darker};
      
      &:hover {
        background: ${theme.colors.background.dark};
        border-color: ${theme.colors.border.dark};
      }
    `;
  }}
`;

const DetailTitle = styled.h1`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize["3xl"]};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.brand.blue};
  margin: 0;
`;

const DetailStatus = styled.div`
  display: inline-block;
  background: ${theme.colors.status.completed};
  color: ${theme.colors.text.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xs};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
`;

const DetailSection = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.sm} 0;
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};

  &: first-of-type {
    border-top: 1px solid ${theme.colors.border.darker};
  }
`;

const DetailLabel = styled.span`
  color: ${theme.colors.text.tertiary};
  font-weight: ${theme.fontWeight.normal};
`;

const DetailValue = styled.span`
  color: ${theme.colors.text.light};
  font-weight: ${theme.fontWeight.medium};
`;

const MenuSection = styled.div`
  margin-bottom: ${theme.spacing.xxxl};
  padding-bottom: ${theme.spacing.xxl};
  border-bottom: 1px solid ${theme.colors.border.dark};
`;

const MenuTitle = styled.div`
  color: ${theme.colors.text.tertiary};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.normal};
  margin-bottom: ${theme.spacing.lg};
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const MenuGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background.darkest};
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid ${theme.colors.border.darker};
  font-family: ${theme.fontFamily.nanumGothic};
`;

const MainMenuName = styled.div`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.md};
`;

const SubMenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  padding-left: ${theme.spacing.lg};
`;

const SubMenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.light};
`;

const SubMenuName = styled.span`
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.text.tertiary};
`;

const SubMenuDetails = styled.span`
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.light};
`;

const TotalSection = styled.div`
  margin-top: ${theme.spacing.xxl};
  padding-top: ${theme.spacing.xxl};
  border-top: 1px solid ${theme.colors.border.dark};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalLabel = styled.div`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
`;

const TotalValue = styled.div`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.brand.blue};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${theme.colors.text.tertiary};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.normal};
`;

interface OrderDetailProps {
  order: Order | undefined;
  onOrderUpdate: () => void;
}

// 가격 포맷 함수
const formatPrice = (price: number): string => {
  return `${price.toLocaleString("ko-KR")}원`;
};

export default function OrderDetail({
  order,
  onOrderUpdate,
}: OrderDetailProps) {
  const [activeTab, setActiveTab] = useState<"order" | "delivery">("order");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!order) {
    return (
      <DetailContent>
        <EmptyState>주문을 선택해주세요</EmptyState>
      </DetailContent>
    );
  }

  // API 호출 핸들러
  const handleAction = async (
    action: () => Promise<void>,
    successMessage: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      await action();
      alert(successMessage);
      onOrderUpdate(); // 주문 목록 갱신
    } catch (err) {
      console.error("Action failed:", err);
      
      let errorMessage = "작업 처리에 실패했습니다.";
      
      if (err instanceof ApiError) {
        // API 에러인 경우 상세 메시지 표시
        if (err.data && typeof err.data === "object") {
          const data = err.data as { message?: string; error?: string };
          errorMessage = data.message || data.error || errorMessage;
        } else {
          errorMessage = `${err.status} 에러: ${err.statusText}`;
        }
        
        // 400 에러 (재고 부족 등)에 대한 추가 설명
        if (err.status === 400) {
          errorMessage += "\n\n재고가 부족하거나 판매 중지된 항목이 있을 수 있습니다.";
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 상태별 버튼 렌더링
  const renderActionButtons = () => {
    if (loading) {
      return (
        <ActionButtons>
          <ActionButton variant="primary" disabled>
            처리중...
          </ActionButton>
        </ActionButtons>
      );
    }

    switch (order.status) {
      case "PENDING":
        return (
          <ActionButtons>
            <ActionButton
              variant="reject"
              onClick={() =>
                handleAction(
                  () => rejectOrder(order.id),
                  "주문이 거절되었습니다."
                )
              }
            >
              거부
            </ActionButton>
            <ActionButton
              variant="approve"
              onClick={() =>
                handleAction(
                  () => approveOrder(order.id),
                  "주문이 승인되었습니다."
                )
              }
            >
              승인
            </ActionButton>
          </ActionButtons>
        );
      case "APPROVED":
        return (
          <ActionButtons>
            <ActionButton
              variant="primary"
              onClick={() =>
                handleAction(
                  () => startCooking(order.id),
                  "조리를 시작했습니다."
                )
              }
            >
              조리 시작
            </ActionButton>
          </ActionButtons>
        );
      case "COOKING":
        return (
          <ActionButtons>
            <ActionButton
              variant="primary"
              onClick={() =>
                handleAction(
                  () => markOrderReady(order.id),
                  "조리가 완료되었습니다."
                )
              }
            >
              조리 완료
            </ActionButton>
          </ActionButtons>
        );
      case "READY_FOR_DELIVERY":
        return (
          <ActionButtons>
            <ActionButton
              variant="primary"
              onClick={() =>
                handleAction(
                  () => startDelivery(order.id),
                  "배달을 시작했습니다."
                )
              }
            >
              배달 시작
            </ActionButton>
          </ActionButtons>
        );
      case "IN_DELIVERY":
        return (
          <ActionButtons>
            <ActionButton
              variant="primary"
              onClick={() =>
                handleAction(
                  () => completeOrder(order.id),
                  "배달이 완료되었습니다."
                )
              }
            >
              배달 완료
            </ActionButton>
          </ActionButtons>
        );
      case "COMPLETED":
      case "REJECTED":
        return null;
      default:
        return null;
    }
  };

  return (
    <DetailContent>
      <DetailCard>
        <DetailHeader>
          <HeaderInfo>
            <DetailTitle>{order.id}</DetailTitle>
            <DetailStatus>{getStatusText(order.status)}</DetailStatus>
          </HeaderInfo>
          {renderActionButtons()}
        </DetailHeader>

        <TabContainer>
          <TabButton
            active={activeTab === "order"}
            onClick={() => setActiveTab("order")}
          >
            주문정보
          </TabButton>
          <TabButton
            active={activeTab === "delivery"}
            onClick={() => setActiveTab("delivery")}
          >
            세부 사항
          </TabButton>
        </TabContainer>

        {activeTab === "order" && (
          <MenuSection>
            <MenuTitle>메뉴</MenuTitle>
            <MenuList>
              {order.orderItems.map((orderItem) => (
                <MenuGroup key={orderItem.id}>
                  <MainMenuName>
                    {orderItem.menuName} ({orderItem.style}) x{" "}
                    {orderItem.quantity}
                  </MainMenuName>
                  <SubMenuList>
                    {orderItem.selectedItems.map((item, index) => (
                      <SubMenuItem key={index}>
                        <SubMenuName>
                          {item.name} {item.quantity}개
                        </SubMenuName>
                        <SubMenuDetails>
                          {formatPrice(item.unitPrice)}
                          {item.additionalPrice > 0 &&
                            ` (+${formatPrice(item.additionalPrice)})`}
                        </SubMenuDetails>
                      </SubMenuItem>
                    ))}
                  </SubMenuList>
                </MenuGroup>
              ))}
            </MenuList>
            <TotalSection>
              <TotalLabel>총 주문 금액</TotalLabel>
              <TotalValue>{formatPrice(order.pricing.total)}</TotalValue>
            </TotalSection>
          </MenuSection>
        )}

        {activeTab === "delivery" && (
          <>
            <DetailSection>
              <DetailRow>
                <DetailLabel>주문 번호</DetailLabel>
                <DetailValue>{order.id}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>주문 시간</DetailLabel>
                <DetailValue>
                  {new Date(order.metadata.orderDate).toLocaleString("ko-KR")}
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>배달 예정일</DetailLabel>
                <DetailValue>{order.deliveryInfo.date}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>배달 예정 시간</DetailLabel>
                <DetailValue>{order.deliveryInfo.time}</DetailValue>
              </DetailRow>
            </DetailSection>

            <DetailSection>
              <DetailRow>
                <DetailLabel>고객명</DetailLabel>
                <DetailValue>{order.customer.name}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>이메일</DetailLabel>
                <DetailValue>{order.customer.email}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>전화 번호</DetailLabel>
                <DetailValue>{order.customer.phone}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>단골 고객</DetailLabel>
                <DetailValue>
                  {order.customer.isRegularCustomer ? "예" : "아니오"}
                </DetailValue>
              </DetailRow>
            </DetailSection>

            <DetailSection>
              <DetailRow>
                <DetailLabel>배달 주소</DetailLabel>
                <DetailValue>{order.deliveryInfo.address}</DetailValue>
              </DetailRow>
            </DetailSection>

            <DetailSection>
              <DetailRow>
                <DetailLabel>소계</DetailLabel>
                <DetailValue>{formatPrice(order.pricing.subtotal)}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>할인</DetailLabel>
                <DetailValue>
                  -{formatPrice(order.pricing.discount)}
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>최종 금액</DetailLabel>
                <DetailValue>{formatPrice(order.pricing.total)}</DetailValue>
              </DetailRow>
            </DetailSection>
          </>
        )}
      </DetailCard>
    </DetailContent>
  );
}
