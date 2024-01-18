import BanIcon from '@/assets/svg/icon-ban-2.svg';
import CheckCircleIcon from '@/assets/svg/icon-check-circle.svg';
import ExtraClinicIcon from '@/assets/svg/icon-clinic.svg';
import Covid19Icon from '@/assets/svg/icon-covid19.svg';
import DentistIcon from '@/assets/svg/icon-dentist.svg';
import EmailIcon from '@/assets/svg/icon-email.svg';
import FamilyDrIcon from '@/assets/svg/icon-family-dr.svg';
import FacebookIcon from '@/assets/svg/icon-fb.svg';
import GithubIcon from '@/assets/svg/icon-github.svg';
import FloatingClinicIcon from '@/assets/svg/icon-gp-floating.svg';
import GynecologistIcon from '@/assets/svg/icon-gynecologist.svg';
import KidsIcon from '@/assets/svg/icon-kids.svg';
import MediumIcon from '@/assets/svg/icon-medium.svg';
import PodnebnikIcon from '@/assets/svg/icon-podnebnik.svg';
import StudentsIcon from '@/assets/svg/icon-students.svg';
import TwitterIcon from '@/assets/svg/icon-tw.svg';
import YoutubeIcon from '@/assets/svg/icon-youtube.svg';
import Logo from '@/assets/svg/zdravniki-sledilnik-logo.svg';
import type { SVGComponent } from '@/types';

export const icons = {
  BanIcon: BanIcon as SVGComponent,
  CheckCircleIcon: CheckCircleIcon as SVGComponent,
  EmailIcon: EmailIcon as SVGComponent,
  Logo: Logo as SVGComponent,
  LogoIcon: FamilyDrIcon as SVGComponent,
  FamilyDrIcon: FamilyDrIcon as SVGComponent,
  FacebookIcon: FacebookIcon as SVGComponent,
  GithubIcon: GithubIcon as SVGComponent,
  MediumIcon: MediumIcon as SVGComponent,
  TwitterIcon: TwitterIcon as SVGComponent,
  YoutubeIcon: YoutubeIcon as SVGComponent,
  Covid19Icon: Covid19Icon as SVGComponent,
  PodnebnikIcon: PodnebnikIcon as SVGComponent,
  StudentsIcon: StudentsIcon as SVGComponent,
  GynecologistIcon: GynecologistIcon as SVGComponent,
  KidsIcon: KidsIcon as SVGComponent,
  DentistIcon: DentistIcon as SVGComponent,
  ExtraClinicIcon: ExtraClinicIcon as SVGComponent,
  FloatingClinicIcon: FloatingClinicIcon as SVGComponent,
};

export type IconName = keyof typeof icons;
