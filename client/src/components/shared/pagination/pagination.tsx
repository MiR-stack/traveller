"use client";

import variables from "@/styles/base/_constant.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "@/styles/components/shared/pagination.scss";
import useQuery from "@/hooks/useQuery";
import { useRouter } from "next/navigation";

interface PaginationPropsType {
  pageCount: number;
  currentPage: number;
  className?: string;
}

const Pagination: React.FC<PaginationPropsType> = ({
  pageCount = 1,
  currentPage,
  className,
}) => {
  const { updateQuery } = useQuery();
  const router = useRouter();

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.push(`?${updateQuery("page", String(currentPage - 1))}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      router.push(`?${updateQuery("page", String(currentPage + 1))}`);
    }
  };

  const handleRandomPage = (page: number) => {
    router.push(`?${updateQuery("page", String(page))}`);
  };

  const renderPageButtons = () => {
    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

    return pages.map((page) => (
      <button
        key={page}
        className={`btn ${variables.brandName}-pagination-item ${
          currentPage === page
            ? `${variables.brandName}-pagination-item--active`
            : ""
        }`}
        onClick={() => handleRandomPage(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className={`${className ?? ""} ${variables.brandName}-pagination`}>
      <button
        className="btn"
        aria-label="previous page"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>
      {renderPageButtons()}
      <button
        className="btn"
        onClick={handleNextPage}
        aria-label="next page"
        disabled={currentPage === pageCount}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
