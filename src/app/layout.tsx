import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Status | Platform Health",
  description: "Live view of platform uptime, incidents, and scheduled maintenance.",
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
