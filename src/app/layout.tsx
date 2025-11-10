import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haojia Yu",
  description: "Personal Status Page",
  icons: {
    icon: "/personal-icon.svg",
    shortcut: "/personal-icon.svg",
    apple: "/personal-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
