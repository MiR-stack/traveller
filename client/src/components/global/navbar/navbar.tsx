import Theme from "./theme";
import Destinations from "./destinations/destinations";
import { destinationsType } from "@/types/navbar.types";
import "@/styles/components/global/navbar.scss";
import Container from "@/components/shared/container";
import { headers } from "next/headers";
import Menus from "./menus";
import MobileMenus from "./menus/mobileMenue";
import SearchBar from "./searchBar/searchBar";
import Divider from "@/components/shared/divider";
import SocialMedias from "./socialMedias";
import Brand from "@/components/shared/brand";
import { Suspense } from "react";
import { getDestinations } from "@/utils/utils";

interface navPropsType {
  extented?: boolean;
  destination?: string;
}

// function IP() {
//   const FALLBACK_IP_ADDRESS = "0.0.0.0";
//   const forwardedFor = headers().get("x-forwarded-for");

//   if (forwardedFor) {
//     return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
//   }

//   return headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
// }

async function Navbar({ extented = true, destination }: navPropsType) {
  // destinations data
  const destinations = await getDestinations("nav");

  const navDestinations: destinationsType = {
    world: {
      name: "world",
      flag: "",
      alt: "world",
    },
    ...(destinations as destinationsType),
  };

  return (
    <nav className="nav">
      <Container maxWidth="xlg">
        <div className="nav-wraper">
          <div className="nav-left">
            <MobileMenus destinations={navDestinations} extended={extented} />
            {extented ? (
              <Brand variant="nav" logo="nav" />
            ) : (
              <Destinations
                destinations={navDestinations}
                destination={destination}
              />
            )}
          </div>
          <Menus navExtended={extented} navDestinations={navDestinations} />
          <div className="nav-right">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBar />
            </Suspense>
            <Divider size={12} direction="verticale" />
            <Theme />
            <Divider
              className="nav-theme-divider"
              size={12}
              direction="verticale"
            />
            <SocialMedias />
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
