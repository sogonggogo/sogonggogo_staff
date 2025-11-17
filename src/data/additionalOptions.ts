import { dinnerMenus } from "./menus";

export interface MenuItemOption {
  name: string;
  basePrice: number;
  defaultQuantity?: number; // 기본 수량 (지정하지 않으면 1)
}

interface ItemPriceConfig {
  unitPrice: number;
  defaultQuantity: number;
}

const itemPrices: Record<string, ItemPriceConfig> = {
  // 통일된 메뉴 (평균 가격 사용)
  와인: { unitPrice: 23333, defaultQuantity: 1 }, // (25000 + 20000 + 25000) / 3
  스테이크: { unitPrice: 31250, defaultQuantity: 1 }, // (35000 + 20000 + 35000 + 35000) / 4
  커피: { unitPrice: 15000, defaultQuantity: 1 }, // (10000 + 20000) / 2

  // 발렌타인 디너
  "하트 장식": { unitPrice: 14500, defaultQuantity: 1 },
  "큐피드 장식": { unitPrice: 14500, defaultQuantity: 1 },

  // 프렌치 디너
  샐러드: { unitPrice: 15000, defaultQuantity: 1 },

  // 잉글리시 디너
  "에그 스크램블": { unitPrice: 7000, defaultQuantity: 1 },
  베이컨: { unitPrice: 8000, defaultQuantity: 1 },
  빵: { unitPrice: 5000, defaultQuantity: 1 },

  // 샴페인 축제 디너
  샴페인: { unitPrice: 25000, defaultQuantity: 1 },
  "바게트 빵": { unitPrice: 3750, defaultQuantity: 4 }, // 15,000 / 4 = 3,750
};

// 메뉴별 아이템 키 매핑 (통일된 이름 사용)
const getItemPriceKey = (menuId: number, itemName: string): string => {
  // 통일된 메뉴는 그대로 사용
  if (itemName === "와인" || itemName === "스테이크" || itemName === "커피") {
    return itemName;
  }
  return itemName;
};

// 메뉴 ID에 따른 세부 메뉴 옵션 가져오기
export const getItemsForMenu = (menuId: number): MenuItemOption[] => {
  const menu = dinnerMenus.find((m) => m.id === menuId);
  if (!menu) return [];

  return menu.items.map((itemName) => {
    const priceKey = getItemPriceKey(menuId, itemName);
    const config = itemPrices[priceKey] || {
      unitPrice: 10000,
      defaultQuantity: 1,
    };
    return {
      name: itemName,
      basePrice: config.unitPrice,
      defaultQuantity: config.defaultQuantity,
    };
  });
};

export interface SelectedItem {
  name: string;
  quantity: number;
}
