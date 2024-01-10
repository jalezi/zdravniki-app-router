import {
  extractDoctorCsvBaseTypeSchema,
  extractDoctorCsvSubtypeSchema,
} from '@/lib/schemas';
import type { DoctorTypeCsv } from '@/lib/schemas';
import { getScopedI18n } from '@/locales/server';

import { DOCTOR_ICONS } from '../icons';
import { Chips } from '../ui/chip';

import type { ChipTypes } from '../ui/chip';

type ChipProps = ChipTypes.ChipProps;
type DoubleChipProps = ChipTypes.DoubleChipProps;

const extractBaseType = extractDoctorCsvBaseTypeSchema;
const extractSubtype = extractDoctorCsvSubtypeSchema;

export interface DoctorTypeChipProps {
  type: DoctorTypeCsv;
}

export default async function DoctorTypeChip({ type }: DoctorTypeChipProps) {
  const safeBaseType = extractBaseType.safeParse(type);
  const safeSubtype = extractSubtype.safeParse(type);

  const isSingleChip = safeBaseType.success && !safeSubtype.success;
  const isDoubleChip = safeBaseType.success && safeSubtype.success;

  const t = await getScopedI18n('doctor');

  if (isSingleChip) {
    const baseType = safeBaseType.data;
    const iconName = DOCTOR_ICONS[baseType].name;

    const props: ChipProps = {
      text: t(`type.${baseType}.label`),
      icon: iconName,
      variant: 'default',
      colors: 'default',
    };

    return <Chips.Chip {...props} />;
  }

  if (isDoubleChip) {
    const baseType = safeBaseType.data;
    const subtype = safeSubtype.data;

    const baseTypeIconName = DOCTOR_ICONS[baseType].name;
    const subtypeIconName = DOCTOR_ICONS[subtype].name;

    const props: DoubleChipProps = {
      icons: [baseTypeIconName, subtypeIconName],
      texts: [t(`type.${baseType}.label`), t(`subtype.${subtype}.label`)],
      colors: ['default', 'subtype'],
    };

    return <Chips.DoubleChip {...props} />;
  }

  return null;
}
