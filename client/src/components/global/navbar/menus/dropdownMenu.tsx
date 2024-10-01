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
    <div className="menus-dropdown">
      <div className="menus-dropdown__title" onClick={handleDropdownToggle}>
        <p className="menu__name">{menu.name}</p>
        <FaChevronDown className="menus-dropdown__icon" />
      </div>
      <div
        className={`menus-dropdown__wraper ${
          dropdown ? "menus-dropdown--open" : ""
        }`}
      >
        {menu.childrens?.map((item) => (
          <Link
            className="menus-dropdown__item link"
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
