'use client';

import styled from '@emotion/styled';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

const StatValue = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #FFFFFF;
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
