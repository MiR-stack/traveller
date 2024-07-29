import Breadcrumbs from "@/components/shared/breadcrumbs";
import ShortInfo from "@/components/shared/shortInfo";
import Typography from "@/components/shared/typography";
import { breadcrumbTypes } from "@/types/shared.types";
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

interface headerPropsType {
  breadcrumbs: breadcrumbTypes[];
  title: string;
  createdAt: string;
  readTime: string;
  country: {
    name: string;
  };
}

function Header({
  breadcrumbs,
  title,
  createdAt,
  readTime,
  country,
}: headerPropsType) {
  return (
    <div className="blog-header">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Typography className="blog-header-title" variant="h1">
        {title}
      </Typography>
      <div className="blog-header-blog_info">
        <p className="blog-header-country">{country.name}</p>
        <ShortInfo icon={<FaRegCalendarAlt />} text={createdAt} />
        <ShortInfo icon={<FiClock />} text={readTime} />
      </div>
    </div>
  );
}

export default Header;
