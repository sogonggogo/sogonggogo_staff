'use client';

import styled from '@emotion/styled';
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { InventoryItem } from '@/data/inventory';
import { theme } from '@/styles/theme';

const InventoryTableWrapper = styled.div`
  background-color: ${theme.colors.inventory.cardBg};
  border: 1px solid ${theme.colors.inventory.badgeBg};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: ${theme.colors.inventory.headerBg};
  border-bottom: 1px solid ${theme.colors.inventory.badgeBg};
`;

const Th = styled.th`
  padding: ${theme.spacing.lg};
  text-align: left;
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.inventory.labelText};
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${theme.colors.inventory.badgeBg};
  transition: ${theme.transition.fast};

  &:hover {
    background-color: rgba(21, 101, 252, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: ${theme.spacing.lg};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.inventory.valueText};
`;

const ItemName = styled(Td)`
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.white};
`;

const CategoryBadge = styled.span`
  padding: ${theme.spacing.xs} 10px;
  border-radius: ${theme.borderRadius.lg};
  background-color: ${theme.colors.inventory.badgeBg};
  color: ${theme.colors.inventory.valueText};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.medium};
`;

const Quantity = styled.span<{ level: string }>`
  font-weight: ${theme.fontWeight.semibold};
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
  gap: 6px;
  padding: 6px 12px;
  border-radius: ${theme.borderRadius.xl};
  background-color: ${({ level }) => {
    const colors = {
      low: '#DC262620',
      medium: '#F59E0B20',
      good: '#10B98120',
    };
    return colors[level as keyof typeof colors];
  }};
  color: ${({ level }) => {
    const colors = {
      low: theme.colors.inventory.danger,
      medium: theme.colors.inventory.warning,
      good: theme.colors.inventory.success,
    };
    return colors[level as keyof typeof colors];
  }};
  font-family: ${theme.fontFamily.nanumGothic};
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
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
