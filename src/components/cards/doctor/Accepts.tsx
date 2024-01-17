import { AcceptsChip } from '@/components/chips';
import Tooltip from '@/components/ui/tooltip';
import type { AcceptsNewPatients } from '@/lib/schemas';

import { AcceptsContent } from './tooltip-content';

export interface AcceptsProps {
  load: number;
  acceptsNewPatients: AcceptsNewPatients;
  acceptsText: string;
}

export default function Accepts({
  load,
  acceptsNewPatients,
  acceptsText,
}: AcceptsProps) {
  return (
    <Tooltip content={<AcceptsContent load={load} />}>
      <AcceptsChip
        accepts={acceptsNewPatients}
        label={acceptsText}
        className='cursor-help place-self-center'
      />
    </Tooltip>
  );
}
