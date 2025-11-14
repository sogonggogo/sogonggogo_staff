'use client';

import styled from '@emotion/styled';
import { Store, Truck, Package, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarContainer = styled.aside`
  width: 64px;
  background: #1a1a1a;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 1px solid #2a2a2a;
`;

const MenuIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const Logo = styled.div`
  text-align: center;
  padding: 12px 0;
  margin-bottom: 16px;
`;

const LogoText = styled.h2`
  font-family: var(--font-ttangsbudae);
  font-size: 12px;
  font-weight: 700;
  color: #4ade80;
  line-height: 1.2;
`;

const NavButton = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  width: 100%;
  height: 64px;
  border-radius: 8px;
  background-color: ${({ isActive }) => (isActive ? '#2a2a2a' : 'transparent')};
  border-left: 3px solid ${({ isActive }) => (isActive ? '#4ade80' : 'transparent')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#888888')};
  text-decoration: none;

  &:hover {
    background-color: #2a2a2a;
    color: #ffffff;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const NavText = styled.span`
  font-family: var(--font-miwon);
  font-size: 11px;
  font-weight: 500;
  text-align: center;
`;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarContainer>
      <MenuIcon>
        <Menu size={20} />
      </MenuIcon>
      <Logo>
        <LogoText>주방용</LogoText>
      </Logo>
      <NavButton href="/" isActive={pathname === '/'}>
        <Store size={20} />
        <NavText>재장운<br />1건</NavText>
      </NavButton>
      <NavButton href="/delivery" isActive={pathname === '/delivery'}>
        <Truck size={20} />
        <NavText>주문<br />5건</NavText>
      </NavButton>
      <NavButton href="/inventory" isActive={pathname === '/inventory'}>
        <Package size={20} />
        <NavText>재고</NavText>
      </NavButton>
    </SidebarContainer>
  );
}
