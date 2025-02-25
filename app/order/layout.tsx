import { getSession } from '@/services/auth/session.service';
import { redirect, RedirectType } from 'next/navigation';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return redirect('/login', RedirectType.replace);
  }

  return <div>{children}</div>;
}
