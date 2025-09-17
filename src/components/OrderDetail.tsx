import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, MapPin, Phone, User } from 'lucide-react';

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

interface OrderDetailProps {
  order: Order | null;
}

export default function OrderDetail({ order }: OrderDetailProps) {
  if (!order) {
    return (
      <div className="flex-1 bg-gray-900 p-6">
        <div className="flex items-center justify-center h-full">
          <div className="text-center mt-20">
            <Clock size={48} className="text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">주문을 선택해주세요</p>
            <p className="text-sm text-gray-500">왼쪽 목록에서 주문을 클릭하면 상세정보가 표시됩니다</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    if (status === '신규') return 'bg-blue-500';
    if (status.includes('분')) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className="flex-1 bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-medium text-white mb-2">주문 상세정보</h2>
              <p className="text-gray-400">주문번호 #{order.id}의 상세 내용입니다</p>
            </div>
            <Badge className={`${getStatusColor(order.status)} text-white`}>
              {order.status}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6">
          {/* 주문 기본 정보 */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">주문 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">메뉴</p>
                  <p className="text-white font-medium">{order.items}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">총 금액</p>
                  <p className="text-white font-medium">{order.price.toLocaleString()}원</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">테이블</p>
                  <p className="text-white">{order.table}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">층수</p>
                  <p className="text-white">{order.floor}층</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 요청사항 */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">요청사항</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">조리 요청</p>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-white">{order.notes}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">배달 요청</p>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-white">{order.delivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 추가 옵션 */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">추가 옵션</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {order.options.map((option, index) => (
                  <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                    {option}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 상세 주문 내역 */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">주문 내역</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-700 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">메뉴</span>
                  <span className="text-white">매뉴 4개 • 총 {order.price.toLocaleString()}원(결제완료)</span>
                </div>
                <div className="text-sm text-gray-300">
                  포테이토 피자 M 1개, 치킨 너겟 (1인 세트) 1개, 수퍼디럭스 피자 L, 콜라
                </div>
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">결제 방법</span>
                    <span className="text-white">카드 결제</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 고객 정보 */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">고객 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-white">고객명</p>
                      <p className="text-sm text-gray-400">김고객</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Phone size={14} />
                    010-1234-5678
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">배달 주소</p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        서울시 강남구 테헤란로 123, {order.floor}층
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 처리 시간 정보 */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">처리 현황</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">주문 접수</span>
                  <span className="text-white">19:45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">예상 완료 시간</span>
                  <span className="text-yellow-400">
                    {order.status === '신규' ? '접수 대기중' : `약 ${order.remainingTime} 후`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">현재 상태</span>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼 */}
          <div className="flex gap-4 pt-4">
            {order.status === '신규' && (
              <>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  주문 접수
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  주문 거부
                </Button>
              </>
            )}
            {order.status.includes('분') && (
              <>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  조리 완료
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  시간 연장
                </Button>
              </>
            )}
            <Button variant="outline" className="border-gray-600 text-gray-300">
              <Phone size={16} className="mr-2" />
              고객 연락
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}