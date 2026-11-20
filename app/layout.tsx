import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ajova | Save together. Grow together.",
  description: "A calm, communal way to save, invest, and learn.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
