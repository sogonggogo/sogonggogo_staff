import { InventoryItem } from "@/types/inventory";

/**
 * 재고 레벨별 통계 계산
 */
export const calculateStockLevels = (inventory: InventoryItem[]) => ({
  low: inventory.filter((item) => item.stockLevel === "low").length,
  medium: inventory.filter((item) => item.stockLevel === "medium").length,
  good: inventory.filter((item) => item.stockLevel === "good").length,
  total: inventory.length,
});

/**
 * 재고 레벨별 필터링
 */
export const filterByStockLevel = (
  inventory: InventoryItem[],
  level: "low" | "medium" | "good"
): InventoryItem[] => {
  return inventory.filter((item) => item.stockLevel === level);
};

/**
 * 카테고리별 필터링
 */
export const filterByCategory = (
  inventory: InventoryItem[],
  category: string
): InventoryItem[] => {
  return inventory.filter((item) => item.category === category);
};

/**
 * 재고 레벨에 따른 색상 반환
 */
export const getStockLevelColor = (
  level: "low" | "medium" | "good"
): string => {
  switch (level) {
    case "low":
      return "#DC2626";
    case "medium":
      return "#F59E0B";
    case "good":
      return "#10B981";
    default:
      return "#10B981";
  }
};

/**
 * 재고 레벨 텍스트 반환
 */
export const getStockLevelText = (level: "low" | "medium" | "good"): string => {
  switch (level) {
    case "low":
      return "부족";
    case "medium":
      return "보통";
    case "good":
      return "충분";
    default:
      return "충분";
  }
};
