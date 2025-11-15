import styled from "@emotion/styled";
import { Minus, Plus } from "lucide-react";
import { theme } from "@/styles/theme";
import { Order } from "@/data/orders";

const DetailContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.xxl};
  background: ${theme.colors.background.primary};
`;

const DetailCard = styled.div`
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadow.sm};
  max-width: 800px;
  margin: 0 auto;
`;

const DetailHeader = styled.div`
  margin-bottom: ${theme.spacing.xxl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.border.secondary};
`;

const DetailTitle = styled.h1`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize["3xl"]};
  font-weight: ${theme.fontWeight.extrabold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const DetailStatus = styled.div`
  display: inline-block;
  background: ${theme.colors.brand.blue};
  color: ${theme.colors.text.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
`;

const DetailSection = styled.div`
  margin-bottom: ${theme.spacing.xxl};
`;

const SectionTitle = styled.h3`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.extrabold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.border.secondary};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: ${theme.colors.text.tertiary};
  font-weight: ${theme.fontWeight.normal};
`;

const DetailValue = styled.span`
  color: ${theme.colors.text.primary};
  font-weight: ${theme.fontWeight.bold};
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.md};
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontFamily.nanumGothic};
`;

const MenuName = styled.span`
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
`;

const MenuInfo = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.text.secondary};
`;

const OrderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xxl};
  padding-top: ${theme.spacing.xxl};
  border-top: 2px solid ${theme.colors.border.secondary};
`;

const TimeControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  flex: 1;
  background: ${theme.colors.background.light};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
`;

const TimeButton = styled.button`
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.primary};
  width: ${theme.sizes.buttonMd};
  height: ${theme.sizes.buttonMd};
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.border.secondary};
    border-color: #ccc;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const TimeDisplay = styled.span`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.extrabold};
  color: ${theme.colors.text.primary};
  flex: 1;
  text-align: center;
`;

const ConfirmButton = styled.button`
  background: ${theme.colors.brand.blue};
  color: ${theme.colors.text.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing["4xl"]};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.extrabold};
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.brand.blueHover};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${theme.colors.text.muted};
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
          <DetailTitle>{order.id}</DetailTitle>
          <DetailStatus>{order.statusText}</DetailStatus>
        </DetailHeader>

        <DetailSection>
          <SectionTitle>주문 정보</SectionTitle>
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
          <SectionTitle>주문 메뉴</SectionTitle>
          <MenuList>
            {order.items.map((item, index) => (
              <MenuItem key={index}>
                <div>
                  <MenuName>{item.name}</MenuName>
                </div>
                <MenuInfo>
                  {item.quantity}개 × {item.price.toLocaleString()}원
                </MenuInfo>
              </MenuItem>
            ))}
          </MenuList>
          <DetailRow
            style={{
              marginTop: theme.spacing.lg,
              paddingTop: theme.spacing.lg,
            }}
          >
            <DetailLabel>총 금액</DetailLabel>
            <DetailValue
              style={{
                fontSize: theme.fontSize.xl,
                color: theme.colors.brand.blue,
              }}
            >
              {order.total.toLocaleString()}원
            </DetailValue>
          </DetailRow>
        </DetailSection>

        <OrderActions>
          <TimeControl>
            <TimeButton>
              <Minus size={20} />
            </TimeButton>
            <TimeDisplay>5-10분</TimeDisplay>
            <TimeButton>
              <Plus size={20} />
            </TimeButton>
          </TimeControl>
          <ConfirmButton>주문 확인</ConfirmButton>
        </OrderActions>
      </DetailCard>
    </DetailContent>
  );
}
