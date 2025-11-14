'use client';

import styled from '@emotion/styled';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: var(--card);
  border: 2px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--primary);
  }
`;

const StatLabel = styled.div`
  font-family: var(--font-ttangsbudae);
  font-size: 16px;
  font-weight: 500;
  color: var(--muted-foreground);
  margin-bottom: 12px;
`;

const StatValue = styled.div`
  font-family: var(--font-ttangsbudae);
  font-size: 42px;
  font-weight: 700;
  color: var(--primary);
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
