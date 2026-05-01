'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconAbout, IconContact, IconHome, IconMonitorPlay } from '../icons';

export default function SlideMenu() {
  const pathname = usePathname();

  const menuItems = [
    { icon: IconHome, href: '/home', label: 'Home' },
    { icon: IconMonitorPlay, href: '/home/thinking-demo', label: 'Thinking demo' },
    { icon: IconAbout, href: '/about', label: 'About' },
    { icon: IconContact, href: '/contact', label: 'Contact' },
  ];

  const activeHref = menuItems
    .map((item) => item.href)
    .filter((href) => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0];

  return (
    <nav
      aria-label="Primary"
      className="gradient-box w-full overflow-hidden rounded-tr-full rounded-br-full shadow-2xl"
    >
      <ul className="flex flex-col gap-y-3 px-1 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = item.href === activeHref;
          return (
            <li key={item.href} className="flex justify-center">
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                className={`group relative flex h-12 w-12 items-center justify-center rounded-full transition duration-200 ease-out ${
                  active
                    ? 'scale-105 bg-white/90 text-black shadow-lg'
                    : 'text-white/55 hover:scale-105 hover:bg-white/5 hover:text-white/90'
                }`}
              >
                <Icon className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                {active && (
                  <span
                    aria-hidden
                    className="bg-emerald-glow pointer-events-none absolute -left-1 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full shadow-[0_0_8px_#22c55e]"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
