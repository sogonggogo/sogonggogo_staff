'use client';

import PageHeader from '@/components/layout/PageHeader';
import PageContent from '@/components/layout/PageContent';
import InventoryStats from '@/components/inventory/InventoryStats';
import InventoryTable from '@/components/inventory/InventoryTable';
import { mockInventory } from '@/data/inventory';

export default function InventoryPage() {
  const lowStockCount = mockInventory.filter(item => item.stockLevel === 'low').length;
  const mediumStockCount = mockInventory.filter(item => item.stockLevel === 'medium').length;
  const goodStockCount = mockInventory.filter(item => item.stockLevel === 'good').length;
  const totalItems = mockInventory.length;

  return (
    <>
      <PageHeader title="재고 관리" subtitle="식자재 재고를 확인하고 관리합니다" />
      <PageContent>
        <InventoryStats
          totalItems={totalItems}
          lowStockCount={lowStockCount}
          mediumStockCount={mediumStockCount}
          goodStockCount={goodStockCount}
        />
        <InventoryTable items={mockInventory} />
      </PageContent>
    </>
  );
}
