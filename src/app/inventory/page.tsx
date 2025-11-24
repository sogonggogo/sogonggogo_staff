"use client";

import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { theme } from "@/styles/theme";
import { mockInventory } from "@/data/inventory";
import { ChevronDown } from "lucide-react";

const Container = styled.div`
  padding: ${theme.spacing.xxxl};
  background: ${theme.colors.background.dark};
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  margin-bottom: ${theme.spacing.xxxl};
`;

const Title = styled.h1`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize["3xl"]};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
`;

const Subtitle = styled.p`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.tertiary};
`;

const FilterSection = styled.div`
  background: ${theme.colors.background.darker};
  border: 1px solid ${theme.colors.border.dark};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.label`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.white};
  min-width: 100px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.background.darkest};
  border: 1px solid ${theme.colors.border.darker};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.brand.blue};
  }
`;

const StatusButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const StatusButton = styled.button<{ active: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  border: ${({ active }) =>
    active ? "none" : `1px solid ${theme.colors.border.darker}`};
  background: ${({ active }) =>
    active ? theme.colors.brand.blue : theme.colors.background.darkest};
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${({ active }) =>
      active ? theme.colors.brand.blueHover : theme.colors.background.dark};
  }
`;

const CategoryButton = styled.div`
  position: relative;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.background.darkest};
  border: 1px solid ${theme.colors.border.darker};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.background.dark};
  }
`;

const CategoryDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${theme.colors.background.darker};
  border: 1px solid ${theme.colors.border.dark};
  border-radius: ${theme.borderRadius.sm};
  margin-top: ${theme.spacing.xs};
  z-index: 10;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  box-shadow: ${theme.shadow.lg};
  max-height: 300px;
  overflow-y: auto;
`;

const CategoryOption = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.white};
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.background.darkest};
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const ProductCount = styled.div`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.tertiary};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
`;

const ActionButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.background.darkest};
  border: 1px solid ${theme.colors.border.darker};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.background.dark};
  }
`;

const PrimaryButton = styled(ActionButton)`
  background: ${theme.colors.brand.blue};
  border: none;

  &:hover {
    background: ${theme.colors.brand.blueHover};
  }
`;

const PageSizeSelect = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.background.darkest};
  border: 1px solid ${theme.colors.border.darker};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  cursor: pointer;
`;

const TableContainer = styled.div`
  background: ${theme.colors.background.darker};
  border: 1px solid ${theme.colors.border.dark};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: ${theme.colors.background.darkest};
`;

const Th = styled.th<{ width?: string }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  text-align: left;
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
  border-right: 1px solid ${theme.colors.border.dark};
  border-bottom: 1px solid ${theme.colors.border.dark};
  width: ${({ width }) => width || 'auto'};

  &:last-child {
    border-right: none;
  }
`;

const Td = styled.td`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.light};
  border-right: 1px solid ${theme.colors.border.dark};
  border-bottom: 1px solid ${theme.colors.border.dark};

  &:last-child {
    border-right: none;
  }
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${theme.colors.border.dark};
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.background.darkest};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const ProductNameBadge = styled.span`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.background.darkest};
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.sm};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.background.darkest};
  border: 1px solid ${theme.colors.border.darker};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.sm};
`;

const StockManageButton = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.brand.blue};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.white};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.sm};
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.brand.blueHover};
  }
`;

