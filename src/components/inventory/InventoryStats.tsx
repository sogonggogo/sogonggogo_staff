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
  background-color: ${theme.colors.inventory.cardBg};
  border: 1px solid ${theme.colors.inventory.badgeBg};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
`;

const StatLabel = styled.div`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.inventory.labelText};
  margin-bottom: ${theme.spacing.sm};
`;

const StatValue = styled.div<{ color?: string }>`
  font-family: ${theme.fontFamily.nanumGothic};
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
        <StatValue color={theme.colors.inventory.danger}>{lowStockCount}</StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>재고 보통</StatLabel>
        <StatValue color={theme.colors.inventory.warning}>{mediumStockCount}</StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>재고 충분</StatLabel>
        <StatValue color={theme.colors.inventory.success}>{goodStockCount}</StatValue>
      </StatCard>
    </StatsContainer>
  );
}
