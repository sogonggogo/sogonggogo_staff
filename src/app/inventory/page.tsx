"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@/styles/theme";
import { mockInventory, InventoryItem } from "@/data/inventory";
import { ChevronDown, Search } from "lucide-react";

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
  min-width: 120px;
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

const CategoryButton = styled.button`
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
  min-width: 200px;
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

const Th = styled.th`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  text-align: left;
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
  border-right: 1px solid ${theme.colors.border.dark};
  border-bottom: 1px solid ${theme.colors.border.dark};

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

const StockStatus = styled.span<{ hasStock: boolean }>`
  color: ${({ hasStock }) =>
    hasStock ? theme.colors.status.completed : theme.colors.status.danger};
  font-weight: ${theme.fontWeight.bold};
`;

const PriceText = styled.span`
  color: ${theme.colors.text.white};
  font-weight: ${theme.fontWeight.medium};
`;

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [saleStatus, setSaleStatus] = useState<
    "전체" | "판매대기" | "판매승인" | "판매중지"
  >("전체");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const filteredItems = mockInventory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      saleStatus === "전체" || item.saleStatus === saleStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(filteredItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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
            placeholder="상품명을 입력해주세요"
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
              active={saleStatus === "판매대기"}
              onClick={() => setSaleStatus("판매대기")}
            >
              판매대기
            </StatusButton>
            <StatusButton
              active={saleStatus === "판매승인"}
              onClick={() => setSaleStatus("판매승인")}
            >
              판매승인
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
          <FilterLabel>상품 카테고리</FilterLabel>
          <CategoryButton>
            상품 카테고리 찾기
            <ChevronDown size={16} />
          </CategoryButton>
        </FilterRow>
        <FilterRow>
          <FilterLabel>기계출 카테고리</FilterLabel>
          <CategoryButton>
            기계출 카테고리 찾기
            <ChevronDown size={16} />
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
              <Th>
                <Checkbox
                  type="checkbox"
                  checked={
                    filteredItems.length > 0 &&
                    selectedItems.length === filteredItems.length
                  }
                  onChange={handleSelectAll}
                />
              </Th>
              <Th>상품ID</Th>
              <Th>상품명</Th>
              <Th>현재 상태</Th>
              <Th>
                재고
                <ChevronDown size={14} style={{ marginLeft: 4 }} />
              </Th>
              <Th>재고 유무</Th>
              <Th>가격</Th>
              <Th>예상판매가</Th>
              <Th>증감수량</Th>
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
                  <StockManageButton>재고 관리</StockManageButton>
                </Td>
                <Td>
                  <StockStatus hasStock={item.hasStock}>
                    {item.hasStock ? "O" : "X"}
                  </StockStatus>
                </Td>
                <Td>
                  <PriceText>{item.price.toLocaleString("ko-KR")}원</PriceText>
                </Td>
                <Td>
                  <PriceText>
                    {item.expectedPrice.toLocaleString("ko-KR")}원
                  </PriceText>
                </Td>
                <Td>
                  <PriceText>{item.changeQuantity}</PriceText>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
