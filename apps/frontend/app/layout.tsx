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

// Runs before React hydrates — sets data-theme from localStorage so there is
// no flash when the stored preference differs from the CSS media-query default.
const themeScript = `(function(){var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t);})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
