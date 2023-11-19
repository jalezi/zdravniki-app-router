import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

export type MDXExternalLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement>
>;

export const MDXLink = ({
  href,
  children,
  target,
  ...props
}: MDXExternalLinkProps) => {
  if (!href) {
    return false;
  }

  const _target =
    target ?? (href.startsWith('/') || href.startsWith('#'))
      ? undefined
      : '_blank';

  return (
    <a href={href} target={_target} {...props}>
      {children}
    </a>
  );
};
