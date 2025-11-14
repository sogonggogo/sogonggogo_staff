'use client';

import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { mockInventory } from '@/data/inventory';

// Styled Components
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background-color: #1e2939;
  border: 1px solid #364153;
  border-radius: 12px;
  padding: 20px;
`;

const StatLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #99A1AE;
  margin-bottom: 8px;
`;

const StatValue = styled.div<{ color?: string }>`
  font-family: 'Inter', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: ${({ color }) => color || '#FFFFFF'};
`;

const InventoryTableWrapper = styled.div`
  background-color: #1e2939;
  border: 1px solid #364153;
  border-radius: 12px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #0a0f19;
  border-bottom: 1px solid #364153;
`;

const Th = styled.th`
  padding: 16px;
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #99A1AE;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #364153;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(21, 101, 252, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #D1D5DC;
`;

const ItemName = styled(Td)`
  font-weight: 600;
  color: #FFFFFF;
`;

const CategoryBadge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  background-color: #364153;
  color: #D1D5DC;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
`;

const Quantity = styled.span<{ level: string }>`
  font-weight: 600;
  color: ${({ level }) => {
    const colors = {
      low: '#DC2626',
      medium: '#F59E0B',
      good: '#10B981',
    };
    return colors[level as keyof typeof colors];
  }};
`;

const StockBadge = styled.span<{ level: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 16px;
  background-color: ${({ level }) => {
    const colors = {
      low: '#DC262620',
      medium: '#F59E0B20',
      good: '#10B98120',
    };
    return colors[level as keyof typeof colors];
  }};
  color: ${({ level }) => {
    const colors = {
      low: '#DC2626',
      medium: '#F59E0B',
      good: '#10B981',
    };
    return colors[level as keyof typeof colors];
  }};
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const getIcon = (level: string) => {
  const icons = {
    low: AlertTriangle,
    medium: TrendingDown,
    good: TrendingUp,
  };
  return icons[level as keyof typeof icons];
};

export default function InventoryPage() {
  const lowStockCount = mockInventory.filter(item => item.stockLevel === 'low').length;
  const mediumStockCount = mockInventory.filter(item => item.stockLevel === 'medium').length;
  const goodStockCount = mockInventory.filter(item => item.stockLevel === 'good').length;
  const totalItems = mockInventory.length;

  return (
    <PageLayout title="재고 관리" subtitle="식자재 재고를 확인하고 관리합니다">
      <StatsContainer>
        <StatCard>
          <StatLabel>전체 품목</StatLabel>
          <StatValue>{totalItems}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>재고 부족</StatLabel>
          <StatValue color="#DC2626">{lowStockCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>재고 보통</StatLabel>
          <StatValue color="#F59E0B">{mediumStockCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>재고 충분</StatLabel>
          <StatValue color="#10B981">{goodStockCount}</StatValue>
        </StatCard>
      </StatsContainer>

      <InventoryTableWrapper>
        <Table>
          <TableHeader>
            <tr>
              <Th>품목명</Th>
              <Th>카테고리</Th>
              <Th>현재 재고</Th>
              <Th>최소 재고</Th>
              <Th>상태</Th>
              <Th>마지막 입고</Th>
            </tr>
          </TableHeader>
          <tbody>
            {mockInventory.map((item) => {
              const Icon = getIcon(item.stockLevel);
              return (
                <Tr key={item.id}>
                  <ItemName>{item.name}</ItemName>
                  <Td>
                    <CategoryBadge>{item.category}</CategoryBadge>
                  </Td>
                  <Td>
                    <Quantity level={item.stockLevel}>
                      {item.quantity} {item.unit}
                    </Quantity>
                  </Td>
                  <Td>
                    {item.minStock} {item.unit}
                  </Td>
                  <Td>
                    <StockBadge level={item.stockLevel}>
                      <IconWrapper>
                        <Icon size={14} />
                      </IconWrapper>
                      {item.stockLevelText}
                    </StockBadge>
                  </Td>
                  <Td>{item.lastRestocked}</Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </InventoryTableWrapper>
    </PageLayout>
  );
}
