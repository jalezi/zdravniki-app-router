import { AnchorHTMLAttributes, ReactNode } from 'react';

export interface SocialLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label, ...props }: SocialLinkProps) => {
  return (
    <a
      href={href}
      target='_blank'
      className='text-2xl transition-colors hover:text-text-400'
      aria-label={label}
      {...props}
    >
      {icon}
    </a>
  );
};

export default SocialLink;
