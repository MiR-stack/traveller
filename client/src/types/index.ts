export interface paginationTypes {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface strapiDataResTypes {
  id: number;
  attributes: {
    [key: string]: any;
  };
}

export interface queryTypes {
  populate?: string[] | object | string;
  fields?: string[];
  filters?: object;
  sort?: string[];
  pagination?: paginationTypes;
}

export interface imageAttrTypes {
  formats: {
    large: { url: string };
    small: { url: string };
    medium: { url: string };
    thumbnail: { url: string };
  };
  url: string;
  alternativeText: string;
}

export interface imageTypes {
  data: {
    attributes: imageAttrTypes;
  };
}

export interface formatedImageSrcsTypes {
  large: string;
  small: string;
  medium: string;
  thumbnail: string;
  main: string;
}

export interface formatedImageTypes {
  srcs: formatedImageSrcsTypes;
  alt: string;
}

export interface socialMediaTypes {
  id: number;
  name: string;
  url: string;
  icon: string;
}

