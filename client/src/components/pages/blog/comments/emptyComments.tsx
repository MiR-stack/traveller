import { MdInsertComment } from "react-icons/md";

function EmptyComments() {
  return (
    <div className="blog-comments-empty">
      <MdInsertComment className="blog-comments-empty-icon" />

      <h1 className="blog-comments-empty-text">
        what do you think about this article?
      </h1>
    </div>
  );
}

export default EmptyComments;
