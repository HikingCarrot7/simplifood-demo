'use client';

import Button from '@/components/shared/button';
import { login } from '@/services/auth/login.service';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(login, { error: null });

  useEffect(() => {
    if (state?.success) {
      router.replace('/order');
    }
  }, [state, router]);

  return (
    <div className='container max-w-[600px] py-12 px-4 sm:px-6 lg:px-8 mx-auto'>
      <div className='max-w-md w-full space-y-8'>
        <h2 className='mt-6 text-3xl font-bold tracking-tight text-gray-900'>
          Iniciar sesión
        </h2>
      </div>
      <form action={formAction} className='mt-8 space-y-3'>
        <div className='space-y-4 rounded-md shadow-sm'>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Correo electrónico
            </label>
            <input
              type='text'
              id='username'
              name='username'
              defaultValue='eve.holt@reqres.in'
              className='appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-simplifud focus:border-simplifud focus:z-10 sm:text-sm'
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              name='password'
              defaultValue='cityslicka'
              className='appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-simplifud focus:border-simplifud focus:z-10 sm:text-sm'
            />
          </div>
        </div>

        {state?.error && (
          <p
            className='text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3'
            aria-live='polite'
          >
            {state.error}
          </p>
        )}

        <div className='flex justify-end'>
          <Button type='submit' disabled={pending}>
            Iniciar sesión
          </Button>
        </div>
      </form>
    </div>
  );
}
