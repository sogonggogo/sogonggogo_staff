'use client';

import styled from '@emotion/styled';
import Sidebar from './Sidebar';

const Layout = styled.div`
  display: flex;
  height: 100vh;
  background-color: #0a0f19;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 127px;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 0;
  overflow-y: auto;

  /* 스크롤바 스타일링 - Webkit 브라우저 (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #0a0f19;
  }

  &::-webkit-scrollbar-thumb {
    background: #1e2939;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #364153;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #1e2939 #0a0f19;
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
