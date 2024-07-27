export interface paginationTypes {
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
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
