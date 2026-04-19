'use client';

import { loginAction } from '@/actions/login/login-action';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import clsx from 'clsx';
import { LogInIcon, Eye, EyeOff } from 'lucide-react'; // Importados os ícones de olho
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react'; // Adicionado useState
import { toast } from 'react-toastify';
import { HoneypotInput } from '../HoneypotInput';

export function LoginForm() {
  const initialState = {
    email: '',
    errors: [],
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false); // Estado para a senha

  const router = useRouter();
  const searchParams = useSearchParams();
  const userChanged = searchParams.get('userChanged');
  const created = searchParams.get('created');

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(e => toast.error(e));
    }
  }, [state]);

  useEffect(() => {
    if (userChanged === '1') {
      toast.dismiss();
      toast.success('Seu usuário foi modificado. Faça login novamente.');
      const url = new URL(window.location.href);
      url.searchParams.delete('userChanged');
      router.replace(url.toString());
    }

    if (created === '1') {
      toast.dismiss();
      toast.success('Seu usuário criado.');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [userChanged, created, router]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action={action} className='flex-1 flex flex-col gap-6'>
        <InputText
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Seu e-mail'
          disabled={isPending}
          defaultValue={state.email}
          required
        />

        <div className="relative">
          <InputText
            type={showPassword ? 'text' : 'password'} // Alterna entre text e password
            name='password'
            labelText='Senha'
            placeholder='Sua senha'
            disabled={isPending}
            required
          />
          {/* Botão de Visualizar Senha */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-zinc-400 hover:text-zinc-200 transition-colors"
            tabIndex={-1} // Evita que o Tab pare no ícone antes do botão entrar
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <HoneypotInput />

        <Button disabled={isPending} type='submit' className='mt-4'>
          <LogInIcon />
          Entrar
        </Button>

        {/* Links de Suporte e Cadastro */}
        <div className='flex flex-col gap-3 text-sm'>
          <Link
            href='/auth/forgot-password'
            className="text-zinc-500 hover:text-blue-800 transition-colors"
          >
            Esqueceu sua senha?
          </Link>

          <Link href='/user/new' className="text-zinc-500 font-bold hover:text-blue-800 transition-colors underline">
            Crie sua conta
          </Link>
        </div>
      </form>
    </div>
  );
}
