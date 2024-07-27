import Link from "next/link";
import { navData } from "../nav.data";
import { IoClose } from "react-icons/io5";
import DropdownMenu from "./dropdownMenu";
import { objDeepClone } from "@/utils/utils";

interface menusPropTypes {
  type?: "mobile" | "desktop";
  isOpen?: boolean;
  navExtended?: boolean;
  onClose?: () => void;
}

function Menus({
  type = "desktop",
  isOpen,
  navExtended,
  onClose,
}: menusPropTypes) {
  let menus: typeof navData.menus = objDeepClone(navData.menus);

  if (navExtended) {
    menus.splice(1, 0, {
      name: "destinations",
      slug: "",
      childrens: navData.destinations,
    });
  }

  return (
    <div
      className={`nav-menus-${type} ${
        navExtended ? "nav-menus-extended" : ""
      } nav-menus ${isOpen ? "nav-menus-open" : ""}`}
    >
      <div className="nav-menus-icon">
        <IoClose className="nav-menus-close" onClick={onClose} />
      </div>
      <ul className={`nav-menus-${type}--container`}>
        {menus.map((menu) => (
          <li key={menu.name}>
            {menu.childrens ? (
              <DropdownMenu menu={menu} />
            ) : (
              <Link
                className="nav-menus-name"
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
