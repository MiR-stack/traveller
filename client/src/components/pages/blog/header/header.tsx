import Breadcrumbs from "@/components/shared/breadcrumbs";
import ShortInfo from "@/components/shared/shortInfo";
import Typography from "@/components/shared/typography";
import { breadcrumbTypes } from "@/types/shared.types";
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

interface destinationResType {
  data: {
    attributes: {
      name: string;
      continent: {
        data: {
          attributes: {
            name: string;
            slug: string;
          };
        };
      };
    };
  };
}

interface headerPropsType {
  title: string;
  destination: destinationResType;
  createdAt: string;
  readTime: string;
}

function Header({ destination, title, createdAt, readTime }: headerPropsType) {
  // create breadcrumbs
  let breadcrumbs: breadcrumbTypes[] = [
    {
      name: "home",
      slug: "/",
    },
  ];
  const destinationName = destination.data?.attributes.name || "world";
  if (destination.data) {
    const continent = destination.data.attributes.continent.data.attributes;

    breadcrumbs = [
      ...breadcrumbs,
      {
        name: continent.name,
        slug: `/search?con=${continent.slug}`,
      },
      {
        name: destinationName,
      },
    ];
  } else {
    breadcrumbs.push({ name: "world" });
  }

  return (
    <div className="blog-header">
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        className="blog-header__breadcrumbs"
      />
      <Typography className="blog-header__title" variant="h1">
        {title}
      </Typography>
      <div className="blog-header__blog-info">
        <p className="blog-header__country">{destinationName}</p>
        <ShortInfo icon={<FaRegCalendarAlt />} text={createdAt} />
        <ShortInfo icon={<FiClock />} text={`${readTime} minutes read`} />
      </div>
    </div>
  );
}

export default Header;
