"use client";

import ThemeContext from "@/contexts/themeContext";
import { useContext } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

function Theme() {
  const { isDark, toggleDark } = useContext(ThemeContext);

  return (
    <div className="nav-theme" onClick={toggleDark}>
      {isDark ? <IoSunnyOutline /> : <IoMoonOutline />}
    </div>
  );
}

export default Theme;
