import { InventoryItem } from "@/data/inventory";

export interface TableColumn {
  id: string;
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (item: InventoryItem) => React.ReactNode;
}

export const inventoryTableColumns: TableColumn[] = [
  {
    id: "select",
    label: "선택",
    width: "80px",
    sortable: false,
  },
  {
    id: "productId",
    label: "상품ID",
    width: "120px",
    sortable: false,
  },
  {
    id: "name",
    label: "상품명",
    sortable: false,
  },
  {
    id: "saleStatus",
    label: "현재 상태",
    width: "120px",
    sortable: false,
  },
  {
    id: "quantity",
    label: "재고",
    width: "100px",
    sortable: true,
  },
  {
    id: "price",
    label: "가격",
    width: "120px",
    sortable: false,
  },
  {
    id: "changeQuantity",
    label: "증감수량",
    width: "100px",
    sortable: false,
  },
  {
    id: "manage",
    label: "재고 관리",
    width: "120px",
    sortable: false,
  },
];

export const saleStatusOptions = ["전체", "판매중", "판매중지"] as const;
export type SaleStatusType = typeof saleStatusOptions[number];

export const pageSizeOptions = [20, 50, 100] as const;
export type PageSizeType = typeof pageSizeOptions[number];
