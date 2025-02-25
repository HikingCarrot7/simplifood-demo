import { UserSession } from '@/models/user-session';
import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export const defaultSession: UserSession = {
  isLoggedIn: false,
  username: '',
  token: '',
  refreshToken: '',
};

export const sessionOptions: SessionOptions = {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'user_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession() {
  'use server';

  const cookieStore = await cookies();
  const session = await getIronSession<UserSession>(
    cookieStore,
    sessionOptions
  );
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.username = defaultSession.username;
    session.token = defaultSession.token;
    session.refreshToken = defaultSession.refreshToken;
  }
  return session;
}