const PriceText = styled.span`
  color: ${theme.colors.text.white};
  font-weight: ${theme.fontWeight.medium};
`;

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isProductCategoryDropdownOpen, setIsProductCategoryDropdownOpen] =
    useState(false);
  const [selectedProductCategory, setSelectedProductCategory] =
    useState<string>("전체");
  const [saleStatus, setSaleStatus] = useState<"전체" | "판매중" | "판매중지">(
    "전체"
  );
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // 데이터에서 고유한 카테고리 추출
  const uniqueCategories = [
    "전체",
    ...Array.from(new Set(mockInventory.map((item) => item.category))),
  ];

  const filteredItems = mockInventory.filter((item) => {
    // 검색어 필터링 (상품명 또는 상품ID)
    const matchesSearch = searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productId.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    // 판매상태 필터링
    const matchesStatus =
      saleStatus === "전체" || item.saleStatus === saleStatus;

    // 카테고리 필터링
    const matchesCategory =
      selectedProductCategory === "전체" ||
      item.category === selectedProductCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const productCategoryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        productCategoryDropdownRef.current &&
        !productCategoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductCategoryDropdownOpen(false);
      }
    };

    if (isProductCategoryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProductCategoryDropdownOpen]);

  return (
    <Container>
      <HeaderSection>
        <Title>재고 관리 시스템</Title>
        <Subtitle>재고 현황을 확인하고 관리하세요</Subtitle>
      </HeaderSection>

      <FilterSection>
        <FilterRow>
          <FilterLabel>검색어</FilterLabel>
          <SearchInput
            type="text"
            placeholder="상품명 또는 상품ID를 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterRow>
        <FilterRow>
          <FilterLabel>판매상태</FilterLabel>
          <StatusButtonGroup>
            <StatusButton
              active={saleStatus === "전체"}
              onClick={() => setSaleStatus("전체")}
            >
              전체
            </StatusButton>
            <StatusButton
              active={saleStatus === "판매중"}
              onClick={() => setSaleStatus("판매중")}
            >
              판매중
            </StatusButton>
            <StatusButton
              active={saleStatus === "판매중지"}
              onClick={() => setSaleStatus("판매중지")}
            >
              판매중지
            </StatusButton>
          </StatusButtonGroup>
        </FilterRow>
        <FilterRow>
          <FilterLabel>카테고리</FilterLabel>
          <CategoryButton
            ref={productCategoryDropdownRef}
            onClick={() =>
              setIsProductCategoryDropdownOpen(!isProductCategoryDropdownOpen)
            }
          >
            {selectedProductCategory === "전체"
              ? "카테고리 찾기"
              : selectedProductCategory}
            <ChevronDown size={16} />
            <CategoryDropdown isOpen={isProductCategoryDropdownOpen}>
              {uniqueCategories.map((category) => (
                <CategoryOption
                  key={category}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProductCategory(category);
                    setIsProductCategoryDropdownOpen(false);
                  }}
                >
                  {category}
                </CategoryOption>
              ))}
            </CategoryDropdown>
          </CategoryButton>
        </FilterRow>
      </FilterSection>

      <ActionBar>
        <ProductCount>상품수량 총 {filteredItems.length}개</ProductCount>
        <ActionButtons>
          <PageSizeSelect>
            <option>20개씩 보기</option>
            <option>50개씩 보기</option>
            <option>100개씩 보기</option>
          </PageSizeSelect>
          <ActionButton>판매상태 변경</ActionButton>
          <ActionButton>재고기간 변경</ActionButton>
          <ActionButton>선택</ActionButton>
          <PrimaryButton>+ 상품 등록</PrimaryButton>
        </ActionButtons>
      </ActionBar>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <Th width="80px">선택</Th>
              <Th width="120px">상품ID</Th>
              <Th>상품명</Th>
              <Th width="120px">현재 상태</Th>
              <Th width="100px">
                재고
                <ChevronDown size={14} style={{ marginLeft: 4 }} />
              </Th>
              <Th width="120px">가격</Th>
              <Th width="100px">증감수량</Th>
              <Th width="120px">재고 관리</Th>
            </tr>
          </TableHeader>
          <tbody>
            {filteredItems.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Checkbox
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </Td>
                <Td>
                  <PriceText>{item.productId}</PriceText>
                </Td>
                <Td>
                  <ProductNameBadge>{item.name}</ProductNameBadge>
                </Td>
                <Td>
                  <StatusBadge>{item.saleStatus}</StatusBadge>
                </Td>
                <Td>
                  <PriceText>{item.quantity}</PriceText>
                </Td>
                <Td>
                  <PriceText>{item.price.toLocaleString("ko-KR")}원</PriceText>
                </Td>
                <Td>
                  <PriceText>{item.changeQuantity}</PriceText>
                </Td>
                <Td>
                  <StockManageButton>재고 관리</StockManageButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
