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

export { getData, getStrapiURL, getStrapiData, objDeepClone };
