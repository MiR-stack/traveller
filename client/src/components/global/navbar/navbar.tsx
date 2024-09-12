import Theme from "./theme";
import Destinations from "./destinations/destinations";
import { getData, getStrapiData } from "@/utils";
import { countryType, destinationsType } from "@/types/navbar.types";
import { navData } from "./nav.data";
import "@/styles/components/global/navbar.scss";
import Container from "@/components/shared/container";
import { headers } from "next/headers";
import Menus from "./menus";
import MobileMenus from "./menus/mobileMenue";
import SearchBar from "./searchBar/searchBar";
import Divider from "@/components/shared/divider";
import SocialMedias from "./socialMedias";
import Brand from "@/components/shared/brand";
import qs from "qs";
import { destinationAdapter } from "@/adapters/destination.adapter";

interface navPropsType {
  extented?: boolean;
}

function IP() {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
}

const destinationQuery = qs.stringify({
  populate: ["flag"],
});

async function Navbar({ extented = true }: navPropsType) {
  // destinations data

  const { data } = await getStrapiData("destinations", destinationQuery, {
    tags: ["destinations"],
  });

  const destinations = destinationAdapter(data, "nav");

  const navDestinations: destinationsType = {
    world: {
      name: "world",
      flag: "",
      alt: "world",
    },
    ...destinations,
  };

  return (
    <nav className="nav">
      <Container maxWidth="xlg">
        <div className="nav-wraper">
          <div className="nav-left">
            <MobileMenus extended={extented} />
            {extented ? (
              <Brand variant="nav" />
            ) : (
              <Destinations destinations={navDestinations} />
            )}
          </div>
          <Menus navExtended={extented} navDestinations={navDestinations} />
          <div className="nav-right">
            <SearchBar />
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
