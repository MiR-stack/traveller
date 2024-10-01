import { MdInsertComment } from "react-icons/md";

function EmptyComments() {
  return (
    <div className="empty-comment">
      <MdInsertComment className="empty-comment__icon" />

      <h1 className="empty-comment__text">
        what do you think about this article?
      </h1>
    </div>
  );
}

export default EmptyComments;
