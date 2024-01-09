import { icons } from './import-svg';

export type { IconName } from './import-svg';

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
  den: DentistIcon,
  gp: FamilyDrIcon,
  gyn: GynecologistIcon,
  ped: KidsIcon,
  y: KidsIcon,
  s: StudentsIcon,
  f: FloatingClinicIcon,
  x: ExtraClinicIcon,
} as const;
