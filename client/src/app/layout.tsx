import type { Metadata } from "next";
import "@/styles/base/_normalize.scss";
import "@/styles/base/_global.scss";
import { ThemeContextProvider } from "@/contexts/themeContext";
import {
  roboto,
  roboto_Condensed,
  roboto_Slab,
  rock_salt,
  didot,
} from "./fonts";
import Navbar from "@/components/global/navbar";
import Brand from "@/components/global/brand";

export const metadata: Metadata = {
  title: "traveller",
  description: "this is an travell blog website",
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${roboto_Condensed.variable} ${roboto_Slab.variable} ${rock_salt.variable} ${didot.variable}`}
      >
        <ThemeContextProvider>
          <Navbar />
          <Brand />
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}

export default RootLayout;
