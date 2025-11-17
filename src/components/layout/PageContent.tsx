'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const Content = styled.div`
  padding: ${theme.spacing.xxxl};
  background: ${theme.colors.background.dark};
  min-height: 100vh;
  flex: 1;
  overflow-y: auto;
`;

interface PageContentProps {
  children: React.ReactNode;
}

export default function PageContent({ children }: PageContentProps) {
  return <Content>{children}</Content>;
}
