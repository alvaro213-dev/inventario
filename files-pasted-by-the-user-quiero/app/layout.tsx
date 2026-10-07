import "./globals.css"; import type { Metadata } from "next";
export const metadata: Metadata = { title: "Inventario Pro", description: "Control de inventario empresarial" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body>{children}</body></html>; }
