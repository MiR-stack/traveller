"use client";

import variables from "@/styles/base/_constant.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import "@/styles/components/shared/searchBar.scss";
import useQuery from "@/hooks/useQuery";

interface searchBarPropsType {
  query: string;
  path: string;
}

function SearchBar({ query, path }: searchBarPropsType) {
  const [search, setSearch] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    const terms = searchParams.get(query);
    if (terms) {
      setSearch(terms);
    }
  }, [searchParams, query]);

  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/${path}?${search ? `${query}=${search}` : ""}`);
  };
  return (
    <form
      className={`${variables.brandName}-searchBar`}
      onSubmit={handleSearch}
    >
      <input
        className={`${variables.brandName}-searchBar-field`}
        type="search"
        name="search"
        value={search}
        placeholder="search"
        onChange={handleChange}
      />
      <button className={`${variables.brandName}-searchBar-btn`} type="submit">
        search
      </button>
    </form>
  );
}

export default SearchBar;
