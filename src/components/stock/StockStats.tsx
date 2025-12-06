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
  background: ${theme.colors.background.darker};
  border: 1px solid ${theme.colors.border.dark};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  transition: ${theme.transition.all};

  &:hover {
    border-color: ${theme.colors.border.light};
    box-shadow: ${theme.shadow.sm};
  }
`;

const StatLabel = styled.div`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.tertiary};
  margin-bottom: ${theme.spacing.sm};
  font-weight: ${theme.fontWeight.normal};
`;

const StatValue = styled.div<{ color?: string }>`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize['3xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${({ color }) => color || theme.colors.brand.blue};
`;

interface StockStatsProps {
  totalItems: number;
  lowStockCount: number;
  mediumStockCount: number;
  goodStockCount: number;
}

export default function StockStats({
  totalItems,
  lowStockCount,
  mediumStockCount,
  goodStockCount
}: StockStatsProps) {
  return (
    <StatsContainer>
      <StatCard>
        <StatLabel>전체 품목</StatLabel>
        <StatValue>{totalItems}</StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>재고 부족</StatLabel>
        <StatValue color={theme.colors.status.danger}>{lowStockCount}</StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>재고 보통</StatLabel>
        <StatValue color={theme.colors.status.warning}>{mediumStockCount}</StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>재고 충분</StatLabel>
        <StatValue color={theme.colors.status.completed}>{goodStockCount}</StatValue>
      </StatCard>
    </StatsContainer>
  );
}
