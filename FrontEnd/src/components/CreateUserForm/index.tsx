'use client';

import { InputText } from '@/components/InputText';
import clsx from 'clsx';
import { UserRoundIcon, Eye, EyeOff } from 'lucide-react'; // Importados os ícones de olho
import Link from 'next/link';
import { Button } from '../Button';
import { PublicUserSchema } from '@/lib/user/schemas';
import { useActionState, useEffect, useState } from 'react'; // Adicionado useState
import { toast } from 'react-toastify';
import { createUserAction } from '@/actions/user/create-user-action';
import { HoneypotInput } from '../HoneypotInput';

export function CreateUserForm() {
  const [state, action, isPending] = useActionState(createUserAction, {
    user: PublicUserSchema.parse({}),
    errors: [],
    success: false,
  });

  // Estado para controlar a visibilidade das senhas
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    toast.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }
  }, [state]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action={action} className='flex-1 flex flex-col gap-6'>
        <InputText
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Seu nome'
          disabled={isPending}
          defaultValue={state.user.name}
          required
        />
        <InputText
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Seu e-mail'
          disabled={isPending}
          defaultValue={state.user.email}
          required
        />

        {/* Campo: Senha */}
        <div className="relative">
          <InputText
            type={showPassword ? 'text' : 'password'}
            name='password'
            labelText='Senha'
            placeholder='Sua senha'
            disabled={isPending}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-zinc-400 hover:text-zinc-200 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Campo: Repetir Senha */}
        <div className="relative">
          <InputText
            type={showPassword ? 'text' : 'password'}
            name='password2'
            labelText='Repetir senha'
            placeholder='Sua senha novamente'
            disabled={isPending}
            required
          />
          {/* Reutilizamos o mesmo showPassword para ambos os campos */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-zinc-400 hover:text-zinc-200 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <HoneypotInput />

        <Button disabled={isPending} type='submit' className='mt-4'>
          <UserRoundIcon />
          {!isPending && 'Criar conta'}
          {isPending && 'Criando...'}
        </Button>

        <p className='text-sm/tight'>
          <Link href='/login' className="text-zinc-500 hover:text-blue-800 transition-colors">
            Já tem conta? Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
