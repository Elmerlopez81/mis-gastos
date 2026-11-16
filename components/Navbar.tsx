"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const enlaces = [
  { href: "/", texto: "Resumen" },
  { href: "/movimientos", texto: "Movimientos" },
  { href: "/categorias", texto: "Categorías" },
  { href: "/nuevo", texto: "Agregar" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  // al cambiar de página se cierra el menú del celular
  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  return (
    <header className="border-b border-black/10 bg-white">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-[var(--verde)]">
          Mis Gastos
        </Link>

        <button
          className="rounded border border-black/20 px-3 py-1 text-sm sm:hidden"
          onClick={() => setAbierto(!abierto)}
          aria-expanded={abierto}
        >
          {abierto ? "Cerrar" : "Menú"}
        </button>

        <ul
          className={`${
            abierto ? "flex" : "hidden"
          } absolute left-0 right-0 top-[52px] flex-col gap-1 border-b border-black/10 bg-white p-4 sm:static sm:flex sm:flex-row sm:border-0 sm:p-0`}
        >
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                className={`block rounded px-3 py-1.5 text-sm ${
                  pathname === e.href
                    ? "bg-[var(--verde)] text-white"
                    : "hover:bg-black/5"
                }`}
              >
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
