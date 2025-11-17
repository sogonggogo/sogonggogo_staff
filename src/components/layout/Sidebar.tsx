"use client";

import styled from "@emotion/styled";
import { Package, ClipboardList, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { theme } from "@/styles/theme";

const SidebarContainer = styled.aside`
  width: 120px;
  background: ${theme.colors.background.darker};
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 1px solid ${theme.colors.border.primary};
`;

const NavButton = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  width: 100%;
  height: 80px;
  border-radius: ${theme.borderRadius.lg};
  background-color: ${({ isActive }) =>
    isActive ? theme.colors.text.primary : theme.colors.background.darker};
  border: 2px solid
    ${({ isActive }) =>
      isActive ? theme.colors.text.primary : theme.colors.border.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  cursor: pointer;
  transition: ${theme.transition.all};
  color: ${({ isActive }) =>
    isActive ? theme.colors.background.darker : theme.colors.text.primary};
  text-decoration: none;
  padding: ${theme.spacing.md};

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? theme.colors.text.primary : theme.colors.background.darkest};
    border-color: ${theme.colors.text.primary};
    box-shadow: ${theme.shadow.sm};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const NavText = styled.span`
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.bold};
  text-align: center;
  line-height: 1.3;
`;

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const isProcessing = pathname === "/" && (!tab || tab === "processing");
  const isCompleted = pathname === "/" && tab === "completed";
  const isInventory = pathname === "/inventory";

  return (
    <SidebarContainer>
      <NavButton href="/?tab=processing" isActive={isProcessing}>
        <ClipboardList size={24} strokeWidth={2} />
        <NavText>처리중</NavText>
      </NavButton>
      <NavButton href="/?tab=completed" isActive={isCompleted}>
        <ClipboardCheck size={24} strokeWidth={2} />
        <NavText>완료</NavText>
      </NavButton>
      <NavButton href="/inventory" isActive={isInventory}>
        <Package size={24} strokeWidth={2} />
        <NavText>재고 관리</NavText>
      </NavButton>
    </SidebarContainer>
  );
}
