// API 응답과 UI 모델 간 변환 어댑터

import { InventoryItem as ApiInventoryItem } from "@/types/api";

export interface UIInventoryItem {
  id: number;
  productId: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  stockLevel: "low" | "medium" | "good";
  stockLevelText: string;
  lastRestocked: string;
  saleStatus: "판매중" | "판매중지";
  price: number;
  expectedPrice: number;
  hasStock: boolean;
}

const getCategory = (name: string): string => {
  if (name.includes("와인") || name.includes("샴페인") || name.includes("커피")) {
    return "음료";
  }
  if (name.includes("스테이크") || name.includes("베이컨")) {
    return "육류";
  }
  if (name.includes("빵") || name.includes("에그 스크램블")) {
    return "식품";
  }
  if (name.includes("샐러드")) {
    return "채소";
  }
  if (name.includes("장식")) {
    return "장식품";
  }
  return "기타";
};

const getUnit = (name: string): string => {
  if (name.includes("빵")) {
    return "개";
  }
  if (name.includes("와인") || name.includes("샴페인") || name.includes("커피")) {
    return "병";
  }
  if (
    name.includes("스테이크") ||
    name.includes("베이컨") ||
    name.includes("에그 스크램블") ||
    name.includes("샐러드")
  ) {
    return "인분";
  }
  if (name.includes("장식")) {
    return "개";
  }
  return "개";
};

const getStockLevel = (
  quantity: number,
  minStock: number
): "low" | "medium" | "good" => {
  if (quantity < minStock) return "low";
  if (quantity < minStock * 1.5) return "medium";
  return "good";
};

const getStockLevelText = (level: "low" | "medium" | "good"): string => {
  const texts = { low: "부족", medium: "보통", good: "충분" };
  return texts[level];
};

const getExpectedPrice = (price: number): number => {
  return Math.round(price * 1.2); // 20% 마진
};

/**
 * API 응답을 UI 모델로 변환
 */
export function apiToUIInventory(
  apiItem: ApiInventoryItem
): UIInventoryItem {
  const category = getCategory(apiItem.name);
  const unit = getUnit(apiItem.name);
  const minStock = 20; // 기본값 (실제로는 별도 관리 필요)
  const stockLevel = getStockLevel(apiItem.stock, minStock);
  
  return {
    id: apiItem.id,
    productId: `1002${String(apiItem.id).padStart(4, "0")}`,
    name: apiItem.name,
    category,
    quantity: apiItem.stock,
    unit,
    minStock,
    stockLevel,
    stockLevelText: getStockLevelText(stockLevel),
    lastRestocked: new Date().toISOString().split("T")[0], // 현재 날짜 (실제로는 API에서 받아야 함)
    saleStatus: apiItem.status === "ON_SALE" ? "판매중" : "판매중지",
    price: apiItem.price,
    expectedPrice: getExpectedPrice(apiItem.price),
    hasStock: apiItem.stock > 0,
  };
}

/**
 * UI 모델을 API 요청 형식으로 변환
 */
export function uiToApiStatus(
  saleStatus: "판매중" | "판매중지"
): "ON_SALE" | "STOPPED" {
  return saleStatus === "판매중" ? "ON_SALE" : "STOPPED";
}

