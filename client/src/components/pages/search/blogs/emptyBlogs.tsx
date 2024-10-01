"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EmptyBlogs() {
  const router = useRouter();
  return (
    <div className="empty-blogs">
      <div className="empty-blogs__content">
        <h1 className="empty-blogs__title">No Blogs Found</h1>
        <p className="empty-blogs__description">
          We couldn&apos;t find any blogs matching your search. Try a different
          query or browse all blogs.
        </p>
        <div className="empty-blogs__buttons">
          <button
            className="empty-blogs__button empty-blogs__button--try-again"
            aria-labelledby="try again"
            onClick={() => router.refresh()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="empty-blogs__icon"
            >
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            Try Again
          </button>
          <Link
            href="/search"
            className="empty-blogs__button empty-blogs__button--all-blogs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="empty-blogs__icon"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            All Blogs
          </Link>
        </div>
        <p className="empty-blogs__support-note">
          If you believe this is an error, please contact our support team.
        </p>
      </div>
    </div>
  );
}
