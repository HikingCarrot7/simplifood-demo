import { getSession } from '@/services/auth/session.service';
import { redirect, RedirectType } from 'next/navigation';

export default async function Home() {
  const session = await getSession();

  if (session.isLoggedIn) {
    return redirect('/order', RedirectType.replace);
  } else {
    return redirect('/login', RedirectType.replace);
  }
}
