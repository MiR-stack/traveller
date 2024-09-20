import { queryTypes } from "@/types";
import qs from "qs";
import { optionsTypes } from "./utils";
import { MASTER_TAG } from "./constants";

interface blogFnTypes {
  slug?: string;
  options?: optionsTypes;
  queryObj?: queryTypes;
}

const getBlog = ({ slug, queryObj = {}, options = {} }: blogFnTypes) => {
  if (slug) {
    queryObj.filters = { slug: { $eq: slug }, ...queryObj?.filters };

    options.tags = [slug, MASTER_TAG];
  }

  const query = qs.stringify(queryObj, { encodeValuesOnly: true });

  console.log(query, queryObj);

  // return getStrapiData(query, options);
};

export { getBlog };
