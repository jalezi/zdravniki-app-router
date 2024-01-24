'use client';

import { HTMLAttributes, PropsWithChildren } from 'react';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { VariantProps, cva } from 'class-variance-authority';
import {
  ChevronLeft,
  ChevronRight,
  ChevronFirst,
  ChevronLast,
  MoreHorizontal,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const paginationLinkVariants = cva(
  'rounded-full inline-flex items-center justify-center leading-none min-w-[4ch] p-[0.375rem] aspect-square text-sm transition-all text-white ',
  {
    variants: {
      variant: {
        default: 'bg-brand-500 hover:bg-brand-800',
        active: 'bg-brand-800 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface PaginationLinkProps
  extends VariantProps<typeof paginationLinkVariants>,
    PropsWithChildren<LinkProps> {
  className?: string;
}

const PaginationLink = function PaginationLink({
  href,
  variant,
  className,
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      href={href}
      className={cn(paginationLinkVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Link>
  );
};

export interface PaginationProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  length: number;
  pageSize: number;
  page: number;
  doctorType: string;
}

const ICON_SIZE = 16;

const Pagination = function Pagination({
  length,
  page: currentPage,
  pageSize,
  doctorType,
  className,
}: PaginationProps) {
  const pathname = usePathname();

  const maxPage = Math.floor(length / +pageSize) + 1;

  const pages = Array.from({ length: maxPage }, (_, i) => i + 1);

  const show = [
    ...new Set([
      ...pages.slice(currentPage - 3, currentPage),
      ...pages.slice(currentPage - 1, currentPage + 2),
    ]),
  ];

  const previousPage = currentPage === 1 ? 1 : currentPage - 1;
  const nextPage = currentPage === maxPage ? maxPage : currentPage + 1;
  const firstPage = 1;

  const styles = cn('flex flex-wrap items-center gap-1', className);

  return (
    <div className={styles}>
      <Link
        href={`${pathname}?type=${doctorType}&page=${firstPage}&pageSize=${pageSize}`}
        aria-label='First page'
        title='Go to the first page'
      >
        <ChevronFirst size={ICON_SIZE} />
      </Link>
      <Link
        href={`${pathname}?type=${doctorType}&page=${previousPage}&pageSize=${pageSize}`}
        aria-label='Previous page'
        title='Go to the previous page'
      >
        <ChevronLeft size={ICON_SIZE} />
      </Link>
      {currentPage > 1 ? (
        <span>
          <MoreHorizontal size={ICON_SIZE} />
        </span>
      ) : null}
      {show.map(page => {
        const searchParams = new URLSearchParams({
          type: doctorType,
          page: page.toString(),
          pageSize: pageSize.toString(),
        });

        return (
          <PaginationLink
            key={page}
            href={`${pathname}?${searchParams.toString()}`}
            variant={page === currentPage ? 'active' : 'default'}
            aria-label={`Page ${page}`}
          >
            {page}
          </PaginationLink>
        );
      })}
      {currentPage < maxPage ? (
        <span>
          <MoreHorizontal size={ICON_SIZE} />
        </span>
      ) : null}
      <Link
        href={`${pathname}?type=${doctorType}&page=${nextPage}&pageSize=${pageSize}`}
        aria-label='Next page'
        title='Go to the next page'
      >
        <ChevronRight size={ICON_SIZE} />
      </Link>
      <Link
        href={`${pathname}?type=${doctorType}&page=${maxPage}&pageSize=${pageSize}`}
        aria-label='Last page'
        title='Go to the last page'
      >
        <ChevronLast size={ICON_SIZE} />
      </Link>
    </div>
  );
};

export default Pagination;
