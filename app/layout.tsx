import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/header/Header";
import CartPopup from "./components/cart/CartPopup";
import ClientWrapper from "./components/ClientWrapper";

export const metadata: Metadata = {
  title: "GKI Shop",
  description: "Client-only demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ClientWrapper>
          <CartPopup />
        </ClientWrapper>
        <main style={{ maxWidth: 960, margin: "0 auto", padding: "16px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
