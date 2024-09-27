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
import { getStrapiData } from "@/utils";
import qs from "qs";

const query = qs.stringify({
  fields: ["name", "short_description"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = await getStrapiData("brand", query);

  const { name, short_description } = data.attributes;
  return {
    title: `Discover Top Travel Destinations & Tips | ${name}`,
    description:
      short_description ||
      "Explore the best travel destinations, tips, and guides to make your adventures unforgettable. Find inspiration, advice, and travel resources for your next trip",
    keywords: [
      "travel destinations",
      "travel tips",
      "travel guides",
      "adventure travel",
      "travel inspiration",
      "travel advice",
      "travel resources",
    ],
  };
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
          <ThemeContextProvider>{children} </ThemeContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;
