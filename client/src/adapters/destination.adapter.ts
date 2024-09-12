import { strapiDataResTypes } from "@/types";
import { destinationsType } from "@/types/navbar.types";
import { getStrapiMedia } from "@/utils/utils";

const destinationAdapter = (data: strapiDataResTypes[], variant: "nav") => {
  const len = data.length;

  const destinations: destinationsType = {};

  for (let i = 0; i < len; i++) {
    const { name, slug, flag } = data[i].attributes;

    const { alternativeText, formats } = flag.data.attributes;

    if (variant === "nav") {
      destinations[slug] = {
        name,
        flag: getStrapiMedia(formats.thumbnail.url) || "",
        alt: alternativeText || "",
      };
    }
  }

  return destinations;
};

export { destinationAdapter };
