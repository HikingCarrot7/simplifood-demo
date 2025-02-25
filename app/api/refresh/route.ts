import { getSession } from '@/services/auth/session.service';
import { authApi } from '@/services/axios.service';

export async function GET() {
  const session = await getSession();
  const refreshToken = session.refreshToken;
  if (!refreshToken) {
    return Response.json({ error: 'No refresh token' }, { status: 401 });
  }

  try {
    const body = { email: 'eve.holt@reqres.in', password: 'cityslicka' };
    const response = await authApi.post('/api/login', body);

    // Update session token
    const { token } = response.data;

    session.token = token;
    session.refreshToken = token;
    await session.save();

    return Response.json({ token });
  } catch {
    await session.destroy();
    return Response.json({ error: 'Refresh failed' }, { status: 401 });
  }
}
