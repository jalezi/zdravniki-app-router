import { headers } from 'next/headers';
import Link from 'next/link';

export default function NotFound() {
  const headersList = headers();
  const referer = headersList.get('referer');

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>Referer: {referer}</p>
      <Link href='/'>Return Home</Link>
    </div>
  );
}
