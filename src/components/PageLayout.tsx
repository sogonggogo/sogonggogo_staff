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

const Header = styled.header`
  background-color: #1e2939;
  border-bottom: 1px solid #364153;
  padding: 16px 24px;
`;

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: 4px;
  letter-spacing: -0.45px;
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #99A1AE;
  letter-spacing: -0.15px;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <Layout>
      <Sidebar />
      <MainContent>
        <Header>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Header>
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </Layout>
  );
}
