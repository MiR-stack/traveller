import { formatedImageTypes, imageTypes } from "@/types";

async function getData(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const getStrapiURL = (query: string) => {
  const baseURL = process.env.BASE_URL;

  return `${baseURL}/${query}`;
};

/*=============================================
=            getStrapiData function            =
=============================================*/

export interface optionsTypes {
  cache?: RequestCache;
  authorization?: string;
  tags?: string[];
  revalidate?: number;
}

interface fetchOptionsTypes {
  headers: {
    Authorization: string;
  };
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

const getStrapiData = async (query: string, options: optionsTypes) => {
  if (!options.authorization) {
    options.authorization = process.env.API_TOKEN;
  }

  let url = getStrapiURL(query);

  // create options for fetch

  let fetchOptions: fetchOptionsTypes = {
    headers: {
      Authorization: `Bearer ${options.authorization}`,
    },
    next: {
      revalidate: options.revalidate,
    },
  };

  if (options.cache) fetchOptions.cache = options.cache;

  if (options.tags)
    fetchOptions.next = {
      tags: options.tags,
    };

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error("something went wrong");
  }

  return res.json();
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

export {
  getData,
  getStrapiURL,
  getStrapiData,
  objDeepClone,
  getStrapiMedia,
  getFormatedImage,
};
