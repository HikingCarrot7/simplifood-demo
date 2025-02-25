/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { authApi } from '../axios.service';
import { getSession } from './session.service';

export async function login(prevState: any, formData: FormData) {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    if (!username || !password) {
      return { error: 'Username and password fields are required' };
    }

    const body = { email: username, password };
    const response = await authApi.post('/api/login', body);

    const session = await getSession();
    session.isLoggedIn = true;
    session.username = username;
    session.token = response.data.token;
    session.refreshToken = response.data.token;
    await session.save();

    return { success: true };
  } catch (error: any) {
    if (error.response) {
      return { error: error.response.data.message || 'Check you credentials' };
    }
    return { error: 'Connection error' };
  }
}
