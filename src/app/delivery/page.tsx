'use client';

import PageHeader from '@/components/layout/PageHeader';
import PageContent from '@/components/layout/PageContent';
import DeliveryGrid from '@/components/delivery/DeliveryGrid';
import { mockDeliveries } from '@/data/deliveries';

export default function DeliveryPage() {
  return (
    <>
      <PageHeader title="배달 현황" subtitle="실시간 배달 상황을 모니터링합니다" />
      <PageContent>
        <DeliveryGrid deliveries={mockDeliveries} />
      </PageContent>
    </>
  );
}
