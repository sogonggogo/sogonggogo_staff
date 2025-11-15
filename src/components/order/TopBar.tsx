import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

const Bar = styled.div`
  background: ${theme.colors.background.darker};
  padding: ${theme.spacing.md} ${theme.spacing.xxl};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${theme.colors.text.white};
  border-bottom: 1px solid ${theme.colors.border.darker};
`;

const DateTime = styled.div`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.text.light};
`;

interface TopBarProps {
  currentTime: Date;
}

export default function TopBar({ currentTime }: TopBarProps) {
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
      <DateTime>{formatDateTime(currentTime)}</DateTime>
    </Bar>
  );
}
