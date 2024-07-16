import type { Metadata } from "next";
import "@/styles/base/_normalize.scss";
import "@/styles/base/_global.scss";
import "@/styles/base/_root.scss";
import { ThemeContextProvider } from "@/contexts/themeContext";
import {
  roboto,
  roboto_Condensed,
  roboto_Slab,
  rock_salt,
  didot,
  wellfleet,
} from "./fonts";
import Navbar from "@/components/global/navbar";
import Brand from "@/components/global/brand";
import Footer from "@/components/global/footer";

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
        className={`${roboto.variable} ${roboto_Condensed.variable} ${roboto_Slab.variable} ${rock_salt.variable} ${didot.variable} ${wellfleet.variable}`}
      >
        <ThemeContextProvider>
          <Navbar />
          <Brand />
          {children}
          <Footer />
        </ThemeContextProvider>
      </body>
    </html>
  );
}

export default RootLayout;
