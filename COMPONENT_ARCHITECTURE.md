# StaffUI 컴포넌트 패키지 구성

## Styles 컴포넌트

- 애플리케이션 전역 스타일링 시스템을 제공하며, 테마 설정, 색상, 폰트, 간격 등의 스타일 정보를 포함한다.
- ITheme 인터페이스를 제공하고, CommonComponents, OrderList, Stock 컴포넌트에서 사용된다.

## OrderList 컴포넌트 (progress/done)

- 주문 목록 관리 기능을 제공하며, 처리중(progress)과 완료(done) 상태의 주문을 표시하고 관리한다.
- IOrder 인터페이스(api.ts)를 필요로 하고, api.ts 인터페이스를 통해 주문 데이터를 조회한다.

## Stock 컴포넌트

- 재고 관리 기능을 제공하며, 재고 현황 조회, 재고 수량 관리, 판매 상태 변경 등의 기능을 포함한다.
- IStockItem 인터페이스(stock.ts)를 필요로 하고, api.ts 인터페이스를 통해 재고 데이터를 조회 및 관리한다.

## CommonComponents 컴포넌트

- 애플리케이션 전역에서 사용되는 공통 UI 컴포넌트를 제공하며, AppLayout, Sidebar, PageHeader, PageContent 등의 레이아웃 컴포넌트를 포함한다.
- ITheme 인터페이스(Styles)를 필요로 하고, orderComponents, StockComponents, OrderUtils 컴포넌트에서 사용된다.

## orderComponents 컴포넌트

- 주문 관련 UI 컴포넌트를 제공하며, OrderListSidebar, OrderDetail 등의 주문 표시 및 상세 정보 컴포넌트를 포함한다.
- ICommonComponents 인터페이스를 필요로 하고, IOrder 인터페이스(api.ts)를 통해 주문 데이터를 처리한다.

## StockComponents 컴포넌트

- 재고 관련 UI 컴포넌트를 제공하며, StockTable, StockStats, AddStockModal, StockManageModal 등의 재고 표시 및 관리 컴포넌트를 포함한다.
- ICommonComponents 인터페이스를 필요로 하고, IStockItem 인터페이스(stock.ts)와 IOrder 인터페이스(api.ts)를 통해 재고 데이터를 처리한다.

## OrderUtils 컴포넌트

- 주문 관련 유틸리티 함수를 제공하며, 주문 필터링, 상태 변환, 헬퍼 함수 등의 기능을 포함한다.
- ICommonComponents 인터페이스와 IOrderComponents 인터페이스를 필요로 한다.

## StockUtils 컴포넌트

- 재고 관련 유틸리티 함수를 제공하며, 재고 데이터 어댑터, 재고 상태 계산, 헬퍼 함수 등의 기능을 포함한다.
- IStockComponents 인터페이스를 필요로 한다.

## Service (API) 컴포넌트

- API 통신 서비스를 제공하며, HTTP 클라이언트 설정 및 API 엔드포인트 호출 기능을 포함한다.
- IApiClient 인터페이스(api.ts)를 제공하고, Stock 컴포넌트와 중앙 api.ts 인터페이스에서 사용된다.
