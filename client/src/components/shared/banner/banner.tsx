import SearchBar from "@/components/shared/searchBar";
import Typography from "@/components/shared/typography";
import variables from "@/styles/base/_constant.module.scss";
import "@/styles/components/shared/banner.scss";
import { Suspense } from "react";

interface bannerPropsType {
  resultCount: number;
  className?: string;
  title: string;
  path: string;
  query?: string;
  resultText?: string;
  variant?: "shop";
}

function Banner({
  title,
  resultCount,
  className,
  path,
  query = "q",
  resultText,
  variant,
}: bannerPropsType) {
  return (
    <div
      className={`${variables.brandName}-banner ${className ?? ""} ${
        variables.brandName
      }-banner--${variant}`}
    >
      <Typography
        className={`${variables.brandName}-banner__title `}
        variant="h1"
      >
        {title}
      </Typography>
      <div className={`${variables.brandName}-banner__search-info `}>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar query={query} path={path} />
        </Suspense>
        <Typography
          className={`${variables.brandName}-banner__result`}
          variant="body2"
        >
          {resultText || `${resultCount} results found`}
        </Typography>
      </div>
    </div>
  );
}

export default Banner;
