import Avatar from "@/components/shared/avatar";
import Typography from "@/components/shared/typography";
import { commentTypes } from "@/types/blog.types";
import { FaReply } from "react-icons/fa6";
import CommentBar from "../commentBar";
import useComment from "./useComment";
import { forwardRef } from "react";

interface commentPropsType extends commentTypes {
  blogId: number;
  commentbar: number;
  replyId: number;
  commentbarOpen: (id: number) => void;
  commentbarClose: () => void;
  refetch: () => void;
}

const Comment = forwardRef<HTMLDivElement, commentPropsType>(function MyComment(
  {
    author,
    content,
    id,
    children,
    createdAt,
    blogId,
    commentbar,
    replyId,
    commentbarOpen,
    commentbarClose,
    refetch,
  },
  ref
) {
  const {
    commentRef,
    btnRef,
    styles,
    childRefs,
    childStyles,
    replyOpen,
    reply,
    time,
  } = useComment({ children, createdAt });

  return (
    <div className="blog-comment-container" id={`comment-${id}`} ref={ref}>
      <div className="blog-comment" ref={commentRef}>
        <Avatar name={author.name} size={id !== replyId ? "sm" : "md"} />
        <div className="blog-comment-content">
          <div className="blog-comment-header">
            <div className="blog-comment-header--left">
              <Typography
                className="blog-comment-authorName"
                variant="h3"
                component="h2"
              >
                {author.name}
              </Typography>
              <Typography variant="body2">{time}</Typography>
              {/* <div className="blog-comment-posting">
                  <span className="loader" />
                  <p className="blog-comment-posting--text">posting</p>
                </div> */}
            </div>
            <div
              className="blog-comment-replyBtn"
              onClick={() => {
                commentbarOpen(replyId);
              }}
            >
              <FaReply />
              <p>reply</p>
            </div>
          </div>
          <p className="blog-comment-text">{content}</p>
        </div>
      </div>
      {children.length > 0 && (
        <div className="blog-reply-container">
          {!reply && (
            <>
              <div className="blog-comment-line" style={styles} />
              <button
                className="blog-reply-view"
                ref={btnRef}
                onClick={replyOpen}
              >
                view {children.length} reply
              </button>
            </>
          )}

          {reply &&
            children.map((reply, index) => (
              <div className="blog-comment-reply" key={reply.id}>
                <div
                  className={`blog-comment-line`}
                  style={childStyles[index]}
                />

                <Comment
                  {...reply}
                  blogId={blogId}
                  commentbar={commentbar}
                  commentbarClose={commentbarClose}
                  commentbarOpen={commentbarOpen}
                  refetch={refetch}
                  replyId={id}
                  ref={childRefs[index]}
                />
              </div>
            ))}
        </div>
      )}
      {commentbar === id && (
        <CommentBar
          blogId={blogId}
          commentId={id}
          close={commentbarClose}
          refetch={refetch}
        />
      )}
    </div>
  );
});
export default Comment;
