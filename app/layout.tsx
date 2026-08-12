import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketing Digital IA | Agência Automática 24/7",
  description:
    "Agência de tráfego pago 100% automatizada com IA. Criamos, monitoramos e otimizamos campanhas no Meta Ads sem intervenção humana. Resultados reais 24h por dia.",
  keywords: "tráfego pago, meta ads, facebook ads, instagram ads, marketing digital, automação IA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18317904543"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18317904543');
        `}</Script>
      </head>
      <body className="min-h-screen bg-black text-white antialiased">{children}</body>
    </html>
  );
}
