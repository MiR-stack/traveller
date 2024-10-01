"use client";

import CustomImage from "@/components/shared/bgImageContainer/bgImageContainer";
import Typography from "@/components/shared/typography/typography";
import { destinationsType, navDestinationType } from "@/types/navbar.types";
import Link from "next/link";
import { useState } from "react";
import { TbWorld } from "react-icons/tb";

interface destinationsPropTypes {
  destinations: destinationsType;
  destination?: string;
}

function Destinations({
  destinations,
  destination = "world",
}: destinationsPropTypes) {
  const [currentDestination, setCurrentDestination] =
    useState<navDestinationType>(destinations[destination]);

  const [menu, setMenue] = useState<boolean>(false);

  const handleDestination = (destination: navDestinationType) => {
    setCurrentDestination(destination);
  };

  const toggleMenu = () => {
    setMenue(!menu);
  };

  return (
    <div className={"destinations"}>
      <div className="destination destination--active " onClick={toggleMenu}>
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
            <TbWorld className="destination__icon" />
            <Typography variant="h4" component="h1">
              destinations
            </Typography>
          </>
        )}
      </div>
      <div
        className={`destinations__wraper ${menu ? `destinations--active` : ""}`}
      >
        {Object.keys(destinations).map((slug: string) => (
          <Link
            href={`/search?des=${slug}`}
            className="destination"
            key={slug}
            onClick={() => {
              handleDestination(destinations[slug]);
              toggleMenu();
            }}
          >
            {destinations[slug].name === "world" ? (
              <TbWorld />
            ) : (
              <CustomImage
                src={destinations[slug].flag}
                height="15px"
                width="20px"
                alt={destinations[slug].alt}
                sizes="10vw"
              />
            )}
            <Typography component="p">{destinations[slug].name} </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Destinations;
