import {
  Roboto,
  Roboto_Condensed,
  Roboto_Slab,
  Rock_Salt,
  Wellfleet,
  Oswald,
} from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--roboto",
  weight: ["400", "500", "700"],
  display: "swap",
});
export const roboto_Condensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--roboto-condensed",
  weight: ["400", "600", "700"],
  display: "swap",
});
export const roboto_Slab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--roboto-slab",
  display: "swap",
});
export const rock_salt = Rock_Salt({
  subsets: ["latin"],
  variable: "--rock-salt",
  weight: ["400"],
  display: "swap",
});

export const wellfleet = Wellfleet({
  subsets: ["latin"],
  variable: "--wellfleet",
  weight: ["400"],
  display: "swap",
});

export const oswald = Oswald({
  subsets: ["latin"],
  variable: "--oswald",
  weight: ["400", "600", "700"],
  display: "swap",
});
