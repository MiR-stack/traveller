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

export interface imageTypes {
  url: string;
  alt: string;
}

export interface basicBlogTypes {
  image: imageTypes;
  title: string;
  slug: string;
  country: countryTypes;
  createdAt: string;
  category: categoryTypes;
}
