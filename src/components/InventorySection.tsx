import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { HelpCircle, Search, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function InventorySection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [sortBy, setSortBy] = useState('20개씩 보기');

  const inventory = [
    {
      id: '10025723',
      productId: '대용량 토마토 5kg',
      name: '대용량 토마토 5kg',
      currentStatus: '판매중',
      category: '재고있음',
      stockAvailable: 'O',
      price: '11,900원',
      expectedPrice: '11,900원',
      quantity: 1,
      status: '배달',
      saleStart: '2023...',
      highlighted: true
    },
    {
      id: '10025723',
      productId: '제주 친환경 1박스 3kg',
      name: '제주 친환경 1박스 3kg',
      currentStatus: '판매중',
      category: '재고있음',
      stockAvailable: 'O',
      price: '12,900원',
      expectedPrice: '12,900원',
      quantity: 1,
      status: '취업',
      saleStart: '2023...'
    },
    {
      id: '10025723',
      productId: '제주 친환경 1박스 3kg',
      name: '제주 친환경 1박스 3kg',
      currentStatus: '판매종료',
      category: '재고있음',
      stockAvailable: 'X',
      price: '12,900원',
      expectedPrice: '12,900원',
      quantity: 345,
      status: '배달/택배',
      saleStart: '2023...'
    },
    {
      id: '10025723',
      productId: '쪽고를 맑은 양파 콘감자 과일',
      name: '쪽고를 맑은 양파 콘감자 과일',
      currentStatus: '판매중',
      category: '재고있음',
      stockAvailable: 'O',
      price: '11,900원',
      expectedPrice: '-',
      quantity: 20,
      status: '배달',
      saleStart: '2023...'
    },
    {
      id: '10025723',
      productId: '제주 친환경 1박스 3kg',
      name: '제주 친환경 1박스 3kg',
      currentStatus: '판매종료',
      category: '재고있음',
      stockAvailable: 'X',
      price: '11,900원',
      expectedPrice: '11,900원',
      quantity: 10,
      status: '배달',
      saleStart: '2023...'
    }
  ];

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.currentStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="inventory" className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* 타이틀 섹션 */}
        <div className="mb-6">
          <h2 className="text-2xl font-medium text-white mb-2">재고 관리 시스템</h2>
          <p className="text-white">재고 현황을 확인하고 관리하세요</p>
        </div>



        {/* 검색 및 필터 컨테이너 */}
        <div className="border border-gray-700 rounded-lg p-6 mb-6 bg-gray-800">
          <div className="space-y-4">
            {/* 검색어 */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-24 text-left text-white">검색어</span>
              <div className="relative max-w-md">
                <Input
                  placeholder="상품명을 입력해주세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-white"
                />
              </div>
            </div>

            {/* 판매상태 */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-24 text-left text-white">판매상태</span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={categoryFilter === '전체' ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter('전체')}
                  className={`rounded-full ${
                    categoryFilter === '전체' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                  }`}
                >
                  전체
                </Button>
                <Button 
                  size="sm" 
                  variant={categoryFilter === '판매대기' ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter('판매대기')}
                  className={`rounded-full ${
                    categoryFilter === '판매대기' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                  }`}
                >
                  판매대기
                </Button>
                <Button 
                  size="sm" 
                  variant={categoryFilter === '판매승인' ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter('판매승인')}
                  className={`rounded-full ${
                    categoryFilter === '판매승인' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                  }`}
                >
                  판매승인
                </Button>
                <Button 
                  size="sm" 
                  variant={categoryFilter === '판매중지' ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter('판매중지')}
                  className={`rounded-full ${
                    categoryFilter === '판매중지' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                  }`}
                >
                  판매중지
                </Button>
              </div>
            </div>

            {/* 상품 카테고리 */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-24 text-left text-white">상품 카테고리</span>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 flex items-center gap-1">
                  상품 카테고리 찾기 <ChevronRight size={14} />
                </Button>
              </div>
            </div>

            {/* 기계출 카테고리 */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-24 text-left text-white">기계출 카테고리</span>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 flex items-center gap-1">
                  기계출 카테고리 찾기 <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 결과 및 정렬 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-white">상품수량 총 14개</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="20개씩 보기" className="text-white hover:bg-gray-700">20개씩 보기</SelectItem>
                <SelectItem value="50개씩 보기" className="text-white hover:bg-gray-700">50개씩 보기</SelectItem>
                <SelectItem value="100개씩 보기" className="text-white hover:bg-gray-700">100개씩 보기</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              판매상태 변경
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              재고기간 변경
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              선택
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ 상품 등록</Button>
          </div>
        </div>

        {/* 테이블 */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-r border-gray-600">
                    <input type="checkbox" className="rounded bg-gray-600 border-gray-500" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-r border-gray-600">상품ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-r border-gray-600">상품명</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-r border-gray-600">현재 상태</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-r border-gray-600">
                    재고 <HelpCircle size={14} className="inline ml-1 text-white" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-r border-gray-600">재고 유무</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-r border-gray-600">가격</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-r border-gray-600">예상판매가</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white">증감수량</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredInventory.map((item, index) => (
                  <tr key={`${item.id}-${index}`} className={`hover:bg-gray-700 ${item.highlighted ? 'bg-gray-750' : ''}`}>
                    <td className="px-4 py-4 border-r border-gray-600">
                      <input type="checkbox" className="rounded bg-gray-600 border-gray-500" />
                    </td>
                    <td className="px-4 py-4 border-r border-gray-600">
                      <span className="text-sm text-white">{item.id}</span>
                    </td>
                    <td className="px-4 py-4 border-r border-gray-600">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${item.highlighted ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                        {item.name}
                      </div>
                    </td>
                    <td className="px-4 py-4 border-r border-gray-600">
                      <Badge className={`${item.currentStatus === '판매중' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {item.currentStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 border-r border-gray-600">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        재고 관리
                      </Button>
                    </td>
                    <td className="px-4 py-4 border-r border-gray-600">
                      <span className={`text-sm font-medium ${item.stockAvailable === 'O' ? 'text-green-400' : 'text-red-400'}`}>
                        {item.stockAvailable}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-r border-gray-600">
                      <span className="text-sm text-white">{item.price}</span>
                    </td>
                    <td className="px-4 py-4 border-r border-gray-600">
                      <span className="text-sm text-white">{item.expectedPrice}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-white">{item.quantity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 검색 결과 없음 */}
        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white mb-2">검색 결과가 없습니다</p>
            <p className="text-sm text-white">다른 키워드로 검색해 보세요</p>
          </div>
        )}
      </div>
    </section>
  );
}