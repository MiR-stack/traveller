import Link from "next/link";
import { navData } from "../nav.data";
import { IoClose } from "react-icons/io5";
import DropdownMenu from "./dropdownMenu";
import { objDeepClone } from "@/utils/utils";
import { destinationsType } from "@/types/navbar.types";

interface menusPropTypes {
  variant?: "mobile" | "desktop";
  isOpen?: boolean;
  extended?: boolean;
  navDestinations: destinationsType;
  onClose?: () => void;
}

function Menus({
  variant = "desktop",
  isOpen,
  extended,
  navDestinations,
  onClose,
}: menusPropTypes) {
  let menus: typeof navData.menus = objDeepClone(navData.menus);

  const destinations = Object.keys(navDestinations || {}).map(
    (slug: string) => ({
      name: navDestinations[slug].name,
      slug: `search?des=${slug}`,
    })
  );

  if (extended) {
    menus.splice(1, 0, {
      name: "destinations",
      slug: "",
      childrens: destinations,
    });
  }

  return (
    <div
      className={` menus menus--${variant} ${
        extended ? "menus--extended" : ""
      } ${isOpen ? "menus--open" : ""}`}
    >
      <div className="menus__icon">
        <IoClose className="menus__close" onClick={onClose} />
      </div>
      <ul className={`menus__container--${variant}`}>
        {menus.map((menu) => (
          <li key={menu.name}>
            {menu.childrens ? (
              <DropdownMenu menu={menu} />
            ) : (
              <Link
                className="menu__name"
                href={`/${menu.slug}`}
                aria-labelledby={menu.name}
              >
                {menu.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menus;
