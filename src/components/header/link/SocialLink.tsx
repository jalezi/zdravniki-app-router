import { AnchorHTMLAttributes } from 'react';

export interface SocialLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='text-2xl transition-colors hover:text-text-400'
      aria-label={label}
    >
      {icon}
    </a>
  );
};

export default SocialLink;
