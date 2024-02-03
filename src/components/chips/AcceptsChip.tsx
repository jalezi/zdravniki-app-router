import { AcceptsNewPatients } from '@/lib/schemas';

import { ACCEPTS_NEW_PATIENTS_ICONS } from '../icons';
import { Chips, type ChipTypes } from '../ui/chip';

type ChipProps = ChipTypes.ChipProps;

export interface AcceptsChipProps {
  accepts: AcceptsNewPatients;
  className?: string;
  size?: ChipTypes.ChipProps['size'];
  iconSize?: ChipTypes.ChipProps['iconSize'];
  label: string;
  tabIndex?: ChipTypes.ChipProps['tabIndex'];
}

export default function AcceptsChip({ accepts, ...props }: AcceptsChipProps) {
  const AcceptsChipProps: ChipProps = {
    icon: ACCEPTS_NEW_PATIENTS_ICONS[accepts].name,
    variant: 'accepts',
    colors: accepts === 'y' ? 'success' : 'error',
    size: 'xs',
    ...props,
  };
  return <Chips.Chip {...AcceptsChipProps} />;
}
