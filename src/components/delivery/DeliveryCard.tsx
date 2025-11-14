'use client';

import styled from '@emotion/styled';
import { MapPin, User, Clock, CheckCircle2 } from 'lucide-react';
import { Delivery } from '@/data/deliveries';
import { theme } from '@/styles/theme';

const Card = styled.div<{ status: string }>`
  background-color: ${theme.colors.background.dark};
  border: 2px solid ${({ status }) => {
    const borderColors: Record<string, string> = {
      dispatched: theme.colors.status.preparing,
      delivering: theme.colors.status.warning,
      delivered: theme.colors.status.completed,
    };
    return borderColors[status] || theme.colors.border.primary;
  }};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  transition: ${theme.transition.fast};

  &:hover {
    transform: translateY(-2px);
  }
`;

const DeliveryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const OrderNumber = styled.span`
  font-family: ${theme.fontFamily.secondary};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.white};
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  background-color: ${({ status }) => {
    const colors: Record<string, string> = {
      dispatched: 'rgba(59, 130, 246, 0.125)',
      delivering: 'rgba(245, 158, 11, 0.125)',
      delivered: 'rgba(16, 185, 129, 0.125)',
    };
    return colors[status] || 'rgba(255, 255, 255, 0.1)';
  }};
  color: ${({ status }) => {
    const colors: Record<string, string> = {
      dispatched: theme.colors.status.preparing,
      delivering: theme.colors.status.warning,
      delivered: theme.colors.status.completed,
    };
    return colors[status] || theme.colors.text.white;
  }};
  font-family: ${theme.fontFamily.secondary};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  font-family: ${theme.fontFamily.secondary};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.light};
`;

const Icon = styled.div`
  width: ${theme.sizes.iconSm};
  height: ${theme.sizes.iconSm};
  color: ${theme.colors.text.muted};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${theme.colors.border.dark};
  margin: ${theme.spacing.lg} 0;
`;

const EstimatedTime = styled.div`
  text-align: center;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background.darker};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontFamily.secondary};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.muted};
`;

const TimeValue = styled.div`
  font-size: ${theme.fontSize['2xl']};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.white};
  margin-top: ${theme.spacing.xs};
`;

interface DeliveryCardProps {
  delivery: Delivery;
}

export default function DeliveryCard({ delivery }: DeliveryCardProps) {
  return (
    <Card status={delivery.status}>
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
            <CheckCircle2 style={{ display: 'inline-block', width: '20px', height: '20px', color: theme.colors.status.completed }} />
            <TimeValue>배달 완료</TimeValue>
          </>
        ) : (
          <>
            <div>도착 예정</div>
            <TimeValue>{delivery.estimatedTime}</TimeValue>
          </>
        )}
      </EstimatedTime>
    </Card>
  );
}
