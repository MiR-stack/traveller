import { destinationAdapter } from "@/adapters/destination.adapter";
import { formatedImageTypes, imageTypes, strapiDataResTypes } from "@/types";
import { TAGS } from "./constants";
import qs from "qs";
import { parseISO, format } from "date-fns";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

async function getData(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const getStrapiURL = (query: string) => {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;
  return `${baseURL}/api/${query}`;
};

/*=============================================
=            getStrapiData function            =
=============================================*/

export interface optionsTypes {
  cache?: RequestCache;
  authorization?: string;
  tags?: string[];
  revalidate?: number;
  public?: boolean;
}

interface fetchOptionsTypes {
  headers: {
    Authorization: string;
  };
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

const getStrapiData = async (
  path: string,
  query?: string,
  options?: optionsTypes
) => {
  if (!path) {
    throw new Error("Path is required for Strapi data fetching");
  }

  const url = getStrapiURL(`${path}${query ? `?${query}` : ""}`);
  options = options || {};

  const authorization = options.public
    ? process.env.NEXT_PUBLIC_API_TOKEN
    : process.env.API_TOKEN;

  if (!authorization) {
    throw new Error("API token is missing");
  }

  let fetchOptions: fetchOptionsTypes = {
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  };

  if (options.cache) {
    fetchOptions.cache = options.cache;
  }

  if (options.revalidate) {
    if (fetchOptions.next) {
      fetchOptions.next.revalidate = options.revalidate;
    } else {
      fetchOptions.next = {
        revalidate: options.revalidate,
      };
    }
  }

  if (options.tags) {
    if (fetchOptions.next) {
      fetchOptions.next.tags = options.tags;
    } else {
      fetchOptions.next = {
        tags: options.tags,
      };
    }
  }

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    throw error;
  }
};

/*=====  End of getStrapiData function  ======*/

/*=============================================
=            deepclone            =
=============================================*/

const objDeepClone = (obj: object) => {
  return JSON.parse(JSON.stringify(obj));
};

/*=====  End of deepclone  ======*/

/**
 *
 * @param url short url of image
 * @returns
 */
function getStrapiMedia(url: string) {
  if (url == null) {
    return null;
  }
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337"}${url}`;
}

/**
 *
 * @param image raw image object from strapi response
 * @param options image options
 * @returns image sizes
 */

const getFormatedImage = (
  image: imageTypes,
  options?: { aspectRatio?: boolean }
): formatedImageTypes | null => {
  if (!image.data) return null;

  const {
    formats: { large, small, medium, thumbnail },
    url,
    alternativeText,
    height,
    width,
  } = image.data.attributes;

  const srcs = {
    large: getStrapiMedia(large.url)!,
    small: getStrapiMedia(small.url)!,
    medium: getStrapiMedia(medium.url)!,
    thumbnail: getStrapiMedia(thumbnail.url)!,
    main: getStrapiMedia(url)!,
  };

  let data: formatedImageTypes = { srcs, alt: alternativeText };

  if (options?.aspectRatio) {
    data.aspectRatio = width / height;
  }

  return data;
};

/**
 * The function `strapiFieldsModifier` extracts specific fields from a Strapi data response object and
 * returns a new object with only those fields.
 * @param {strapiDataResTypes} data - The `data` parameter in the `strapiFieldsModifier` function is of
 * type `strapiDataResTypes`. It is an object that contains an `id` property and an `attributes`
 * property. The `attributes` property is an object that contains various fields with their
 * corresponding values.
 * @param {string[]} fields - It looks like the `fields` parameter in the `strapiFieldsModifier`
 * function is an array of strings. This parameter is used to specify which fields from the
 * `data.attributes` object should be included in the new data object that the function creates.
 * @returns The `strapiFieldsModifier` function returns a new object with the `id` property from the
 * `data` object and additional properties specified by the `fields` array, where each property is
 * taken from the `attributes` object within the `data` object.
 */
const strapiFieldsModifier = (data: strapiDataResTypes, fields: string[]) => {
  let newData: { [key: string]: any } = { id: data.id };

  const fieldsLenght = fields.length;
  for (let i = 0; i < fieldsLenght; i++) {
    if (data.attributes[fields[i]]) {
      newData[fields[i]] = data.attributes[fields[i]];
    }
  }

  return newData;
};

/**
 *
 * get destinations data
 *
 */

const destinationQuery = qs.stringify({
  populate: ["flag"],
});

const getDestinations = async (variant: "nav" | "footer") => {
  const { data } = await getStrapiData("destinations", destinationQuery, {
    tags: [TAGS.MASTER_TAG, TAGS.DESTINATIONS],
  });

  return destinationAdapter(data, variant);
};

const getDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "dd MMMM, yyyy");
};

