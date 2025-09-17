import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, MapPin, Phone } from 'lucide-react';

export default function OrdersSection() {
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
      options: ['수저포크 O', '김치, 무절지 O', '다회용기 사용 O']
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
      options: ['수저포크 O', '김치 O']
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
      options: ['수저포크 X', '다회용기 사용 O']
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
      options: ['수저포크 O', '김치, 무절지 O']
    }
  ];

  const getStatusColor = (status: string) => {
    if (status === '신규') return 'bg-blue-500';
    if (status.includes('분')) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <section id="orders" className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-medium mb-2">주문 관리</h2>
          <p className="text-gray-400">현재 진행중인 주문을 관리하세요</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* 주문 목록 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">주문 대기 목록</h3>
            {orders.map((order) => (
              <Card key={order.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-white">{order.items}</h4>
                      <p className="text-sm text-gray-400">{order.table} • {order.time}</p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">가격</span>
                      <span className="text-white">{order.price.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">층수</span>
                      <span className="text-white">{order.floor}층</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      요청사항
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      주문정보
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      배달 정보
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 주문 상세 */}
          <div>
            <h3 className="text-lg font-medium mb-4">주문 상세정보</h3>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>가계백발 A1B2</span>
                  <Badge className="bg-blue-500 text-white">신규</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 기본 정보 */}
                <div>
                  <h4 className="font-medium mb-2">요청사항</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">가게</span>
                      <span>맵지 않게 해주세요</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">배달</span>
                      <span>초심히 안전히 해주세요</span>
                    </div>
                  </div>
                </div>

                {/* 추가 옵션 */}
                <div>
                  <h4 className="font-medium mb-2">추가정보</h4>
                  <div className="space-y-1">
                    {['수저포크 O', '김치, 무절지 O', '다회용기 사용 O'].map((option, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 mr-2">
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 주문 정보 */}
                <div>
                  <h4 className="font-medium mb-2">주문정보</h4>
                  <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>메뉴</span>
                      <span>매뉴 4개 • 총 55,000원(결제완료)</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      포테이토 피자 M 1개, 치킨 너겟 (1인 세트) 1개, 수퍼디럭스 피자 L, 콜라
                    </div>
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    접수
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    거부
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">대기 주문</p>
                  <p className="text-xl font-medium">12건</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">완료 주문</p>
                  <p className="text-xl font-medium">28건</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">오늘 매출</p>
                  <p className="text-xl font-medium">1,240,000원</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}