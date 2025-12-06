"use client";

import { Suspense } from "react";
import styled from "@emotion/styled";
import { Package, ClipboardList, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { theme } from "@/styles/theme";

const SidebarContainer = styled.aside`
  width: 120px;
  background: ${theme.colors.background.darker};
  padding: 0 ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 1px solid ${theme.colors.border.primary};
`;

const Logo = styled.div`
  font-family: ${theme.fontFamily.bagelFat};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
  text-align: center;
  padding: ${theme.spacing.md} 0;
  border-bottom: 2px solid ${theme.colors.border.light};
  line-height: 1.2;
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

function SidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const isProcessing = pathname === "/" && (!tab || tab === "processing");
  const isCompleted = pathname === "/" && tab === "completed";
  const isStock = pathname === "/stock";

  return (
    <SidebarContainer>
      <Logo>MR.DAEBAK</Logo>
      <NavButton href="/?tab=processing" isActive={isProcessing}>
        <ClipboardList size={24} strokeWidth={2} />
        <NavText>처리중</NavText>
      </NavButton>
      <NavButton href="/?tab=completed" isActive={isCompleted}>
        <ClipboardCheck size={24} strokeWidth={2} />
        <NavText>완료</NavText>
      </NavButton>
      <NavButton href="/stock" isActive={isStock}>
        <Package size={24} strokeWidth={2} />
        <NavText>재고 관리</NavText>
      </NavButton>
    </SidebarContainer>
  );
}

const SidebarFallback = styled(SidebarContainer)`
  /* Fallback 스타일 */
`;

export default function Sidebar() {
  return (
    <Suspense
      fallback={
        <SidebarFallback>
          <Logo>MR.DAEBAK</Logo>
          <NavButton href="/?tab=processing" isActive={false}>
            <ClipboardList size={24} strokeWidth={2} />
            <NavText>처리중</NavText>
          </NavButton>
          <NavButton href="/?tab=completed" isActive={false}>
            <ClipboardCheck size={24} strokeWidth={2} />
            <NavText>완료</NavText>
          </NavButton>
          <NavButton href="/stock" isActive={false}>
            <Package size={24} strokeWidth={2} />
            <NavText>재고 관리</NavText>
          </NavButton>
        </SidebarFallback>
      }
    >
      <SidebarContent />
    </Suspense>
  );
}
