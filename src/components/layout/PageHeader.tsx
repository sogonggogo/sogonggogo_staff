'use client';

import styled from '@emotion/styled';

const Header = styled.header`
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  padding: 32px 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-family: var(--font-ttangsbudae);
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-foreground);
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-family: var(--font-miwon);
  font-size: 16px;
  color: var(--primary-foreground);
  opacity: 0.9;
`;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <Header>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Header>
  );
}
