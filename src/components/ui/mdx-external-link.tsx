import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

export type MDXExternalLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement>
>;

export const MDXExternalLink = ({
  href,
  children,
  ...props
}: MDXExternalLinkProps) => {
  if (!href) {
    return false;
  }

  return (
    <a href={href} target='_blank' {...props}>
      {children}
    </a>
  );
};
