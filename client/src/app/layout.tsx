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
import GoToTopButton from "@/components/utils/goTop";
import { getMetaData } from "@/utils/utils";
import { TAGS } from "@/utils/constants";

const query = qs.stringify({
  fields: ["name", "updatedAt"],
  populate: {
    seo: {
      populate: ["metaSocial.image", "metaImage"],
    },
    category: {
      fields: ["name"],
    },
  },
});

export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = await getStrapiData("brand", query, {
    tags: [TAGS.MASTER_TAG, TAGS.BRAND],
  });

  const { seo, updatedAt } = data.attributes;

  if (!seo) {
    return {
      title: `Discover Top Travel Destinations & Tips | Earth Heavens`,
      description:
        "Explore the best travel destinations, tips, and guides to make your adventures unforgettable. Find inspiration, advice, and travel resources for your next trip",
      keywords: [
        "heavenly destinations",
        "breathtaking landscapes",
        "travel inspirations",
        "hidden gems",
        "beautiful places",
        "stunning scenery",
        "dream vacations",
        "exotic escapes",
        "nature wonders",
        "must-visit locations",
      ],
    };
  }

  return getMetaData(seo, updatedAt);
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>
        <meta name="google-adsense-account" content="ca-pub-9802622065700000" />
      </title>
      <body
        className={`${roboto.variable} ${roboto_Condensed.variable} ${roboto_Slab.variable} ${rock_salt.variable} ${oswald.variable} ${wellfleet.variable}`}
      >
        <ReduxProvider>
          <ThemeContextProvider>
            {children}
            <GoToTopButton />
          </ThemeContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;
