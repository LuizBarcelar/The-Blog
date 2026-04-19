'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const isLoginAllowed = process.env.NEXT_PUBLIC_ALLOW_LOGIN === '1';

  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-800 mb-8">
      <h1
        className={clsx(
          'text-4xl/normal font-extrabold py-8',
          'sm:text-5xl/normal sm:py-10',
          'md:text-6xl/normal md:py-11',
          'lg:text-7xl/normal lg:py-12',
        )}
      >
        <Link href='/'>The Blog</Link>
      </h1>

      {isHome && isLoginAllowed && (
        <div className="pb-8 md:pb-0">
          <Link
            href="/admin/post"
            className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors"
          >
            Menu
          </Link>
        </div>
      )}
    </header>
  );
}
