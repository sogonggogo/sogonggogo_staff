'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxxl};
`;

const StatCard = styled.div`
  background: ${theme.colors.background.secondary};
  border: 2px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadow.sm};
  transition: ${theme.transition.allNormal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadow.lg};
    border-color: ${theme.colors.brand.primary};
  }
`;

const StatLabel = styled.div`
  font-family: ${theme.fontFamily.ttangsbudae};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.muted};
  margin-bottom: ${theme.spacing.md};
`;

const StatValue = styled.div`
  font-family: ${theme.fontFamily.ttangsbudae};
  font-size: ${theme.fontSize['7xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.brand.primary};
  line-height: 1;
`;

interface OrderStatsProps {
  pendingCount: number;
  preparingCount: number;
  completedCount: number;
}

export default function OrderStats({ pendingCount, preparingCount, completedCount }: OrderStatsProps) {
  return (
    <StatsGrid>
      <StatCard>
        <StatLabel>대기중</StatLabel>
        <StatValue>{pendingCount}</StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>조리중</StatLabel>
        <StatValue>{preparingCount}</StatValue>
      </StatCard>
      <StatCard>
        <StatLabel>완료</StatLabel>
        <StatValue>{completedCount}</StatValue>
      </StatCard>
    </StatsGrid>
  );
}
