import { AcceptsChip } from '@/components/chips';
import Tooltip from '@/components/ui/tooltip';
import type { AcceptsNewPatients } from '@/lib/schemas';

import { AcceptsContent } from './tooltip-content';

import type { OverrideNote } from './tooltip-content';

export type AcceptsProps = {
  load: number;
  acceptsNewPatients: AcceptsNewPatients;
  acceptsText: string;
} & OverrideNote;

// ? Should we show the date and note in the tooltip if accepts_override is empty?
export default function Accepts({
  load,
  acceptsNewPatients,
  acceptsText,
  date,
  note,
}: AcceptsProps) {
  const content =
    date && note ? (
      <AcceptsContent load={load} date={date} note={note} />
    ) : (
      <AcceptsContent load={load} />
    );

  return (
    <Tooltip content={content}>
      <AcceptsChip
        accepts={acceptsNewPatients}
        label={acceptsText}
        className='cursor-help place-self-center'
      />
    </Tooltip>
  );
}
