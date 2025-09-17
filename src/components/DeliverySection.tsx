import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Clock, User, Phone, MessageCircle } from 'lucide-react';

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

interface DeliverySectionProps {
  orders: Order[];
}

export default function DeliverySection({ orders }: DeliverySectionProps) {
  // 배달 정보와 주문 정보를 결합
  const deliveries = [
    {
      id: 'D001',
      orderId: 'A1B2',
      rider: '김라이더',
      phone: '010-1234-5678',
      address: '서울시 강남구 테헤란로 123, 4층',
      status: '배달중',
      estimatedTime: '15분',
      distance: '2.1km',
      orderTime: '19:45'
    },
    {
      id: 'D002',
      orderId: 'HG7F',
      rider: '박배달',
      phone: '010-9876-5432',
      address: '서울시 강남구 역삼동 456-789, 5층',
      status: '픽업완료',
      estimatedTime: '8분',
      distance: '1.5km',
      orderTime: '19:50'
    },
    {
      id: 'D003',
      orderId: 'F4D6',
      rider: '이운송',
      phone: '010-5555-7777',
      address: '서울시 서초구 반포대로 789, 3층',
      status: '배달완료',
      estimatedTime: '완료',
      distance: '3.2km',
      orderTime: '19:20'
    },
    {
      id: 'D004',
      orderId: 'M9H2',
      rider: '정퀵서비스',
      phone: '010-1111-2222',
      address: '서울시 강남구 논현로 321, 4층',
      status: '픽업대기',
      estimatedTime: '5분',
      distance: '1.8km',
      orderTime: '19:55'
    }
  ];

  // 배달 정보와 주문 정보를 매칭
  const deliveriesWithOrders = deliveries.map(delivery => {
    const order = orders.find(order => order.id === delivery.orderId);
    return {
      ...delivery,
      items: order?.items || '메뉴 정보 없음',
      notes: order?.notes || '요청사항 없음',
      deliveryNotes: order?.delivery || '배달 요청사항 없음',
      options: order?.options || []
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case '배달중': return 'bg-blue-500';
      case '픽업완료': return 'bg-yellow-500';
      case '배달완료': return 'bg-green-500';
      case '픽업대기': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    return 'text-white';
  };

  return (
    <section id="delivery" className="p-6 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-medium mb-2">배달 현황</h2>
          <p className="text-gray-400">실시간 배달 현황을 확인하고 관리하세요</p>
        </div>

        {/* 배달 현황 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock size={20} />
              </div>
              <p className="text-sm text-gray-400">픽업대기</p>
              <p className="text-xl font-medium">3건</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin size={20} />
              </div>
              <p className="text-sm text-gray-400">픽업완료</p>
              <p className="text-xl font-medium">2건</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <User size={20} />
              </div>
              <p className="text-sm text-gray-400">배달중</p>
              <p className="text-xl font-medium">4건</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin size={20} />
              </div>
              <p className="text-sm text-gray-400">배달완료</p>
              <p className="text-xl font-medium">15건</p>
            </CardContent>
          </Card>
        </div>

        {/* 배달 목록 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">실시간 배달 현황</h3>
          
          <div className="grid gap-4">
            {deliveriesWithOrders.map((delivery) => (
              <Card key={delivery.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-white">주문 #{delivery.orderId}</h4>
                        <Badge className={`${getStatusColor(delivery.status)} ${getStatusTextColor(delivery.status)}`}>
                          {delivery.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-1">{delivery.items}</p>
                      <p className="text-sm text-gray-500">주문시간: {delivery.orderTime}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-blue-400">{delivery.estimatedTime}</p>
                      <p className="text-sm text-gray-400">{delivery.distance}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {/* 라이더 정보 */}
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <User size={16} />
                        </div>
                        <div>
                          <p className="font-medium">{delivery.rider}</p>
                          <p className="text-sm text-gray-400">배달기사</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Phone size={14} />
                        {delivery.phone}
                      </div>
                    </div>

                    {/* 배달 주소 */}
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <p className="font-medium mb-1">배달 주소</p>
                          <p className="text-sm text-gray-300 leading-relaxed">{delivery.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 요청사항 섹션 */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {/* 조리 요청사항 */}
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MessageCircle size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-2">조리 요청</p>
                          <p className="text-sm text-gray-300 leading-relaxed">{delivery.notes}</p>
                        </div>
                      </div>
                    </div>

                    {/* 배달 요청사항 */}
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MessageCircle size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-2">배달 요청</p>
                          <p className="text-sm text-gray-300 leading-relaxed">{delivery.deliveryNotes}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 추가 옵션 */}
                  {delivery.options && delivery.options.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-2">추가 옵션</p>
                      <div className="flex flex-wrap gap-2">
                        {delivery.options.map((option, index) => (
                          <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {option}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 액션 버튼 */}
                  <div className="flex gap-2 mt-4">
                    {delivery.status === '픽업대기' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        픽업 확인
                      </Button>
                    )}
                    {delivery.status === '픽업완료' && (
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                        배달 시작
                      </Button>
                    )}
                    {delivery.status === '배달중' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        배달 완료
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      <Phone size={14} className="mr-1" />
                      라이더 연락
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      위치 추적
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 배달 지도 영역 */}
        <div className="mt-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>실시간 배달 위치</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400">지도 연동 준비중</p>
                  <p className="text-sm text-gray-500">실시간 배달기사 위치를 확인할 수 있습니다</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}