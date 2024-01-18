import { AcceptsChip } from '@/components/chips';
import Tooltip from '@/components/ui/tooltip';
import type { AcceptsNewPatients, DateSchema } from '@/lib/schemas';

import { AcceptsContent } from './tooltip-content';

export interface AcceptsProps {
  load: number;
  acceptsNewPatients: AcceptsNewPatients;
  acceptsText: string;
  date: DateSchema | null;
  note: string | null;
}

export default function Accepts({
  load,
  acceptsNewPatients,
  acceptsText,
  date,
  note,
}: AcceptsProps) {
  return (
    <Tooltip content={<AcceptsContent load={load} date={date} note={note} />}>
      <AcceptsChip
        accepts={acceptsNewPatients}
        label={acceptsText}
        className='cursor-help place-self-center'
      />
    </Tooltip>
  );
}
