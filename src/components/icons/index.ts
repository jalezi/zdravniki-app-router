import { icons } from './import-svg';

export { icons as Icons } from './import-svg';
export type { IconName } from './import-svg';

export const AlertCircleIcon = icons.AlertCircleIcon;
export const BabyIcon = icons.BabyIcon;
export const BanIcon = icons.BanIcon;
export const BookingIcon = icons.BookingIcon;
export const BookOpenTextIcon = icons.BookOpenTextIcon;
export const CheckCircleIcon = icons.CheckCircleIcon;
export const ChevronDownIcon = icons.ChevronDownIcon;
export const ChevronFirstIcon = icons.ChevronFirstIcon;
export const ChevronLastIcon = icons.ChevronLastIcon;
export const ChevronLeftIcon = icons.ChevronLeftIcon;
export const ChevronRightIcon = icons.ChevronRightIcon;
export const ChevronUpIcon = icons.ChevronUpIcon;
export const ConstructionIcon = icons.ConstructionIcon;
export const Covid19Icon = icons.Covid19Icon;
export const DentistIcon = icons.DentistIcon;
export const EmailIcon = icons.EmailIcon;
export const ExtraClinicIcon = icons.ExtraClinicIcon;
export const FacebookIcon = icons.FacebookIcon;
export const FloatingClinicIcon = icons.FloatingClinicIcon;
export const FamilyDrIcon = icons.FamilyDrIcon;
export const GithubIcon = icons.GithubIcon;
export const GynecologistIcon = icons.GynecologistIcon;
export const HeartHandshakeIcon = icons.HeartHandshakeIcon;
export const KidsIcon = icons.KidsIcon;
export const LanguagesIcon = icons.LanguagesIcon;
export const LinkIcon = icons.LinkIcon;
export const Logo = icons.Logo;
export const LogoIcon = icons.LogoIcon;
export const MediumIcon = icons.MediumIcon;
export const MoreHorizontalIcon = icons.MoreHorizontalIcon;
export const PanelLeftOpenIcon = icons.PanelLeftOpenIcon;
export const PhoneIcon = icons.PhoneIcon;
export const PodnebnikIcon = icons.PodnebnikIcon;
export const SearchIcon = icons.SearchIcon;
export const ShieldQuestionIcon = icons.ShieldQuestionIcon;
export const StudentsIcon = icons.StudentsIcon;
export const TwitterIcon = icons.TwitterIcon;
export const XIcon = icons.XIcon;
export const YoutubeIcon = icons.YoutubeIcon;

export const DOCTOR_ICONS = {
  den: { name: 'DentistIcon', component: DentistIcon },
  gp: { name: 'FamilyDrIcon', component: FamilyDrIcon },
  gyn: { name: 'GynecologistIcon', component: GynecologistIcon },
  ped: { name: 'BabyIcon', component: BabyIcon },
  x: { name: 'ExtraClinicIcon', component: ExtraClinicIcon },
  f: { name: 'FloatingClinicIcon', component: FloatingClinicIcon },
  s: { name: 'StudentsIcon', component: StudentsIcon },
  y: { name: 'KidsIcon', component: KidsIcon },
} as const;

export const ACCEPTS_NEW_PATIENTS_ICONS = {
  y: { name: 'CheckCircleIcon', component: CheckCircleIcon },
  n: { name: 'BanIcon', component: BanIcon },
} as const;
