'use client';

import { useState } from 'react';
import { ClipboardList, Truck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrdersSection from '@/components/OrdersSection';
import DeliverySection from '@/components/DeliverySection';
import InventorySection from '@/components/InventorySection';
import OrderListSidebar from '@/components/OrderListSidebar';
import OrderDetail from '@/components/OrderDetail';

export default function Home() {
  const [activeMenu, setActiveMenu] = useState('orders');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // 주문 데이터
  const orders = [
    {
      id: 'A1B2',
      table: '테이블 A1B2',
      time: '4층',
      status: '신규',
      items: '가계백발 A1B2',
      price: 55000,
      floor: 4,
      notes: '맵지 않게 해주세요',
      delivery: '초심히 안전히 해주세요',
      options: ['수저포크 O', '김치, 무절지 O', '다회용기 사용 O'],
      remainingTime: '대기중'
    },
    {
      id: 'HG7F',
      table: '테이블 HG7F',
      time: '5층',
      status: '8분',
      items: '백발 HG7F',
      price: 42000,
      floor: 5,
      notes: '보통 맛으로 해주세요',
      delivery: '문 앞에 두고 가세요',
      options: ['수저포크 O', '김치 O'],
      remainingTime: '8분'
    },
    {
      id: 'F4D6',
      table: '테이블 F4D6',
      time: '3층',
      status: '10분',
      items: '백발 F4D6',
      price: 38000,
      floor: 3,
      notes: '매운맛으로 해주세요',
      delivery: '직접 받겠습니다',
      options: ['수저포크 X', '다회용기 사용 O'],
      remainingTime: '10분'
    },
    {
      id: 'M9H2',
      table: '테이블 M9H2',
      time: '4층',
      status: '9분',
      items: '백발 M9H2',
      price: 47000,
      floor: 4,
      notes: '덜 맵게 해주세요',
      delivery: '초인종 누르고 기다려주세요',
      options: ['수저포크 O', '김치, 무절지 O'],
      remainingTime: '9분'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveMenu(sectionId);
    setSelectedOrderId(null); // 다른 섹션으로 이동시 주문 선택 해제
    
    if (sectionId !== 'orders') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const selectedOrder = orders.find(order => order.id === selectedOrderId) || null;

  const menuItems = [
    { id: 'orders', label: '주문', icon: ClipboardList },
    { id: 'delivery', label: '배달 현황', icon: Truck },
    { id: 'inventory', label: '재고관리', icon: Package },
  ];

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* 상단 헤더 바 */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <h1 className="text-xl font-medium">미스터 대박 디너 서비스</h1>
        <p className="text-sm text-gray-400 mt-1">직원용 관리 시스템</p>
      </div>

      <div className="flex flex-1">
        {/* 좌측 사이드바 */}
        <div className="w-32 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* 메뉴 항목들 */}
          <nav className="flex-1 p-2 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full flex flex-col items-center justify-center gap-2 h-16 p-2 ${
                    activeMenu === item.id 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <Icon size={20} />
                  <span className="text-xs text-center leading-tight">{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* 하단 상태 */}
          <div className="p-3 border-t border-gray-700">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-gray-400">영업중</span>
              </div>
              <p className="text-xs text-gray-500">
                05.26 (수) 20:00
              </p>
            </div>
          </div>
        </div>

        {/* 주문 목록 사이드바 (주문 메뉴 선택시에만 표시) */}
        {activeMenu === 'orders' && (
          <OrderListSidebar 
            orders={orders}
            selectedOrderId={selectedOrderId}
            onOrderSelect={handleOrderSelect}
          />
        )}

        {/* 메인 콘텐츠 */}
        <div className="flex-1 overflow-y-auto">
          {activeMenu === 'orders' ? (
            <OrderDetail order={selectedOrder} />
          ) : (
            <div className="space-y-8">
              {activeMenu === 'delivery' && <DeliverySection orders={orders} />}
              {activeMenu === 'inventory' && <InventorySection />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}