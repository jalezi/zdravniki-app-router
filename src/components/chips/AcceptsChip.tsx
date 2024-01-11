import { AcceptsNewPatients } from '@/lib/schemas';
import { getScopedI18n } from '@/locales/server';

import { ACCEPTS_NEW_PATIENTS_ICONS } from '../icons';
import { Chips, type ChipTypes } from '../ui/chip';

type ChipProps = ChipTypes.ChipProps;

export interface AcceptsChipProps {
  accepts: AcceptsNewPatients;
}

export default async function AcceptsChip({ accepts }: AcceptsChipProps) {
  const t = await getScopedI18n('doctor');

  const props: ChipProps = {
    text: t(`accepts.${accepts}.label`),
    icon: ACCEPTS_NEW_PATIENTS_ICONS[accepts].name,
    variant: 'accepts',
    colors: accepts === 'y' ? 'success' : 'error',
    size: 'xxs',
  };
  return <Chips.Chip {...props} />;
}
