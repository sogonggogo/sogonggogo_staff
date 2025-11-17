'use client';

import styled from '@emotion/styled';
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { InventoryItem } from '@/data/inventory';
import { theme } from '@/styles/theme';

const InventoryTableWrapper = styled.div`
  background: ${theme.colors.background.darker};
  border: 1px solid ${theme.colors.border.dark};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: ${theme.colors.background.darkest};
  border-bottom: 1px solid ${theme.colors.border.dark};
`;

const Th = styled.th`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  text-align: left;
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.tertiary};
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${theme.colors.border.dark};
  transition: ${theme.transition.all};

  &:hover {
    background: ${theme.colors.background.darkest};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.light};
`;

const ItemName = styled(Td)`
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
`;

const CategoryBadge = styled.span`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.xs};
  background: ${theme.colors.background.darkest};
  color: ${theme.colors.text.tertiary};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  border: 1px solid ${theme.colors.border.darker};
`;

const Quantity = styled.span<{ level: string }>`
  font-weight: ${theme.fontWeight.bold};
  color: ${({ level }) => {
    const colors = {
      low: theme.colors.status.danger,
      medium: theme.colors.status.warning,
      good: theme.colors.status.completed,
    };
    return colors[level as keyof typeof colors];
  }};
`;

const StockBadge = styled.span<{ level: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.xs};
  background: ${({ level }) => {
    const colors = {
      low: `${theme.colors.status.danger}20`,
      medium: `${theme.colors.status.warning}20`,
      good: `${theme.colors.status.completed}20`,
    };
    return colors[level as keyof typeof colors];
  }};
  color: ${({ level }) => {
    const colors = {
      low: theme.colors.status.danger,
      medium: theme.colors.status.warning,
      good: theme.colors.status.completed,
    };
    return colors[level as keyof typeof colors];
  }};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.bold};
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const getIcon = (level: string) => {
  const icons = {
    low: AlertTriangle,
    medium: TrendingDown,
    good: TrendingUp,
  };
  return icons[level as keyof typeof icons];
};

interface InventoryTableProps {
  items: InventoryItem[];
}

export default function InventoryTable({ items }: InventoryTableProps) {
  return (
    <InventoryTableWrapper>
      <Table>
        <TableHeader>
          <tr>
            <Th>품목명</Th>
            <Th>카테고리</Th>
            <Th>현재 재고</Th>
            <Th>최소 재고</Th>
            <Th>상태</Th>
            <Th>마지막 입고</Th>
          </tr>
        </TableHeader>
        <tbody>
          {items.map((item) => {
            const Icon = getIcon(item.stockLevel);
            return (
              <Tr key={item.id}>
                <ItemName>{item.name}</ItemName>
                <Td>
                  <CategoryBadge>{item.category}</CategoryBadge>
                </Td>
                <Td>
                  <Quantity level={item.stockLevel}>
                    {item.quantity} {item.unit}
                  </Quantity>
                </Td>
                <Td>
                  {item.minStock} {item.unit}
                </Td>
                <Td>
                  <StockBadge level={item.stockLevel}>
                    <IconWrapper>
                      <Icon size={14} />
                    </IconWrapper>
                    {item.stockLevelText}
                  </StockBadge>
                </Td>
                <Td>{item.lastRestocked}</Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </InventoryTableWrapper>
  );
}
