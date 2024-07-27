import { menuTypes } from "@/types/navbar.types";

interface navDataTypes {
  destinations: {
    name: string;
    slug: string;
  }[];
  menus: menuTypes[];
}

export const navData: navDataTypes = {
  destinations: [
    {
      name: "bangladesh",
      slug: "bn",
    },
    {
      name: "Australia",
      slug: "in",
    },
    {
      name: "india",
      slug: "us",
    },
    {
      name: "france",
      slug: "fr",
    },
  ],
  menus: [
    {
      name: "home",
      slug: "",
    },
    {
      name: "gallery",
      slug: "gallery",
    },
    {
      name: "shop",
      slug: "shop",
    },
    {
      name: "about us",
      slug: "about-us",
    },
  ],
};
