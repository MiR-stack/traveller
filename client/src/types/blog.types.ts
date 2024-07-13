export interface categoryTypes {
  name: string;
  count?: number;
  slug: string;
}

export interface countryTypes {
  name: string;
  count?: number;
  flag?: string;
  slug: string;
}

export interface basicBlogTypes {
  image: {
    url: string;
    alt: string;
  };
  title: string;
  slug: string;
  country: countryTypes;
  createdAt: string;
  category: categoryTypes;
}
