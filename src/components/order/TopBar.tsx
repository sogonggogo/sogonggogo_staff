import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

const Bar = styled.div`
  background: ${theme.colors.background.darker};
  padding: ${theme.spacing.xl} ${theme.spacing.xxl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.text.white};
  border-bottom: 1px solid ${theme.colors.border.darker};
`;

const TabContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${({ active }) =>
    active ? theme.colors.text.primary : "transparent"};
  color: ${({ active }) =>
    active ? theme.colors.background.darker : theme.colors.text.primary};
  border: 2px solid
    ${({ active }) =>
      active ? theme.colors.text.primary : theme.colors.border.light};
  padding: ${theme.spacing.md} ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.lg};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.bold};
  cursor: pointer;
  transition: ${theme.transition.all};

  &:hover {
    background: ${({ active }) =>
      active ? theme.colors.text.primary : theme.colors.background.darkest};
    border-color: ${theme.colors.text.primary};
    box-shadow: ${theme.shadow.sm};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const DateTime = styled.div`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.text.light};
`;

export type OrderTab = "processing" | "completed";

interface TopBarProps {
  currentTime: Date;
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
}

export default function TopBar({
  currentTime,
  activeTab,
  onTabChange,
}: TopBarProps) {
  const formatDateTime = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}.${day} (${weekday}) ${hours}:${minutes}`;
  };

  return (
    <Bar>
      <TabContainer>
        <Tab
          active={activeTab === "processing"}
          onClick={() => onTabChange("processing")}
        >
          처리중
        </Tab>
        <Tab
          active={activeTab === "completed"}
          onClick={() => onTabChange("completed")}
        >
          완료
        </Tab>
      </TabContainer>
      <DateTime>{formatDateTime(currentTime)}</DateTime>
    </Bar>
  );
}
