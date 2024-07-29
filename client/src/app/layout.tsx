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
  oswald,
  wellfleet,
} from "./fonts";
import ReduxProvider from "@/store/provider";

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
        className={`${roboto.variable} ${roboto_Condensed.variable} ${roboto_Slab.variable} ${rock_salt.variable} ${oswald.variable} ${wellfleet.variable}`}
      >
        <ReduxProvider>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;
