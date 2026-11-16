import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Mis Gastos",
  description: "Control sencillo de gastos personales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen font-sans antialiased">
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-6 sm:py-10">{children}</main>
      </body>
    </html>
  );
}
