import { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@/styles/theme";
import { X } from "lucide-react";
import { InventoryStatus } from "@/types/api";

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
  max-width: 500px;
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

const FormSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const FormLabel = styled.label`
  display: block;
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.light};
  margin-bottom: ${theme.spacing.sm};
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.background.darkest};
  border: 1px solid ${theme.colors.border.darker};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  transition: ${theme.transition.all};

  &:focus {
    outline: none;
    border-color: ${theme.colors.brand.blue};
  }

  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`;

const StatusButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const StatusButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${theme.spacing.md};
  background: ${({ active }) =>
    active ? theme.colors.brand.blue : theme.colors.background.darkest};
  border: 1px solid
    ${({ active }) =>
      active ? theme.colors.brand.blue : theme.colors.border.darker};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${({ active }) =>
      active ? theme.colors.brand.blue : theme.colors.background.dark};
    border-color: ${theme.colors.brand.blue};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

const Button = styled.button<{ variant: "primary" | "secondary" }>`
  flex: 1;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.bold};
  cursor: pointer;
  transition: ${theme.transition.all};
  border: none;

  ${({ variant }) =>
    variant === "primary"
      ? `
    background: ${theme.colors.brand.blue};
    color: ${theme.colors.text.white};
    
    &:hover {
      background: ${theme.colors.brand.blueHover};
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.status.danger};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.sm};
  margin-top: ${theme.spacing.xs};
`;

interface AddInventoryModalProps {
  onClose: () => void;
  onSave: (data: {
    name: string;
    stock: number;
    price: number;
    status: InventoryStatus;
  }) => Promise<void>;
}

export default function AddInventoryModal({
  onClose,
  onSave,
}: AddInventoryModalProps) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState<InventoryStatus>("ON_SALE");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "상품명을 입력해주세요.";
    }

    const stockNum = parseInt(stock);
    if (!stock || isNaN(stockNum) || stockNum < 0) {
      newErrors.stock = "올바른 재고 수량을 입력해주세요.";
    }

    const priceNum = parseInt(price);
    if (!price || isNaN(priceNum) || priceNum < 0) {
      newErrors.price = "올바른 가격을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await onSave({
        name: name.trim(),
        stock: parseInt(stock),
        price: parseInt(price),
        status,
      });
      onClose();
    } catch (err) {
      console.error("Failed to add inventory:", err);
      setErrors({ submit: "상품 등록에 실패했습니다." });
    } finally {
      setLoading(false);
    }
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
          <ModalTitle>상품 등록</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <FormSection>
          <FormLabel>상품명 *</FormLabel>
          <FormInput
            type="text"
            placeholder="예: 와인"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormSection>

        <FormSection>
          <FormLabel>재고 수량 *</FormLabel>
          <FormInput
            type="number"
            placeholder="예: 90"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min="0"
          />
          {errors.stock && <ErrorMessage>{errors.stock}</ErrorMessage>}
        </FormSection>

        <FormSection>
          <FormLabel>가격 (원) *</FormLabel>
          <FormInput
            type="number"
            placeholder="예: 25000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
          />
          {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
        </FormSection>

        <FormSection>
          <FormLabel>판매 상태 *</FormLabel>
          <StatusButtonGroup>
            <StatusButton
              active={status === "ON_SALE"}
              onClick={() => setStatus("ON_SALE")}
              type="button"
            >
              판매중
            </StatusButton>
            <StatusButton
              active={status === "STOPPED"}
              onClick={() => setStatus("STOPPED")}
              type="button"
            >
              판매중지
            </StatusButton>
          </StatusButtonGroup>
        </FormSection>

        {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

        <ButtonGroup>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "등록중..." : "등록"}
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
}

