'use client';

import { InputText } from '@/components/InputText';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { MailIcon, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-sm mt-16 mb-32 mx-auto text-center flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Recuperar Senha</h1>
        <p className="text-zinc-400">Insira seu e-mail para receber as instruções.</p>
      </div>

      <form className="flex flex-col gap-6 text-left">
        <InputText
          type="email"
          name="email"
          labelText="E-mail cadastrado"
          placeholder="exemplo@email.com"
          required
        />

        <Button type="submit">
          <MailIcon size={20} />
          Enviar link
        </Button>
      </form>

      <Link href="/login" className="flex items-center justify-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm">
        <ArrowLeft size={16} />
        Voltar para o login
      </Link>
    </div>
  );
}
