"use client";

import useQuery from "@/hooks/useQuery";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

function SearchBar() {
  const [searchTerms, setSearchTerms] = useState<string>("");
  const handleSearchTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(e.target.value);
  };

  const searchParams = useSearchParams();

  useCallback(() => {
    const term = searchParams.get("term");
    if (term) {
      setSearchTerms(term);
    }
  }, [searchParams]);

  const router = useRouter();
  const { updateQuery } = useQuery();
  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerms) return;

    router.push(`/search?${updateQuery("term", searchTerms)}`);
  };

  return (
    <form className="nav-search" onSubmit={handleSearch}>
      <button
        type="submit"
        className="nav-search--btn btn"
        aria-label="searchButton"
      >
        <IoSearchSharp className="nav-search--icon" />
      </button>
      <input
        type="search"
        className="nav-search--input"
        placeholder="search"
        aria-label="search"
        value={searchTerms}
        onChange={handleSearchTerms}
      />
    </form>
  );
}

export default SearchBar;
