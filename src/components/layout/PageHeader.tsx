'use client';

import styled from '@emotion/styled';

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
