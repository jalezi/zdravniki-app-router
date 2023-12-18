import Link from 'next/link';

import { HeartHandshake } from 'lucide-react';

import { getCurrentLocale, getScopedI18n } from '@/locales/server';

import { NavLink, SocialLink } from '../header/link';
import {
  GithubIcon,
  FacebookIcon,
  TwitterIcon,
  Logo,
  MediumIcon,
  YoutubeIcon,
} from '../icons';

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
        <div className=' flex flex-col gap-4 border-t py-8 lg:border-r lg:pl-8'>
          <div className='text-xs font-medium uppercase tracking-widest text-footer-900'>
            {tNavLinks('doctors.label')}
          </div>
          <ul className='flex flex-col gap-2'>
            <li>
              <NavLink
                as={Link}
                variant='footer'
                href={`/${locale}/${tNavLinks('home.slug')}/`}
              >
                {tNavLinks('home.label')}
              </NavLink>
            </li>
            <li>
              <NavLink
                as={Link}
                variant='footer'
                href={`/${locale}/${tNavLinks('faq.slug')}/`}
              >
                {tNavLinks('faq.label')}
              </NavLink>
            </li>
            <li>
              <NavLink
                as={Link}
                variant='footer'
                href={`/${locale}/${tNavLinks('about.slug')}/`}
              >
                {tNavLinks('about.label')}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-4 border-t py-8 lg:border-r lg:pl-8'>
          <div className='text-xs font-medium uppercase tracking-widest text-footer-900'>
            {tFooter('ourProjects')}
          </div>
          <ul className='flex flex-col gap-2'>
            <li>
              <NavLink
                variant='footer'
                as='a'
                href='https://covid-19.sledilnik.org/'
                target='_blank'
              >
                {tNavLinks('covid19.label')}
              </NavLink>
            </li>
            <li>
              <NavLink as={Link} variant='footer' href={`/${locale}/`}>
                {tNavLinks('doctors.label')}
              </NavLink>
            </li>
            <li>
              <NavLink
                as='a'
                variant='footer'
                href='https://podnebnik.org/'
                target='_blank'
              >
                {tNavLinks('climatologist.label')}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-4 border-t py-8 lg:pl-8'>
          <div className='text-xs font-medium uppercase tracking-widest text-footer-900'>
            {tFooter('link.links', { count: 3 })}
          </div>
          <ul className='flex flex-col gap-2'>
            <li>
              <NavLink
                as='a'
                variant='footer'
                href={`https://covid-19.sledilnik.org/${locale}/donate`}
                target='_blank'
              >
                <HeartHandshake size={20} strokeWidth={1.5} />{' '}
                {tNavLinks('donate.label')}
              </NavLink>
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
          <NavLink
            as='a'
            variant='footer'
            className='text-sm'
            href='mailto:podpora-zdravniki@sledilnik.org'
          >
            podpora-zdravniki@sledilnik.org
          </NavLink>
          <NavLink
            as='a'
            variant='footer'
            className='text-sm'
            href='https://sledilnik.org/'
          >
            sledilnik.org
          </NavLink>
        </div>
      </div>
    </footer>
  );
}