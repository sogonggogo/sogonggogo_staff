import { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@/styles/theme";
import { Order, getStatusText } from "@/data/orders";
import { formatPrice, dinnerMenus } from "@/data/menus";

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

const ActionButton = styled.button<{ variant: "approve" | "reject" }>`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.bold};
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.sm};
  border: none;
  cursor: pointer;
  transition: ${theme.transition.all};

  ${({ variant }) =>
    variant === "approve"
      ? `
    background: ${theme.colors.brand.blue};
    color: ${theme.colors.text.white};
    
    &:hover {
      background: ${theme.colors.brand.blue};
      opacity: 0.9;
      box-shadow: ${theme.shadow.sm};
    }
  `
      : `
    background: ${theme.colors.background.darkest};
    color: ${theme.colors.text.light};
    border: 1px solid ${theme.colors.border.darker};
    
    &:hover {
      background: ${theme.colors.background.dark};
      border-color: ${theme.colors.border.dark};
    }
  `}
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
}

export default function OrderDetail({ order }: OrderDetailProps) {
  const [activeTab, setActiveTab] = useState<"order" | "delivery">("order");

  if (!order) {
    return (
      <DetailContent>
        <EmptyState>주문을 선택해주세요</EmptyState>
      </DetailContent>
    );
  }

  return (
    <DetailContent>
      <DetailCard>
        <DetailHeader>
          <HeaderInfo>
            <DetailTitle>{order.id}</DetailTitle>
            <DetailStatus>{getStatusText(order.status)}</DetailStatus>
          </HeaderInfo>
          {order.status !== "delivered" && (
            <ActionButtons>
              <ActionButton variant="reject">거부</ActionButton>
              <ActionButton variant="approve">승인</ActionButton>
            </ActionButtons>
          )}
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
              {order.menuId ? (
                <MenuGroup>
                  <MainMenuName>
                    {dinnerMenus.find((m) => m.id === order.menuId)?.name ||
                      "메뉴"}
                  </MainMenuName>
                  <SubMenuList>
                    {order.items.map((item, index) => (
                      <SubMenuItem key={index}>
                        <SubMenuName>
                          {item.name} {item.quantity}개
                        </SubMenuName>
                        <SubMenuDetails>
                          {formatPrice(item.price)}
                        </SubMenuDetails>
                      </SubMenuItem>
                    ))}
                  </SubMenuList>
                </MenuGroup>
              ) : (
                <MenuGroup>
                  <SubMenuList>
                    {order.items.map((item, index) => (
                      <SubMenuItem key={index}>
                        <SubMenuName>
                          {item.name} {item.quantity}개
                        </SubMenuName>
                        <SubMenuDetails>
                          {formatPrice(item.price)}
                        </SubMenuDetails>
                      </SubMenuItem>
                    ))}
                  </SubMenuList>
                </MenuGroup>
              )}
            </MenuList>
            <TotalSection>
              <TotalLabel>총 주문 금액</TotalLabel>
              <TotalValue>{formatPrice(order.total)}</TotalValue>
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
                <DetailValue>{order.time}</DetailValue>
              </DetailRow>
            </DetailSection>

            <DetailSection>
              <DetailRow>
                <DetailLabel>고객명</DetailLabel>
                <DetailValue>{order.customer}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>전화 번호</DetailLabel>
                <DetailValue>{order.phone}</DetailValue>
              </DetailRow>
            </DetailSection>

            <DetailSection>
              <DetailRow>
                <DetailLabel>배달 주소</DetailLabel>
                <DetailValue>{order.address}</DetailValue>
              </DetailRow>
            </DetailSection>
          </>
        )}
      </DetailCard>
    </DetailContent>
  );
}
