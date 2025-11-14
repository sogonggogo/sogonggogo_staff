'use client';

import styled from '@emotion/styled';

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

interface InventoryStatsProps {
  totalItems: number;
  lowStockCount: number;
  mediumStockCount: number;
  goodStockCount: number;
}

export default function InventoryStats({
  totalItems,
  lowStockCount,
  mediumStockCount,
  goodStockCount
}: InventoryStatsProps) {
  return (
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
  );
}
