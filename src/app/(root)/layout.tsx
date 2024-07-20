import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "../globals.css";
import Provider from "@/components/Provider";
import Container from "@/components/ui/container";
import Header from "@/components/shared/Header";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Created by pawandai using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} relative h-full antialiased`}>
        <Header />
        <Container>
          <Provider>
            <section className="flex-grow flex-1">{children}</section>
          </Provider>
        </Container>
      </body>
    </html>
  );
}
