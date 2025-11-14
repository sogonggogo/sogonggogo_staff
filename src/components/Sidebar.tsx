'use client';

import styled from '@emotion/styled';
import { Store, Truck, Package } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarContainer = styled.aside`
  width: 127px;
  background-color: #0a0f19;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
`;

const NavButton = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  width: 100%;
  height: 64px;
  border-radius: 8px;
  background-color: ${({ isActive }) => (isActive ? '#1565FC' : 'transparent')};
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: ${({ isActive }) => (isActive ? '#FFFFFF' : '#D1D5DC')};
  text-decoration: none;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#1565FC' : 'rgba(255, 255, 255, 0.05)')};
  }
`;

const NavText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarContainer>
      <NavButton href="/" isActive={pathname === '/'}>
        <Store size={16} />
        <NavText>주문</NavText>
      </NavButton>
      <NavButton href="/delivery" isActive={pathname === '/delivery'}>
        <Truck size={16} />
        <NavText>배달 현황</NavText>
      </NavButton>
      <NavButton href="/inventory" isActive={pathname === '/inventory'}>
        <Package size={16} />
        <NavText>재고관리</NavText>
      </NavButton>
    </SidebarContainer>
  );
}
