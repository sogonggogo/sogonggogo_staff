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
        Types["types/"]
    end

    subgraph "src/utils"
        UtilsStock["utils/stock/"]
        UtilsOrder["utils/order/"]
    end

    subgraph "src/constants"
        Constants["constants/"]
    end

    subgraph "src/styles"
        Styles["styles/"]
    end

    %% app → components
    AppOrder -->|"Order"| ComponentsOrder
    AppStock -->|"UIStockItem, StockStatus"| ComponentsStock

    %% app → services
    AppOrder -->|"Order"| Services
    AppStock -->|"StockItem, StockStatus"| Services

    %% app → utils
    AppOrder -->|"OrderStatus"| UtilsOrder
    AppStock -->|"StockItem → UIStockItem"| UtilsStock
    AppStock -->|"TableColumn"| Constants

    %% components → services
    ComponentsOrder -->|"Order, CreateStockRequest,<br/>UpdateStockRequest"| Services
    ComponentsStock -->|"StockItem, StockStatus,<br/>CreateStockRequest,<br/>UpdateStockRequest"| Services

    %% components → utils
    ComponentsOrder -->|"Order, OrderStatus"| UtilsOrder
    ComponentsStock -->|"StockItem → UIStockItem"| UtilsStock
    ComponentsStock -->|"TableColumn"| Constants

    %% components → styles
    ComponentsCommon --> Styles
    ComponentsOrder --> Styles
    ComponentsStock --> Styles

    %% services → types
    Services -->|"Order, OrderStatus, StockItem,<br/>StockStatus, CreateStockRequest,<br/>UpdateStockStatusRequest,<br/>UpdateStockRequest"| Types

    %% utils → types
    UtilsStock -->|"StockItem (API),<br/>StockItem (UI), UIStockItem"| Types
    UtilsOrder -->|"Order, OrderStatus"| Types

    %% constants → types
    Constants -->|"StockItem (UI)"| Types

    %% app → styles
    AppOrder --> Styles
    AppStock --> Styles

    style AppOrder fill:#e1f5ff
    style AppStock fill:#e1f5ff
    style ComponentsCommon fill:#e1f5ff
    style ComponentsStock fill:#e1f5ff
    style ComponentsOrder fill:#e1f5ff
    style Services fill:#fff4e1
    style Types fill:#ffe1f5
    style UtilsStock fill:#fff9e1
    style UtilsOrder fill:#fff9e1
    style Constants fill:#f0f0f0
    style Styles fill:#e1ffe1
```

## 디렉토리별 인터페이스 사용

### src/app/

- `app/(order)/` → `Order` (types/api.ts), `components/order/`, `services/`, `utils/order/`
- `app/stock/` → `StockStatus`, `UIStockItem` (utils/stock/stockAdapter.ts), `components/stock/`, `services/`, `utils/stock/`, `constants/`

### src/components/

- `components/common/` → `styles/`
- `components/stock/` → `StockItem`, `StockStatus`, `UIStockItem`, `CreateStockRequest`, `UpdateStockRequest` (types/), `services/`, `utils/stock/`, `constants/`, `styles/`
- `components/order/` → `Order`, `OrderStatus` (types/api.ts), `services/`, `utils/order/`, `styles/`

### src/services/

- `services/` → `Order`, `OrderStatus`, `StockItem`, `StockStatus`, `CreateStockRequest`, `UpdateStockStatusRequest`, `UpdateStockRequest` (types/api.ts), `client.ts`

### src/types/

- `types/` → `Order`, `OrderStatus`, `OrderItem`, `Customer`, `DeliveryInfo`, `Pricing`, `Metadata`, `SelectedItem`, `StockItem` (API), `StockStatus`, `CreateStockRequest`, `UpdateStockStatusRequest`, `UpdateStockRequest`, `StockItem` (UI)

### src/utils/

- `utils/stock/` → `StockItem` (API, types/api.ts), `StockItem` (UI, types/stock.ts), `UIStockItem` (자체 정의)
- `utils/order/` → `Order`, `OrderStatus` (types/api.ts)

### src/constants/

- `constants/` → `StockItem` (UI, types/stock.ts), `TableColumn`

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
