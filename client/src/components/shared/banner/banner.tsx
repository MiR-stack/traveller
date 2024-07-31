import SearchBar from "@/components/shared/searchBar";
import Typography from "@/components/shared/typography";
import variables from "@/styles/base/_constant.module.scss";
import "@/styles/components/shared/banner.scss";

interface bannerPropsType {
  resultCount: number;
  className?: string;
  title: string;
  path: string;
  query?: string;
}

function Banner({
  title,
  resultCount,
  className,
  path,
  query = "q",
}: bannerPropsType) {
  return (
    <div
      className={`${variables.brandName}-banner ${
        className ? `${className}-banner` : ""
      }`}
    >
      <Typography
        className={`${variables.brandName}-banner-title  ${
          className ? `${className}-banner-title` : ""
        }`}
        variant="h1"
      >
        {title}
      </Typography>
      <div
        className={`${variables.brandName}-banner-searchInfo  ${
          className ? `${className}-banner-searchInfo` : ""
        }`}
      >
        <SearchBar query={query} path={path} />
        <Typography
          className={`${variables.brandName}-banner-result  ${
            className ? `${className}-banner-result` : ""
          }`}
          variant="body2"
        >
          {resultCount} results found
        </Typography>
      </div>
    </div>
  );
}

export default Banner;
