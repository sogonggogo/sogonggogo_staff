import { Badge } from './ui/badge';
import { Clock } from 'lucide-react';

interface Order {
  id: string;
  table: string;
  time: string;
  status: string;
  items: string;
  price: number;
  floor: number;
  notes: string;
  delivery: string;
  options: string[];
  remainingTime: string;
}

interface OrderListSidebarProps {
  orders: Order[];
  selectedOrderId: string | null;
  onOrderSelect: (orderId: string) => void;
}

export default function OrderListSidebar({ orders, selectedOrderId, onOrderSelect }: OrderListSidebarProps) {
  const getStatusColor = (status: string) => {
    if (status === '신규') return 'bg-blue-500';
    if (status.includes('분')) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">주문 대기 목록</h3>
        <p className="text-sm text-gray-400 mt-1">{orders.length}건의 주문이 대기중입니다</p>
      </div>

      {/* 주문 목록 */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => onOrderSelect(order.id)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedOrderId === order.id 
                ? 'bg-blue-600 border border-blue-500' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {/* 주문번호와 상태 */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">#{order.id}</span>
              <Badge className={`${getStatusColor(order.status)} text-white text-xs`}>
                {order.status}
              </Badge>
            </div>

            {/* 처리 상황 */}
            <div className="mb-2">
              <p className="text-sm text-gray-300">{order.items}</p>
              <p className="text-xs text-gray-400">{order.table} • {order.time}</p>
            </div>

            {/* 남은 시간 */}
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-400" />
              <span className="text-sm text-gray-300">
                {order.status === '신규' ? '대기중' : order.remainingTime}
              </span>
            </div>

            {/* 가격 */}
            <div className="mt-2 text-right">
              <span className="text-sm text-blue-400">{order.price.toLocaleString()}원</span>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 통계 */}
      <div className="p-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-400">신규 주문</p>
            <p className="text-lg font-medium text-blue-400">
              {orders.filter(order => order.status === '신규').length}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">진행중</p>
            <p className="text-lg font-medium text-yellow-400">
              {orders.filter(order => order.status.includes('분')).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}