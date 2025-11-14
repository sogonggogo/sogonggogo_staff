'use client';

import styled from '@emotion/styled';
import { Store, Truck, Package, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { theme } from '@/styles/theme';

const SidebarContainer = styled.aside`
  width: ${theme.sizes.sidebarWidth};
  background: ${theme.colors.background.dark};
  padding: ${theme.spacing.lg} ${theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 1px solid ${theme.colors.border.dark};
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
  padding: ${theme.spacing.md} 0;
  margin-bottom: ${theme.spacing.lg};
`;

const LogoText = styled.h2`
  font-family: ${theme.fontFamily.ttangsbudae};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.brand.success};
  line-height: 1.2;
`;

const NavButton = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  width: 100%;
  height: ${theme.sizes.navButtonHeight};
  border-radius: ${theme.borderRadius.md};
  background-color: ${({ isActive }) =>
    isActive ? theme.colors.background.darker : 'transparent'};
  border-left: 3px solid
    ${({ isActive }) => (isActive ? theme.colors.brand.success : 'transparent')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  transition: ${theme.transition.all};
  color: ${({ isActive }) =>
    isActive ? theme.colors.text.white : theme.colors.text.muted};
  text-decoration: none;

  &:hover {
    background-color: ${theme.colors.background.darker};
    color: ${theme.colors.text.white};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const NavText = styled.span`
  font-family: ${theme.fontFamily.miwon};
  font-size: ${theme.fontSize['2xs']};
  font-weight: ${theme.fontWeight.medium};
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
