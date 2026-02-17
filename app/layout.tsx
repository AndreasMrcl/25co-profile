import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "25co — Coffee & Coworking Space | Solo",
  description: "25co adalah ruang kerja bersama dan kafe premium di jantung Kota Solo.",
  openGraph: {
    title: "25co — Coffee & Coworking Space | Solo",
    description: "Ruang kerja bersama dan kafe premium di jantung Kota Solo",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
