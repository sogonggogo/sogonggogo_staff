"use client";

import styled from "@emotion/styled";
import { Store, Truck, Package, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { theme } from "@/styles/theme";

const SidebarContainer = styled.aside`
  width: 120px;
  background: ${theme.colors.background.secondary};
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

const MenuIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md};
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
`;

const Logo = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg} 0;
  margin-bottom: ${theme.spacing.xxl};
`;

const LogoText = styled.h2`
  font-family: ${theme.fontFamily.ttangsbudae};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  line-height: 1.4;
`;

const NavButton = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  width: 100%;
  height: 80px;
  border-radius: ${theme.borderRadius.lg};
  background-color: ${({ isActive }) =>
    isActive ? theme.colors.text.primary : theme.colors.background.secondary};
  border: 2px solid
    ${({ isActive }) => (isActive ? theme.colors.text.primary : theme.colors.border.secondary)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  cursor: pointer;
  transition: ${theme.transition.all};
  color: ${({ isActive }) =>
    isActive ? theme.colors.background.secondary : theme.colors.text.primary};
  text-decoration: none;
  padding: ${theme.spacing.md};

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? theme.colors.text.primary : theme.colors.background.light};
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

  return (
    <SidebarContainer>
      <NavButton href="/" isActive={pathname === "/"}>
        <Store size={24} strokeWidth={2} />
        <NavText>
          처리중
          <br />
          3건
        </NavText>
      </NavButton>
      <NavButton href="/delivery" isActive={pathname === "/delivery"}>
        <Truck size={24} strokeWidth={2} />
        <NavText>완료</NavText>
      </NavButton>
      <NavButton href="/inventory" isActive={pathname === "/inventory"}>
        <Package size={24} strokeWidth={2} />
        <NavText>재고 관리</NavText>
      </NavButton>
    </SidebarContainer>
  );
}
