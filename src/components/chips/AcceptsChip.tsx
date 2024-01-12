import { AcceptsNewPatients } from '@/lib/schemas';
import { getScopedI18n } from '@/locales/server';

import { ACCEPTS_NEW_PATIENTS_ICONS } from '../icons';
import { Chips, type ChipTypes } from '../ui/chip';

type ChipProps = ChipTypes.ChipProps;

export interface AcceptsChipProps {
  accepts: AcceptsNewPatients;
  className?: string;
  size?: ChipTypes.ChipProps['size'];
  iconSize?: ChipTypes.ChipProps['iconSize'];
}

export default async function AcceptsChip({
  accepts,
  ...props
}: AcceptsChipProps) {
  const t = await getScopedI18n('doctor');

  const AcceptsChipProps: ChipProps = {
    text: t(`accepts.${accepts}.label`),
    icon: ACCEPTS_NEW_PATIENTS_ICONS[accepts].name,
    variant: 'accepts',
    colors: accepts === 'y' ? 'success' : 'error',
    size: 'xs',
    ...props,
  };
  return <Chips.Chip {...AcceptsChipProps} />;
}
