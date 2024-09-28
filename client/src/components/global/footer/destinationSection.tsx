import Typography from "@/components/shared/typography/typography";
import Link from "next/link";
import { navData } from "@/components/global/navbar/nav.data";
import { getDestinations } from "@/utils/utils";
import { destinationType } from "@/types/navbar.types";

const DestinationsSection = async () => {
  const destinations = (await getDestinations("footer")) as destinationType[];

  return (
    <div className="footer-destinations">
      <Typography className="footer-title" variant="h3" component="h2">
        top destinations
      </Typography>
      <div className="footer-wraper">
        {destinations.slice(0, 4).map((destination) => (
          <Link
            className="link footer-destination"
            href={`/search?des=${destination.slug}`}
            key={destination.slug}
          >
            {destination.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DestinationsSection;
