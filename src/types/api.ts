// API 응답 타입 정의

export type OrderStatus =
  | "PENDING"
  | "APPROVED"
  | "COOKING"
  | "READY_FOR_DELIVERY"
  | "IN_DELIVERY"
  | "COMPLETED"
  | "REJECTED";

export type InventoryStatus = "ON_SALE" | "STOPPED";

export interface Customer {
  email: string;
  name: string;
  phone: string;
  isRegularCustomer: boolean;
}

export interface DeliveryInfo {
  address: string;
  date: string;
  time: string;
  cardNumber: string;
}

export interface Pricing {
  subtotal: number;
  discount: number;
  total: number;
}

export interface Metadata {
  orderDate: string;
  clientOrderId: string;
}

export interface SelectedItem {
  name: string;
  quantity: number;
  unitPrice: number;
  defaultQuantity: number;
  additionalPrice: number;
}

export interface OrderItem {
  id: number;
  menuId: number;
  menuName: string;
  style: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selectedItems: SelectedItem[];
}

export interface Order {
  id: number;
  status: OrderStatus;
  customer: Customer;
  deliveryInfo: DeliveryInfo;
  pricing: Pricing;
  metadata: Metadata;
  orderItems: OrderItem[];
}

export interface InventoryItem {
  id: number;
  name: string;
  stock: number;
  price: number;
  status: InventoryStatus;
}

export interface CreateInventoryRequest {
  name: string;
  stock: number;
  price: number;
  status: InventoryStatus;
}

export interface UpdateInventoryStatusRequest {
  status: InventoryStatus;
}

export interface UpdateInventoryStockRequest {
  stock: number;
}

