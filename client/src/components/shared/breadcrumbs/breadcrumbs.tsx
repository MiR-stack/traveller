import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import variables from "@/styles/base/_constant.module.scss";
import Link from "next/link";
import "@/styles//components/shared/breadcrumbs.scss";
import { breadcrumbTypes } from "@/types/shared.types";

interface breadcrumbsPropsType {
  breadcrumbs: breadcrumbTypes[];
  separator?: React.ReactNode | string;
}

function Breadcrumbs({
  breadcrumbs,
  separator = <FaChevronRight />,
}: breadcrumbsPropsType) {
  return (
    <div className={`${variables.brandName}-breadcrumbs`}>
      {breadcrumbs.map((breadcrumb) => {
        return breadcrumb.slug ? (
          <>
            <Link
              className={`${variables.brandName}-breadcrumbs-item link`}
              href={breadcrumb.slug}
              key={breadcrumb.name}
            >
              {breadcrumb.name}
            </Link>
            <p className={`${variables.brandName}-breadcrumbs-separator`}>
              {separator}
            </p>
          </>
        ) : (
          <p
            className={`${variables.brandName}-breadcrumbs-item--active`}
            key={breadcrumb.name}
          >
            {breadcrumb.name}
          </p>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
