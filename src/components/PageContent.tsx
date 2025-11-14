'use client';

import styled from '@emotion/styled';

const Content = styled.div`
  padding: 24px;
`;

interface PageContentProps {
  children: React.ReactNode;
}

export default function PageContent({ children }: PageContentProps) {
  return <Content>{children}</Content>;
}
