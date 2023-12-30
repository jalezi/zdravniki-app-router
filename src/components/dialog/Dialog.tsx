'use client';

import {
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Timer } from '@/components/timer';
import ValidationError from '@/lib/errors/ValidationError';

interface DialogProps
  extends HTMLAttributes<HTMLDialogElement>,
    PropsWithChildren<{
      showModal?: true | undefined;
      close?: () => void;
      closeTimeout: number | false;
    }> {}

export default function Dialog({
  children,
  showModal,
  close,
  closeTimeout = 5000,
  ...props
}: DialogProps) {
  const ref = useRef<HTMLDialogElement | null>(null);
  const [state, setState] = useState(!!showModal);

  if (closeTimeout && closeTimeout < 1000) {
    throw new ValidationError({
      message: 'closeTimeout must be greater than 1000',
      context: { closeTimeout },
    });
  }

  const handleClose = useCallback(() => {
    setState(false);
    close?.();
  }, [close]);

  useEffect(() => {
    if (state) {
      ref.current?.showModal();

      if (closeTimeout === false) {
        return;
      }

      const timeout = setTimeout(() => {
        handleClose();
      }, closeTimeout);

      return () => {
        clearTimeout(timeout);
      };
    }

    ref.current?.close();
  }, [state, handleClose, closeTimeout]);

  return (
    <dialog ref={ref} {...props}>
      <div className='flex flex-col gap-4 px-8 py-4'>
        {children}
        {closeTimeout !== false && (
          <Timer initialTime={Math.round(closeTimeout / 1000)} />
        )}
        <button
          onClick={handleClose}
          className='ml-auto cursor-pointer px-4 py-2 text-sm'
        >
          Close
        </button>
      </div>
    </dialog>
  );
}
