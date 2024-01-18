import { EmailIcon } from '@/components/icons';

export interface EmailProps {
  email: string;
}

export default function Email({ email }: EmailProps) {
  return (
    <a
      href={`mailto:${email}`}
      className='inline-flex items-center gap-2 hover:text-accent-500'
    >
      <span className='text-xl'>
        <EmailIcon />
      </span>
      {email}
    </a>
  );
}
