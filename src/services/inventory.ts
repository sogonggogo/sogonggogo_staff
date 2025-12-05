// 재고 API 함수

import { apiClient } from "./client";
import {
  InventoryItem,
  InventoryStatus,
  CreateInventoryRequest,
  UpdateInventoryStatusRequest,
  UpdateInventoryStockRequest,
} from "@/types/api";

/**
 * 재고 목록 조회
 * @param status - 재고 상태 필터 (선택사항)
 */
export async function getInventory(
  status?: InventoryStatus
): Promise<InventoryItem[]> {
  const endpoint = status
    ? `/api/staff/inventory?status=${status}`
    : "/api/staff/inventory";
  return apiClient.get<InventoryItem[]>(endpoint);
}

/**
 * 새 재고 항목 등록
 * @param data - 재고 생성 데이터
 */
export async function createInventoryItem(
  data: CreateInventoryRequest
): Promise<InventoryItem> {
  return apiClient.post<InventoryItem>("/api/staff/inventory", data);
}

/**
 * 재고 판매 상태 변경
 * @param id - 재고 ID
 * @param status - 변경할 상태
 */
export async function updateInventoryStatus(
  id: number,
  status: InventoryStatus
): Promise<void> {
  const data: UpdateInventoryStatusRequest = { status };
  return apiClient.patch<void>(`/api/staff/inventory/${id}/status`, data);
}

/**
 * 재고 수량 설정
 * @param id - 재고 ID
 * @param stock - 변경할 재고 수량
 */
export async function updateInventoryStock(
  id: number,
  stock: number
): Promise<void> {
  const data: UpdateInventoryStockRequest = { stock };
  return apiClient.patch<void>(`/api/staff/inventory/${id}/stock`, data);
}

/**
 * 재고 항목 삭제
 * @param id - 재고 ID
 */
export async function deleteInventoryItem(id: number): Promise<void> {
  return apiClient.delete<void>(`/api/staff/inventory/${id}`);
}

