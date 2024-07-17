"use client";

import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Typography from "@/components/shared/typography/typography";
import { destinationsType, destinationType } from "@/types/navbar.types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TbWorld } from "react-icons/tb";

interface destinationsPropTypes {
  destinations: destinationsType;
}

function Destinations({ destinations }: destinationsPropTypes) {
  const [currentDestination, setCurrentDestination] =
    useState<destinationType>();

  // set initial destination
  const params = useSearchParams();
  useEffect(() => {
    const destination = params.get("destination");
    if (destination) {
      setCurrentDestination(destinations[destination]);
    }
  }, []);

  const [menu, setMenue] = useState<boolean>(false);

  const handleDestination = (destination: destinationType) => {
    setCurrentDestination(destination);
  };

  const toggleMenu = () => {
    setMenue(!menu);
  };

  return (
    <div className={"nav-destinations"}>
      <div
        className="nav-destination--active nav-destination"
        onClick={toggleMenu}
      >
        {currentDestination && currentDestination.name !== "world" ? (
          <>
            <CustomImage
              src={currentDestination.flag}
              height="15px"
              width="20px"
              alt={currentDestination.alt}
              sizes="10vw"
            />
            <Typography variant="h4">{currentDestination.name} </Typography>
          </>
        ) : (
          <>
            <TbWorld className="nav-destination--icon" />
            <Typography variant="h4" component="h1">
              destinations
            </Typography>
          </>
        )}
      </div>
      <div
        className={`nav-destinations--wraper ${
          menu ? `nav-destinations--active` : ""
        }`}
      >
        {Object.keys(destinations).map((name: string) => (
          <Link
            href={`/search?destination=${name}`}
            className="nav-destination"
            key={name}
            onClick={() => {
              handleDestination(destinations[name]);
              toggleMenu();
            }}
          >
            {name === "World" ? (
              <TbWorld />
            ) : (
              <CustomImage
                src={destinations[name].flag}
                height="15px"
                width="20px"
                alt={destinations[name].alt}
                sizes="10vw"
              />
            )}
            <Typography component="p">{name} </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Destinations;
