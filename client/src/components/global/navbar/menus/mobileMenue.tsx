"use client";

import { IoMenu } from "react-icons/io5";
import Menus from "./menus";
import { useState } from "react";
import Backdrop from "@/components/utils/backdrop";
import { destinationsType } from "@/types/navbar.types";

interface mobileMenusPropsType {
  destinations: destinationsType;
  extended: boolean;
}

function MobileMenus({ extended, destinations }: mobileMenusPropsType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="nav-mobile_menus">
      <IoMenu className="nav-mobile_menus--icon" onClick={toggleMenu} />
      {isOpen ? <Backdrop onClick={handleClose} /> : ""}
      <Menus
        navExtended={extended}
        navDestinations={destinations}
        type="mobile"
        onClose={handleClose}
        isOpen={isOpen}
      />
    </div>
  );
}

export default MobileMenus;
