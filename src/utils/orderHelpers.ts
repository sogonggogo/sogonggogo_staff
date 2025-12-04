// 주문 관련 헬퍼 함수

import { OrderStatus } from "@/types/api";

/**
 * 주문 상태를 한글로 변환
 */
export const getStatusText = (status: OrderStatus): string => {
  switch (status) {
    case "PENDING":
      return "승인 대기중";
    case "APPROVED":
      return "조리 대기중";
    case "COOKING":
      return "조리중";
    case "READY_FOR_DELIVERY":
      return "배달 대기중";
    case "IN_DELIVERY":
      return "배달중";
    case "COMPLETED":
      return "완료";
    case "REJECTED":
      return "주문 거절";
  }
};

/**
 * 주문 상태가 처리 중인지 확인
 */
export const isProcessingStatus = (status: OrderStatus): boolean => {
  return status !== "COMPLETED" && status !== "REJECTED";
};

/**
 * 주문 상태가 완료/거절인지 확인
 */
export const isCompletedStatus = (status: OrderStatus): boolean => {
  return status === "COMPLETED" || status === "REJECTED";
};

