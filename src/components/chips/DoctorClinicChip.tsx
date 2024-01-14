import { DoctorTypeCsv, extractDoctorCsvClinicSchema } from '@/lib/schemas';
import { getScopedI18n } from '@/locales/server';

import { DOCTOR_ICONS } from '../icons';
import { Chips, type ChipTypes } from '../ui/chip';

type ChipProps = ChipTypes.ChipProps;

export interface DoctorClinicChipProps {
  type: DoctorTypeCsv;
}

export default async function DoctorClinicChip({
  type,
}: DoctorClinicChipProps) {
  const safeClinicType = extractDoctorCsvClinicSchema.safeParse(type);

  const t = await getScopedI18n('doctor');

  if (safeClinicType.success) {
    const clinicType = safeClinicType.data;
    const clinicTypeIconName = DOCTOR_ICONS[clinicType].name;
    const props: ChipProps = {
      label: t(`clinic.${clinicType}.label`),
      icon: clinicTypeIconName,
      variant: 'default',
      colors: 'clinic',
    };
    return <Chips.Chip {...props} />;
  }
  return null;
}
