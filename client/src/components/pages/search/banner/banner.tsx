import SearchBar from "@/components/shared/searchBar";
import Typography from "@/components/shared/typography";

interface bannerPropsType {
  blogCount: number;
}

function Banner({ blogCount }: bannerPropsType) {
  return (
    <div className="search-banner">
      <Typography className="search-banner-title" variant="h1">
        search results
      </Typography>
      <div className="search-banner-searchInfo">
        <SearchBar query="q" path="search" />
        <Typography className="search-banner-result" variant="body2">
          {blogCount} results found
        </Typography>
      </div>
    </div>
  );
}

export default Banner;
