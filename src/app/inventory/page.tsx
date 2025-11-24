"use client";

import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { theme } from "@/styles/theme";
import { mockInventory, type InventoryItem } from "@/data/inventory";
import { ChevronDown } from "lucide-react";
import {
  inventoryTableColumns,
  saleStatusOptions,
  pageSizeOptions,
  type SaleStatusType,
} from "@/config/inventoryTableConfig";

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
  width: ${({ width }) => width || "auto"};

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
  const [saleStatus, setSaleStatus] = useState<SaleStatusType>("전체");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // 데이터에서 고유한 카테고리 추출
  const uniqueCategories = [
    "전체",
    ...Array.from(new Set(mockInventory.map((item) => item.category))),
  ];

  // 테이블 셀 렌더링 함수
  const renderCell = (columnId: string, item: InventoryItem) => {
    switch (columnId) {
      case "select":
        return (
          <Checkbox
            type="checkbox"
            checked={selectedItems.includes(item.id)}
            onChange={() => handleSelectItem(item.id)}
          />
        );
      case "productId":
        return <PriceText>{item.productId}</PriceText>;
      case "name":
        return <ProductNameBadge>{item.name}</ProductNameBadge>;
      case "saleStatus":
        return <StatusBadge>{item.saleStatus}</StatusBadge>;
      case "quantity":
        return <PriceText>{item.quantity}</PriceText>;
      case "price":
        return <PriceText>{item.price.toLocaleString("ko-KR")}원</PriceText>;
      case "changeQuantity":
        return <PriceText>{item.changeQuantity}</PriceText>;
      case "manage":
        return <StockManageButton>재고 관리</StockManageButton>;
      default:
        return null;
    }
  };

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
            {saleStatusOptions.map((status) => (
              <StatusButton
                key={status}
                active={saleStatus === status}
                onClick={() => setSaleStatus(status)}
              >
                {status}
              </StatusButton>
            ))}
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
            {pageSizeOptions.map((size) => (
              <option key={size}>{size}개씩 보기</option>
            ))}
          </PageSizeSelect>
          <ActionButton>판매상태 변경</ActionButton>
          <ActionButton>선택항목 삭제</ActionButton>
          <PrimaryButton>+ 상품 등록</PrimaryButton>
        </ActionButtons>
      </ActionBar>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              {inventoryTableColumns.map((column) => (
                <Th key={column.id} width={column.width}>
                  {column.label}
                  {column.sortable && (
                    <ChevronDown size={14} style={{ marginLeft: 4 }} />
                  )}
                </Th>
              ))}
            </tr>
          </TableHeader>
          <tbody>
            {filteredItems.map((item) => (
              <Tr key={item.id}>
                {inventoryTableColumns.map((column) => (
                  <Td key={column.id}>{renderCell(column.id, item)}</Td>
                ))}
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
