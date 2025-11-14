'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xxl};
`;

const StatCard = styled.div`
  background-color: #1e2939;
  border: 1px solid #364153;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
`;

const StatLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: ${theme.fontSize.md};
  color: #99A1AE;
  margin-bottom: ${theme.spacing.sm};
`;

const StatValue = styled.div<{ color?: string }>`
  font-family: 'Inter', sans-serif;
  font-size: 28px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${({ color }) => color || theme.colors.text.white};
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
