// 주문 API 함수

import { apiClient } from "./client";
import { Order, OrderStatus } from "@/types/api";

/**
 * 주문 목록 조회
 * @param status - 주문 상태 필터 (선택사항)
 */
export async function getOrders(status?: OrderStatus): Promise<Order[]> {
  const endpoint = status
    ? `/api/staff/orders?status=${status}`
    : "/api/staff/orders";
  return apiClient.get<Order[]>(endpoint);
}

/**
 * 주문 승인 (PENDING → APPROVED)
 * @param orderId - 주문 ID
 */
export async function approveOrder(orderId: number): Promise<void> {
  return apiClient.post<void>(`/api/staff/orders/${orderId}/approve`);
}

/**
 * 주문 거절 (PENDING → REJECTED)
 * @param orderId - 주문 ID
 */
export async function rejectOrder(orderId: number): Promise<void> {
  return apiClient.post<void>(`/api/staff/orders/${orderId}/reject`);
}

/**
 * 조리 시작 (APPROVED → COOKING, 재고 차감)
 * @param orderId - 주문 ID
 */
export async function startCooking(orderId: number): Promise<void> {
  return apiClient.post<void>(`/api/staff/orders/${orderId}/cook`);
}

/**
 * 조리 완료 (COOKING → READY_FOR_DELIVERY)
 * @param orderId - 주문 ID
 */
export async function markOrderReady(orderId: number): Promise<void> {
  return apiClient.post<void>(`/api/staff/orders/${orderId}/ready`);
}

/**
 * 배달 시작 (READY_FOR_DELIVERY → IN_DELIVERY)
 * @param orderId - 주문 ID
 */
export async function startDelivery(orderId: number): Promise<void> {
  return apiClient.post<void>(`/api/staff/orders/${orderId}/start-delivery`);
}

/**
 * 배달 완료 (IN_DELIVERY → COMPLETED)
 * @param orderId - 주문 ID
 */
export async function completeOrder(orderId: number): Promise<void> {
  return apiClient.post<void>(`/api/staff/orders/${orderId}/complete`);
}

