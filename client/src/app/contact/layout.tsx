import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import Brand from "@/components/shared/brand";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar extented />
      <Brand />
      {children}
      <Footer bg="bg2" />
    </div>
  );
}

export default layout;
