import { strapiDataResTypes } from "@/types";
import { destinationsType, destinationType } from "@/types/navbar.types";
import { getStrapiMedia } from "@/utils/utils";

const destinationAdapter = (
  data: strapiDataResTypes[],
  variant: "nav" | "footer"
) => {
  if (variant === "nav") {
    let destinations: destinationsType = {};

    data.forEach((destination) => {
      const { name, slug, flag } = destination.attributes;

      const { alternativeText, formats } = flag.data.attributes;

      destinations[slug] = {
        name,
        flag: getStrapiMedia(formats.thumbnail.url) || "",
        alt: alternativeText || "",
      };
    });

    return destinations;
  }

  if (variant === "footer") {
    let destinations: destinationType[] = [];

    data.forEach((destination) => {
      const { name, slug } = destination.attributes;

      destinations.push({
        name,
        slug,
      });
    });

    return destinations;
  }
};

export { destinationAdapter };
