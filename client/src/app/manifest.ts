import { getStrapiData } from "@/utils";
import type { MetadataRoute } from "next";
import qs from "qs";

const query = qs.stringify({
  fields: ["name", "short_description"],
});

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { data } = await getStrapiData("brand", query);

  const { name, short_description } = data.attributes;

  return {
    name: name,
    short_name: name,
    description: short_description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
