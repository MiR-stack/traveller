import Theme from "./theme";
import Destinations from "./destinations/destinations";
import { getData } from "@/utils";
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

async function Navbar({ extented = true }: navPropsType) {
  // destinations data
  const countries = await getData(
    "https://restcountries.com/v3.1/all?fields=name,flags"
  );

  const destinations: destinationsType = {
    World: {
      name: "world",
      flag: "",
      alt: "world",
    },
  };
  countries.forEach((country: countryType) => {
    const len = navData.destinations.length;
    for (let i = 0; i < len; i++) {
      const destinationName = navData.destinations[i].name.toLowerCase();
      const countryName = country.name.common;

      if (destinationName === countryName.toLowerCase()) {
        destinations[countryName] = {
          name: countryName,
          flag: country.flags.png,
          alt: country.flags.alt,
        };
      }
    }
  });

  return (
    <nav className="nav">
      <Container maxWidth="xlg">
        <div className="nav-wraper">
          <div className="nav-left">
            <MobileMenus extended />
            {extented ? (
              <Brand variant="nav" />
            ) : (
              <Destinations destinations={destinations} />
            )}
          </div>
          <Menus navExtended={extented} />
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
