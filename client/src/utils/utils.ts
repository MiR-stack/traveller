import { destinationAdapter } from "@/adapters/destination.adapter";
import { formatedImageTypes, imageTypes, strapiDataResTypes } from "@/types";
import { MASTER_TAG } from "./constants";
import qs from "qs";
import { parseISO, format } from "date-fns";

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
 * @returns image sizes
 */

const getFormatedImage = (image: imageTypes): formatedImageTypes | null => {
  if (!image.data) return null;

  const {
    formats: { large, small, medium, thumbnail },
    url,
    alternativeText,
  } = image.data.attributes;
  const srcs = {
    large: getStrapiMedia(large.url)!,
    small: getStrapiMedia(small.url)!,
    medium: getStrapiMedia(medium.url)!,
    thumbnail: getStrapiMedia(thumbnail.url)!,
    main: getStrapiMedia(url)!,
  };

  return { srcs, alt: alternativeText };
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
    tags: [MASTER_TAG, "destinations"],
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
    tags: [MASTER_TAG, "social_medias"],
  });

  return mediaRes?.data?.attributes?.social_medias;
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
};
