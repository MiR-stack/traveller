import Link from "next/link";
import React from "react";
import { navData } from "../nav.data";
import { IoClose } from "react-icons/io5";

interface menusPropTypes {
  type?: "mobile" | "desktop";
  isOpen?: boolean;
  onClose?: () => void;
}

function Menus({ type = "desktop", isOpen, onClose }: menusPropTypes) {
  return (
    <div
      className={`nav-menus-${type} nav-menus ${
        isOpen ? "nav-menus-open" : ""
      }`}
    >
      <div className="nav-menus-icon">
        <IoClose className="nav-menus-close" onClick={onClose} />
      </div>
      <ul className={`nav-menus-${type}--container`}>
        {navData.menus.map((menue) => (
          <li key={menue.name}>
            <Link href={`/${menue.slug}`} aria-labelledby={menue.name}>
              {menue.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menus;
