# Mr-Daebak-Staff 프로젝트 아키텍처 다이어그램

## 컴포넌트 패키지 구성도

```mermaid
graph TB
    subgraph "src/app"
        AppOrder["app/(order)/"]
        AppStock["app/stock/"]
    end

    subgraph "src/components"
        ComponentsCommon["components/common/"]
        ComponentsStock["components/stock/"]
        ComponentsOrder["components/order/"]
    end

    subgraph "src/services"
        Services["services/"]
    end

    subgraph "src/types"
        ApiTypes["api.ts"]
        StockTypes["stock.ts"]
    end

    subgraph "src/utils"
        UtilsStock["utils/stock/"]
        UtilsOrder["utils/order/"]
    end

    subgraph "src/styles"
        Styles["styles/"]
    end

    %% app → components (인터페이스: props로 전달하는 타입)
    AppOrder -->|"Order (api.ts)"| ComponentsOrder
    AppStock -->|"UIStockItem (stock.ts)"| ComponentsStock

    %% app → services (인터페이스: API 호출 시 사용하는 타입)
    AppOrder -->|"Order (api.ts)"| Services
    AppStock -->|"StockStatus (api.ts)"| Services

    %% app → utils (인터페이스: 유틸 함수 사용 시 타입)
    AppOrder -->|"OrderStatus (api.ts)"| UtilsOrder
    AppStock -->|"StockItem (api.ts)"| UtilsStock

    %% components → services (인터페이스: API 호출 시 사용하는 타입)
    ComponentsOrder -->|"Order (api.ts)"| Services
    ComponentsStock -->|"CreateStockRequest, UpdateStockRequest (api.ts)"| Services

    %% components → utils (인터페이스: 유틸 함수 사용 시 타입)
    ComponentsOrder -->|"Order, OrderStatus (api.ts)"| UtilsOrder
    ComponentsStock -->|"StockItem (api.ts), UIStockItem (stock.ts)"| UtilsStock

    %% components → styles
    ComponentsCommon --> Styles
    ComponentsOrder --> Styles
    ComponentsStock --> Styles

    %% services → types (인터페이스: 타입 정의 참조)
    Services -->|"StockItem, StockStatus, CreateStockRequest, UpdateStockRequest (api.ts)"| ApiTypes

    %% utils → types (인터페이스: 타입 정의 참조)
    UtilsStock -->|"StockItem (api.ts), StockItem (stock.ts)"| ApiTypes
    UtilsStock -->|"StockItem (stock.ts)"| StockTypes
    UtilsOrder -->|"OrderStatus (api.ts)"| ApiTypes

    %% app → styles
    AppOrder --> Styles
    AppStock --> Styles

    style AppOrder fill:#e1f5ff
    style AppStock fill:#e1f5ff
    style ComponentsCommon fill:#e1f5ff
    style ComponentsStock fill:#e1f5ff
    style ComponentsOrder fill:#e1f5ff
    style Services fill:#fff4e1
    style ApiTypes fill:#ffe1f5
    style StockTypes fill:#ffe1f5
    style UtilsStock fill:#fff9e1
    style UtilsOrder fill:#fff9e1
    style Styles fill:#e1ffe1
```

## 디렉토리별 인터페이스 사용

### src/app/

- `app/(order)/` → `api.ts`, `components/order/`, `services/`, `utils/order/`
- `app/stock/` → `api.ts`, `components/stock/`, `services/`, `utils/stock/`

### src/components/

- `components/common/` → `styles/`
- `components/stock/` → `api.ts`, `stock.ts`, `services/`, `utils/stock/`, `styles/`
- `components/order/` → `api.ts`, `services/`, `utils/order/`, `styles/`

### src/services/

- `services/` → `api.ts`, `client.ts`

### src/types/

- `api.ts` → API 응답/요청 타입 정의 (Order, OrderStatus, StockItem, StockStatus, CreateStockRequest, UpdateStockStatusRequest, UpdateStockRequest 등)
- `stock.ts` → UI용 재고 타입 정의 (StockItem UI)

### src/utils/

- `utils/stock/` → `api.ts`, `stock.ts`
- `utils/order/` → `api.ts`

### src/styles/

- `styles/` → 테마 설정, Emotion 타입 정의

## 데이터 흐름

1. **페이지 레벨** (`app/`)

   - 사용자 인터랙션 처리
   - 상태 관리 (useState, useEffect)
   - 서비스 호출

2. **컴포넌트 레벨** (`components/`)

   - UI 렌더링
   - 이벤트 핸들링
   - 서비스 호출 (필요시)

3. **서비스 레벨** (`services/`)

   - API 통신
   - 에러 처리
   - 데이터 변환 (필요시)

4. **유틸리티 레벨** (`utils/`)

   - 데이터 변환 (Adapter)
   - 비즈니스 로직 (Helpers, Filters)

5. **타입 레벨** (`types/`)
   - 타입 안정성 보장
   - API와 UI 타입 분리
