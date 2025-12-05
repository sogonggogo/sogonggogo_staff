'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const Header = styled.header`
  background: ${theme.colors.gradientPrimary};
  padding: ${theme.spacing.xxxl} ${theme.spacing['4xl']};
  box-shadow: ${theme.shadow.xl};
`;

const Title = styled.h1`
  font-family: ${theme.fontFamily.ttangsbudae};
  font-size: ${theme.fontSize['5xl']};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.md};
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-family: ${theme.fontFamily.miwon};
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.text.white};
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
