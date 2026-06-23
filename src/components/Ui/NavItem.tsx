"use client";

interface NavItemProps {
  label: string;
  href: string;
  onClick?: () => void;
}

/**
 * Item do menu. Ao hoverar, o texto "rola" para cima e uma cópia em cream entra
 * por baixo — efeito de troca via dois textos sobrepostos + overflow hidden.
 */
export default function NavItem({ label, href, onClick }: NavItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative block overflow-hidden font-archivo text-4xl leading-[1.18] text-white md:text-6xl"
    >
      <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
        {label}
      </span>
      <span
        aria-hidden
        className="absolute left-0 top-0 block translate-y-full text-cream transition-transform duration-300 ease-in-out group-hover:translate-y-0"
      >
        {label}
      </span>
    </a>
  );
}
