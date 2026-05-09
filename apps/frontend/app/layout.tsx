import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/_variables.scss";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
});

export const metadata: Metadata = {
  title: "Dima Pereimak — Full Stack Developer",
  description:
    "Full stack developer portfolio — Next.js, NestJS, TypeScript. Available for new opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={inter.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
