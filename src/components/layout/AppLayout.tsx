'use client';

import styled from '@emotion/styled';
import Sidebar from './Sidebar';
import { theme } from '@/styles/theme';

const Layout = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${theme.colors.background.primary};
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${theme.sizes.sidebarWidth};
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 0;
  overflow-y: auto;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--background);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--accent);
  }

  scrollbar-width: thin;
  scrollbar-color: var(--border) var(--background);
`;

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Layout>
      <Sidebar />
      <MainContent>
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </Layout>
  );
}
