import { icons } from './import-svg';

export { icons as Icons } from './import-svg';
export type { IconName } from './import-svg';

export const BanIcon = icons.BanIcon;
export const CheckCircleIcon = icons.CheckCircleIcon;
export const EmailIcon = icons.EmailIcon;
export const Logo = icons.Logo;
export const LogoIcon = icons.LogoIcon;
export const FamilyDrIcon = icons.FamilyDrIcon;
export const FacebookIcon = icons.FacebookIcon;
export const GithubIcon = icons.GithubIcon;
export const MediumIcon = icons.MediumIcon;
export const TwitterIcon = icons.TwitterIcon;
export const YoutubeIcon = icons.YoutubeIcon;
export const Covid19Icon = icons.Covid19Icon;
export const PodnebnikIcon = icons.PodnebnikIcon;
export const StudentsIcon = icons.StudentsIcon;
export const GynecologistIcon = icons.GynecologistIcon;
export const KidsIcon = icons.KidsIcon;
export const DentistIcon = icons.DentistIcon;
export const ExtraClinicIcon = icons.ExtraClinicIcon;
export const FloatingClinicIcon = icons.FloatingClinicIcon;

export const DOCTOR_ICONS = {
  den: { name: 'DentistIcon', component: DentistIcon },
  gp: { name: 'FamilyDrIcon', component: FamilyDrIcon },
  gyn: { name: 'GynecologistIcon', component: GynecologistIcon },
  ped: { name: 'KidsIcon', component: KidsIcon },
  x: { name: 'ExtraClinicIcon', component: ExtraClinicIcon },
  f: { name: 'FloatingClinicIcon', component: FloatingClinicIcon },
  s: { name: 'StudentsIcon', component: StudentsIcon },
  y: { name: 'KidsIcon', component: KidsIcon },
} as const;

export const ACCEPTS_NEW_PATIENTS_ICONS = {
  y: { name: 'CheckCircleIcon', component: CheckCircleIcon },
  n: { name: 'BanIcon', component: BanIcon },
} as const;
