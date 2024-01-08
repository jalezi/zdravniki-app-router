import ExtraClinicIcon from '@/assets/svg/icon-clinic.svg';
import DentistIcon from '@/assets/svg/icon-dentist.svg';
import FamilyDrIcon from '@/assets/svg/icon-family-dr.svg';
import FloatingClinicIcon from '@/assets/svg/icon-gp-floating.svg';
import GynecologistIcon from '@/assets/svg/icon-gynecologist.svg';
import KidsIcon from '@/assets/svg/icon-kids.svg';
import StudentsIcon from '@/assets/svg/icon-students.svg';

export const DOCTOR_ICONS = {
  den: DentistIcon,
  gp: FamilyDrIcon,
  gyn: GynecologistIcon,
  ped: KidsIcon,
  y: KidsIcon,
  s: StudentsIcon,
  f: FloatingClinicIcon,
  x: ExtraClinicIcon,
} as const;
