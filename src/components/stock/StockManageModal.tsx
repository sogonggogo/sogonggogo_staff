import { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@/styles/theme";
import { UIStockItem } from "@/utils/stock/stockAdapter";
import { X } from "lucide-react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${theme.colors.background.darker};
  border: 1px solid ${theme.colors.border.dark};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxxl};
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border.dark};
`;

const ModalTitle = styled.h2`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize["2xl"]};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text.tertiary};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transition.all};

  &:hover {
    color: ${theme.colors.text.white};
  }
`;

const InfoSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background.darkest};
  border-radius: ${theme.borderRadius.sm};
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: ${theme.colors.text.tertiary};
  font-weight: ${theme.fontWeight.normal};
`;

const InfoValue = styled.span`
  color: ${theme.colors.text.white};
  font-weight: ${theme.fontWeight.medium};
`;

const FormSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const FormLabel = styled.label`
  display: block;
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
  font-weight: ${theme.fontWeight.medium};
`;

const InputGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: ${theme.spacing.md};
  background: ${theme.colors.background.darkest};
  border: 1px solid ${theme.colors.border.darker};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};

  &:focus {
    outline: none;
    border-color: ${theme.colors.brand.blue};
  }

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }

  /* 스피너 제거 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const QuickButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.background.darkest};
  border: 1px solid ${theme.colors.border.darker};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.sm};
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.background.dark};
    border-color: ${theme.colors.brand.blue};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.xl};
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.bold};
  cursor: pointer;
  transition: ${theme.transition.all};

  ${({ variant }) =>
    variant === "primary"
      ? `
    background: ${theme.colors.brand.blue};
    border: none;
    color: ${theme.colors.text.white};

    &:hover {
      background: ${theme.colors.brand.blueHover};
      box-shadow: ${theme.shadow.sm};
    }
  `
      : `
    background: ${theme.colors.background.darkest};
    border: 1px solid ${theme.colors.border.darker};
    color: ${theme.colors.text.white};

    &:hover {
      background: ${theme.colors.background.dark};
      border-color: ${theme.colors.border.dark};
    }
  `}
`;

const StockChangePreview = styled.div`
  padding: ${theme.spacing.md};
  background: ${theme.colors.background.darkest};
  border: 1px solid ${theme.colors.border.darker};
  border-radius: ${theme.borderRadius.sm};
  margin-top: ${theme.spacing.md};
`;

const PreviewText = styled.div`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.white};
  text-align: center;
`;

const StockValue = styled.span<{ type: "current" | "new" }>`
  font-weight: ${theme.fontWeight.bold};
  color: ${({ type }) =>
    type === "current" ? theme.colors.text.tertiary : theme.colors.brand.blue};
  margin: 0 ${theme.spacing.xs};
`;

interface StockManageModalProps {
  item: UIStockItem;
  onClose: () => void;
  onSave: (itemId: number, newQuantity: number) => void;
}

export default function StockManageModal({
  item,
  onClose,
  onSave,
}: StockManageModalProps) {
  const [changeAmount, setChangeAmount] = useState<string>("");
  const [changeType, setChangeType] = useState<"add" | "subtract">("add");

  const calculatedNewQuantity = () => {
    const amount = parseInt(changeAmount) || 0;
    if (changeType === "add") {
      return item.quantity + amount;
    } else {
      return Math.max(0, item.quantity - amount);
    }
  };

  const handleQuickAdd = (amount: number) => {
    setChangeType("add");
    setChangeAmount(amount.toString());
  };

  const handleQuickSubtract = (amount: number) => {
    setChangeType("subtract");
    setChangeAmount(amount.toString());
  };

  const handleSave = () => {
    const newQuantity = calculatedNewQuantity();
    onSave(item.id, newQuantity);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>재고 관리</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <InfoSection>
          <InfoRow>
            <InfoLabel>상품ID</InfoLabel>
            <InfoValue>{item.productId}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>상품명</InfoLabel>
            <InfoValue>{item.name}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>카테고리</InfoLabel>
            <InfoValue>{item.category}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>현재 재고</InfoLabel>
            <InfoValue>
              {item.quantity} {item.unit}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>가격</InfoLabel>
            <InfoValue>{item.price.toLocaleString("ko-KR")}원</InfoValue>
          </InfoRow>
        </InfoSection>

        <FormSection>
          <FormLabel>재고 조정</FormLabel>
          <InputGroup>
            <QuickButton onClick={() => setChangeType("add")}>
              {changeType === "add" ? "✓ " : ""}증가
            </QuickButton>
            <QuickButton onClick={() => setChangeType("subtract")}>
              {changeType === "subtract" ? "✓ " : ""}감소
            </QuickButton>
            <Input
              type="number"
              placeholder="수량 입력"
              value={changeAmount}
              onChange={(e) => setChangeAmount(e.target.value)}
              min="0"
            />
          </InputGroup>
        </FormSection>

        <FormSection>
          <FormLabel>빠른 조정</FormLabel>
          <InputGroup>
            <QuickButton onClick={() => handleQuickAdd(100)}>+100</QuickButton>
            <QuickButton onClick={() => handleQuickAdd(50)}>+50</QuickButton>
            <QuickButton onClick={() => handleQuickAdd(10)}>+10</QuickButton>
            <QuickButton onClick={() => handleQuickSubtract(10)}>
              -10
            </QuickButton>
            <QuickButton onClick={() => handleQuickSubtract(50)}>
              -50
            </QuickButton>
            <QuickButton onClick={() => handleQuickSubtract(100)}>
              -100
            </QuickButton>
          </InputGroup>
        </FormSection>

        {changeAmount && (
          <StockChangePreview>
            <PreviewText>
              <StockValue type="current">{item.quantity}</StockValue>→
              <StockValue type="new">{calculatedNewQuantity()}</StockValue>
              {item.unit}
            </PreviewText>
          </StockChangePreview>
        )}

        <ButtonGroup>
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSave}>
            저장
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
}
