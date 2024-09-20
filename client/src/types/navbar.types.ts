export interface countryType {
  flags: { png: string; alt: string };
  name: { common: string };
}
export interface destinationType {
  name: string;
  slug?: string;
}

export interface navDestinationType extends destinationType {
  flag: string;
  alt: string;
}

export interface destinationsType {
  [key: string]: navDestinationType;
}

export interface menuTypes {
  name: string;
  slug: string;
  childrens?: menuTypes[];
}
