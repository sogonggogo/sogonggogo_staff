'use client';

import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';
import { MapPin, User, Clock, CheckCircle2 } from 'lucide-react';
import { mockDeliveries } from '@/data/deliveries';

// Styled Components
const DeliveryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 16px;
`;

const DeliveryCard = styled.div<{ status: string }>`
  background-color: #1e2939;
  border: 2px solid ${({ status }) => {
    const borderColors = {
      dispatched: '#3B82F6',
      delivering: '#F59E0B',
      delivered: '#10B981',
    };
    return borderColors[status as keyof typeof borderColors];
  }};
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const DeliveryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const OrderNumber = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 16px;
  background-color: ${({ status }) => {
    const colors = {
      dispatched: '#3B82F620',
      delivering: '#F59E0B20',
      delivered: '#10B98120',
    };
    return colors[status as keyof typeof colors];
  }};
  color: ${({ status }) => {
    const colors = {
      dispatched: '#3B82F6',
      delivering: '#F59E0B',
      delivered: '#10B981',
    };
    return colors[status as keyof typeof colors];
  }};
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #D1D5DC;
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;
  color: #99A1AE;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #364153;
  margin: 16px 0;
`;

const EstimatedTime = styled.div`
  text-align: center;
  padding: 12px;
  background-color: #0a0f19;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #99A1AE;
`;

const TimeValue = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #FFFFFF;
  margin-top: 4px;
`;

export default function DeliveryPage() {
  return (
    <PageLayout title="배달 현황" subtitle="실시간 배달 상황을 모니터링합니다">
      <DeliveryGrid>
        {mockDeliveries.map((delivery) => (
          <DeliveryCard key={delivery.id} status={delivery.status}>
            <DeliveryHeader>
              <OrderNumber>{delivery.id}</OrderNumber>
              <StatusBadge status={delivery.status}>{delivery.statusText}</StatusBadge>
            </DeliveryHeader>

            <InfoRow>
              <Icon><User size={16} /></Icon>
              <span>배달기사: {delivery.driver} ({delivery.phone})</span>
            </InfoRow>

            <InfoRow>
              <Icon><User size={16} /></Icon>
              <span>고객: {delivery.customer}</span>
            </InfoRow>

            <InfoRow>
              <Icon><MapPin size={16} /></Icon>
              <span>{delivery.address}</span>
            </InfoRow>

            <InfoRow>
              <Icon><Clock size={16} /></Icon>
              <span>배차시간: {delivery.dispatchTime}</span>
            </InfoRow>

            <Divider />

            <EstimatedTime>
              {delivery.status === 'delivered' ? (
                <>
                  <CheckCircle2 style={{ display: 'inline-block', width: '20px', height: '20px', color: '#10B981' }} />
                  <TimeValue>배달 완료</TimeValue>
                </>
              ) : (
                <>
                  <div>도착 예정</div>
                  <TimeValue>{delivery.estimatedTime}</TimeValue>
                </>
              )}
            </EstimatedTime>
          </DeliveryCard>
        ))}
      </DeliveryGrid>
    </PageLayout>
  );
}
