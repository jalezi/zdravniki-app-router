import { ExternalLink, InternalLink } from '@/components/links';
import { getCurrentLocale, getScopedI18n } from '@/locales/server';
import type { SVGComponent } from '@/types';

import {
  STATIC_ROUTES,
  ROUTEST_WITH_NESTED_ROUTES,
  ROUTES_TRANSLATIONS,
} from '../../../rewrites-redirects.config.mjs';
import { SocialLink } from '../header/link';
import {
  GithubIcon,
  FacebookIcon,
  TwitterIcon,
  Logo,
  MediumIcon,
  YoutubeIcon,
  PodnebnikIcon,
  Covid19Icon,
  LogoIcon,
  DOCTOR_ICONS,
  ShieldQuestionIcon,
  BookOpenTextIcon,
  HeartHandshakeIcon,
} from '../icons';

const ROUTE_ICONS = {
  faq: ShieldQuestionIcon,
  about: BookOpenTextIcon,
  gp: DOCTOR_ICONS.gp.component,
  ped: DOCTOR_ICONS.ped.component,
  den: DOCTOR_ICONS.den.component,
  'den-y': DOCTOR_ICONS.y.component,
  'den-s': DOCTOR_ICONS.s.component,
  gyn: DOCTOR_ICONS.gyn.component,
} satisfies {
  [key in
    | (typeof STATIC_ROUTES)[number]
    | (typeof ROUTEST_WITH_NESTED_ROUTES)[number]]: SVGComponent;
};

interface InternalLinksProps {
  routes: typeof STATIC_ROUTES | typeof ROUTEST_WITH_NESTED_ROUTES;
}
const InternalLinks = async ({ routes }: InternalLinksProps) => {
  const locale = getCurrentLocale();
  const tNavLinks = await getScopedI18n('navLinks');

  const localeLinksTranslations = ROUTES_TRANSLATIONS[locale];
  return routes.map(key => {
    const label = tNavLinks(`${key}.label`);

    const Icon = ROUTE_ICONS[key];

    return (
      <li key={key}>
        <InternalLink
          variant='footer'
          href={`/${locale}/${localeLinksTranslations[key]}/`}
          canonicalHref={`/${locale}/${key}/`}
        >
          {Icon ? <Icon className='text-xl' /> : null}
          {label}
        </InternalLink>
      </li>
    );
  });
};

export default async function MdxFooter() {
  const locale = getCurrentLocale();
  const tNavLinks = await getScopedI18n('navLinks');
  const tFooter = await getScopedI18n('footer');

  return (
    <footer className='bg-footer-100'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 px-4 pb-4 md:grid-cols-2 lg:grid-cols-4'>
        <div className='border-t py-8 text-footer-800/80 lg:border-r lg:pl-8'>
          <Logo aria-labelledby='aria-logo' />
        </div>
        <nav
          aria-label='Main in Footer'
          className=' flex flex-col gap-4 border-t py-8 lg:border-r lg:pl-8'
        >
          <div className='text-xs font-medium uppercase tracking-widest text-footer-900'>
            {tNavLinks('doctors.label')}
          </div>
          <ul className='flex flex-col gap-2'>
            <InternalLinks routes={ROUTEST_WITH_NESTED_ROUTES} />
            <InternalLinks routes={STATIC_ROUTES} />
          </ul>
        </nav>
        <div className='flex flex-col gap-4 border-t py-8 lg:border-r lg:pl-8'>
          <div className='text-xs font-medium uppercase tracking-widest text-footer-900'>
            {tFooter('ourProjects')}
          </div>
          <ul className='flex flex-col gap-2'>
            <li>
              <ExternalLink
                variant='footer'
                href='https://covid-19.sledilnik.org/'
                target='_blank'
                rel='noopener'
              >
                <Covid19Icon className='text-xl' aria-hidden />
                {tNavLinks('covid19.label')}
              </ExternalLink>
            </li>
            <li>
              <InternalLink variant='footer' href={`/${locale}/`}>
                <span className='grid h-5 w-5 place-items-center'>
                  <LogoIcon className='text-lg' aria-hidden />
                </span>
                {tNavLinks('doctors.label')}
              </InternalLink>
            </li>
            <li>
              <ExternalLink
                variant='footer'
                href='https://podnebnik.org/'
                target='_blank'
                rel='noopener'
              >
                <PodnebnikIcon className='text-xl' aria-hidden />
                {tNavLinks('climatologist.label')}
              </ExternalLink>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-4 border-t py-8 lg:pl-8'>
          <div className='text-xs font-medium uppercase tracking-widest text-footer-900'>
            {tFooter('link.links', { count: 3 })}
          </div>
          <ul className='flex flex-col gap-2'>
            <li>
              <ExternalLink
                variant='footer'
                href={`https://covid-19.sledilnik.org/${locale}/donate`}
                target='_blank'
                rel='noopener'
              >
                <HeartHandshakeIcon
                  className='text-[1.25rem]'
                  strokeWidth={1.5}
                />{' '}
                {tNavLinks('donate.label')}
              </ExternalLink>
            </li>
            <li>
              <SocialLink href='https://medium.com/podnebnik' variant='footer'>
                <MediumIcon className='text-xl' aria-hidden />
                Medium
              </SocialLink>
            </li>
            <li>
              <SocialLink href='https://twitter.com/sledilnik' variant='footer'>
                <TwitterIcon className='text-xl' aria-hidden /> Twitter
              </SocialLink>
            </li>
            <li>
              <SocialLink href='https://fb.me/SledilnikOrg' variant='footer'>
                <FacebookIcon className='text-xl' aria-hidden /> Facebook
              </SocialLink>
            </li>
            <li>
              <SocialLink
                href='https://www.youtube.com/channel/UCM_Sk2GZ8vTMiyBQ0SMHgJw/videos'
                variant='footer'
              >
                <YoutubeIcon className='text-xl' aria-hidden /> YouTube
              </SocialLink>
            </li>
            <li>
              <SocialLink
                href='https://github.com/sledilnik/zdravniki'
                variant='footer'
              >
                <GithubIcon className='text-xl' aria-hidden />
                GitHub
              </SocialLink>
            </li>
          </ul>
        </div>
      </div>
      <div className='flex flex-col justify-between px-4 text-sm md:flex-row  md:border-t md:border-dashed'>
        <div className='border-t border-dashed py-4 md:border-none'>
          © 2020-2023 Znanstveno društvo Sledilnik
        </div>
        <div className='flex gap-8 border-t border-dashed py-4 md:border-none'>
          <ExternalLink
            variant='footer'
            className='text-sm'
            href='mailto:podpora-zdravniki@sledilnik.org'
            rel='noopener'
          >
            podpora-zdravniki@sledilnik.org
          </ExternalLink>
          <ExternalLink
            variant='footer'
            className='text-sm'
            href='https://sledilnik.org/'
            rel='noopener'
          >
            sledilnik.org
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
}
