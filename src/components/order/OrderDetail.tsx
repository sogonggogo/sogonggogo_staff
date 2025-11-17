import styled from "@emotion/styled";
import { theme } from "@/styles/theme";
import { Order } from "@/data/orders";

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
  margin-bottom: ${theme.spacing.xxxl};
  padding-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.border.dark};
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
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

const OrderSummary = styled.div`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.light};
  margin-bottom: ${theme.spacing.xxxl};
`;

const DetailSection = styled.div`
  margin-bottom: ${theme.spacing.xxl};
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.lg} 0;
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};

  &:not(:last-child) {
    border-bottom: 1px solid ${theme.colors.border.darker};
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

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background.darkest};
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid ${theme.colors.border.darker};
  font-family: ${theme.fontFamily.nanumGothic};
`;

const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const MenuName = styled.div`
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
`;

const MenuDetails = styled.div`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.text.tertiary};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.md};
`;

const ActionButton = styled.button`
  background: transparent;
  color: ${theme.colors.text.light};
  border: 1px solid ${theme.colors.border.darker};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.background.darkest};
    border-color: ${theme.colors.border.dark};
  }
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
            <DetailStatus>{order.statusText}</DetailStatus>
          </HeaderInfo>
        </DetailHeader>

        <OrderSummary>
          메뉴 {order.items.length}개 · 총{" "}
          {order.total.toLocaleString()}원 (결제완료)
        </OrderSummary>

        <DetailSection>
          <DetailRow>
            <DetailLabel>주문 번호</DetailLabel>
            <DetailValue>{order.id}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>주문 시간</DetailLabel>
            <DetailValue>{order.time}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>배달 주소</DetailLabel>
            <DetailValue>{order.address}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>전화번호</DetailLabel>
            <DetailValue>{order.phone}</DetailValue>
          </DetailRow>
        </DetailSection>

        <DetailSection>
          <DetailRow>
            <DetailLabel>결제 방법</DetailLabel>
            <DetailValue>카드 결제</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>할인</DetailLabel>
            <DetailValue>없음</DetailValue>
          </DetailRow>
        </DetailSection>

        <MenuSection>
          <MenuTitle>메뉴</MenuTitle>
          <MenuList>
            {order.items.map((item, index) => (
              <MenuItem key={index}>
                <MenuInfo>
                  <MenuName>{item.name}</MenuName>
                  <MenuDetails>
                    {item.quantity}개 · 총 {item.price.toLocaleString()}원
                    (결제완료)
                  </MenuDetails>
                </MenuInfo>
              </MenuItem>
            ))}
          </MenuList>
        </MenuSection>

        <ActionButtons>
          <ActionButton>주문전표 재출력</ActionButton>
          <ActionButton>배달 안내 출력</ActionButton>
        </ActionButtons>
      </DetailCard>
    </DetailContent>
  );
}
