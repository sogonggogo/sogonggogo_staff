import { Order, OrderStatus } from "@/types/api";

/**
 * 주문 상태별 필터링
 */
export const filterOrdersByStatus = (
  orders: Order[],
  status: OrderStatus | OrderStatus[]
): Order[] => {
  const statuses = Array.isArray(status) ? status : [status];
  return orders.filter((order) => statuses.includes(order.status));
};

/**
 * 완료/미완료 주문 필터링
 */
export const filterOrdersByCompletion = (
  orders: Order[],
  completed: boolean
): Order[] => {
  return completed
    ? orders.filter((order) => order.status === "COMPLETED")
    : orders.filter((order) => order.status !== "COMPLETED");
};

/**
 * 신규 주문 필터링 (승인 대기중)
 */
export const filterNewOrders = (orders: Order[]): Order[] => {
  return orders.filter((order) => order.status === "PENDING");
};

/**
 * 진행중 주문 필터링 (조리중 + 배달중)
 */
export const filterInProgressOrders = (orders: Order[]): Order[] => {
  return orders.filter(
    (order) => order.status === "COOKING" || order.status === "IN_DELIVERY"
  );
};
