'use client';

import styled from '@emotion/styled';
import { Delivery } from '@/data/deliveries';
import DeliveryCard from './DeliveryCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 16px;
`;

interface DeliveryGridProps {
  deliveries: Delivery[];
}

export default function DeliveryGrid({ deliveries }: DeliveryGridProps) {
  return (
    <Grid>
      {deliveries.map((delivery) => (
        <DeliveryCard key={delivery.id} delivery={delivery} />
      ))}
    </Grid>
  );
}
