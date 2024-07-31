"use client";

import variables from "@/styles/base/_constant.module.scss";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "@/styles/components/shared/pagination.scss";
import useQuery from "@/hooks/useQuery";
import { useSearchParams } from "next/navigation";

interface paginationPropsType {
  pageCount: number;
  currentPage: number;
  totalPage: number;
  className?: string;
}

function Pagination({
  pageCount = 1,
  totalPage,
  className,
}: paginationPropsType) {
  const searchParams = useSearchParams();
  const { updateQuery } = useQuery();

  const currentPage = Number(searchParams.get("page")) || 1;

  const prev = currentPage > 1 ? currentPage - 1 : currentPage;
  const next = currentPage < totalPage ? currentPage + 1 : currentPage;

  return (
    <div className={`${className ?? ""} ${variables.brandName}-pagination`}>
      <Link
        className="link"
        href={`?${updateQuery("page", String(prev))}`}
        aria-label="previous page"
      >
        <FaChevronLeft />
      </Link>
      {Array(pageCount > totalPage ? totalPage : pageCount)
        .fill(0)
        .map((_, index) => (
          <Link
            className={` link ${variables.brandName}-pagination-item ${
              currentPage === index + 1
                ? `${variables.brandName}-pagination-item--active`
                : ""
            }`}
            href={`?${updateQuery("page", String(index + 1))}`}
            key={index + 1}
          >
            {index + 1}
          </Link>
        ))}
      <Link
        className="link"
        href={`?${updateQuery("page", `${next}`)}`}
        aria-label="next page"
      >
        <FaChevronRight />
      </Link>
    </div>
  );
}

export default Pagination;
