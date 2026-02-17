import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "25co — Coffee & Coworking Space | Solo",
  description:
    "25co adalah ruang kerja bersama dan kafe premium di jantung Kota Solo. Temukan tempat yang nyaman, estetik, dan produktif di Keprabon, Solo.",
  keywords: "coworking space solo, coffee solo, 25co, keprabon solo, tempat kerja solo",
  openGraph: {
    title: "25co — Coffee & Coworking Space | Solo",
    description: "Ruang kerja bersama dan kafe premium di jantung Kota Solo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