/**
 *
 * get social medias
 *@returns social medias
 */

const query = qs.stringify({
  populate: ["social_medias"],
  fields: ["name"],
});

const getSocialMedias = async () => {
  const mediaRes = await getStrapiData("brand", query, {
    tags: [TAGS.MASTER_TAG, TAGS.BRAND],
  });

  return mediaRes?.data?.attributes?.social_medias;
};

/**
 * fetch seo data from server
 * @param slug
 * @returns
 */

async function fetchSeoData(slug: string) {
  const seoQuery = qs.stringify({
    populate: {
      seo: {
        populate: ["metaSocial.image", "metaImage"],
      },
      category: {
        fields: ["name"],
      },
    },
    fields: ["slug", "updatedAt"],
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  const { data } = await getStrapiData("blogs", seoQuery, {
    tags: [TAGS.MASTER_TAG, slug],
  });

  return data[0]?.attributes;
}

interface MetaSocial {
  title: string;
  card?: string;
  description: string;
  images: string[];
  type?: string;
}

const getMetaData = (seo: any, updatedAt: string) => {
  const { metaTitle, metaDescription, metaImage, keywords, metaSocial } = seo;
  const image = getFormatedImage(metaImage!);

  const twitter = metaSocial?.find(
    (item: any) => item.socialNetwork === "Twitter"
  );
  const facebook = metaSocial?.find(
    (item: any) => item.socialNetwork === "Facebook"
  );

  // define default meta social
  const defaultMetaSocial: MetaSocial = {
    title: metaTitle,
    card: "summary_large_image",
    description: metaDescription,
    images: [image?.srcs.small || ""],
  };

  // creat meta for twitter
  let metaTwitter: Twitter = {
    ...defaultMetaSocial,
  };
  if (twitter) {
    const twitterImage = getFormatedImage(twitter.image);

    metaTwitter = {
      ...metaTwitter,
      title: twitter.title,
      description: twitter.description,
      images: [twitterImage?.srcs.medium || image?.srcs.small || ""],
    };
  }

  // create opengraph
  let openGraph: OpenGraph = {
    ...defaultMetaSocial,
    type: "article",
    publishedTime: updatedAt,
  };

  if (facebook) {
    const facebookImage = facebook ? getFormatedImage(facebook.image) : null;
    openGraph = {
      ...openGraph,
      title: facebook?.title,
      description: facebook?.description || metaDescription,
      images: [facebookImage?.srcs.small || image?.srcs.small || ""],
    };
  }

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    category: "travel",
    openGraph,
    twitter: metaTwitter,
    verification: {
      google: "google",
      yandex: "yandex",
      yahoo: "yahoo",
      bing: "bing",
      other: {
        me: ["contact@earthheavens.com"],
      },
    },
  };
};

export {
  getData,
  getStrapiURL,
  getStrapiData,
  objDeepClone,
  getStrapiMedia,
  getFormatedImage,
  strapiFieldsModifier,
  getDestinations,
  getDate,
  getSocialMedias,
  fetchSeoData,
  getMetaData,
};
