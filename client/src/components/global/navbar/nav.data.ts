import { menuTypes } from "@/types/navbar.types";

interface navDataTypes {
  menus: menuTypes[];
}

export const navData: navDataTypes = {
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
      name: "contact",
      slug: "contact",
    },
  ],
};
