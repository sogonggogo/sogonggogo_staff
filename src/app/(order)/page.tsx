'use client';

import PageHeader from '@/components/layout/PageHeader';
import PageContent from '@/components/layout/PageContent';
import OrderStats from '@/components/orders/OrderStats';
import OrderList from '@/components/orders/OrderList';
import { mockOrders } from '@/data/orders';

export default function OrdersPage() {
  const pendingCount = mockOrders.filter(o => o.status === 'pending').length;
  const preparingCount = mockOrders.filter(o => o.status === 'preparing').length;
  const completedCount = mockOrders.filter(o => o.status === 'completed').length;

  return (
    <>
      <PageHeader title="주문 관리" subtitle="실시간 주문 현황을 확인하고 관리합니다" />
      <PageContent>
        <OrderStats
          pendingCount={pendingCount}
          preparingCount={preparingCount}
          completedCount={completedCount}
        />
        <OrderList orders={mockOrders} />
      </PageContent>
    </>
  );
}
