import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "../globals.css";
import Provider from "@/components/Provider";
import { PropsWithChildren } from "react";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Login",
  description: "Created by pawandai using Next.js",
};

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={`${urbanist.className} relative h-full antialiased`}>
        <Provider>
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
};

export default AuthLayout;
