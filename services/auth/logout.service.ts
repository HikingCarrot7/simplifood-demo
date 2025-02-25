import { revalidatePath } from 'next/cache';
import { getSession } from './session.service';

export async function logout() {
  'use server';

  const session = await getSession();
  session.destroy();
  revalidatePath('/order');
}
