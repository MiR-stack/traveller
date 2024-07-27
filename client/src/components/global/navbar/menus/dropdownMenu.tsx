"use client";

import { menuTypes } from "@/types/navbar.types";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

interface dropdownMenuPropsType {
  menu: menuTypes;
}

function DropdownMenu({ menu }: dropdownMenuPropsType) {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const handleDropdownToggle = () => {
    setDropdown(!dropdown);
  };

  const handleDropdownClose = () => {
    setDropdown(false);
  };
  return (
    <div className="nav-menus-dropdown">
      <div className="nav-menus-dropdown--title" onClick={handleDropdownToggle}>
        <p className="nav-menus-name  nav-menus-dropdown--name">{menu.name}</p>
        <FaChevronDown className="nav-menus-dropdown--icon" />
      </div>
      <div
        className={`nav-menus-dropdown--wraper ${
          dropdown ? "nav-menus-dropdown--open" : ""
        }`}
      >
        {menu.childrens?.map((item) => (
          <Link
            className="nav-menus-dropdown--item link"
            key={item.slug}
            href={`/${item.slug}`}
            aria-labelledby={item.name}
            onClick={handleDropdownClose}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DropdownMenu;
