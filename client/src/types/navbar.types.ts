export interface countryType {
  flags: { png: string; alt: string };
  name: { common: string };
}
export interface destinationType {
  name: string;
  flag: string;
  alt: string;
}

export interface destinationsType {
  [key: string]: destinationType;
}
