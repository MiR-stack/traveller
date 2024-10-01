"use client";

import useCommentBar from "./useCommentBar";
import { IoMdClose } from "react-icons/io";

interface commentBarPropTypes {
  blogId: number;
  commentId?: number;
  close?: () => void;
  refetch: () => void;
}

function CommentBar({
  blogId,
  commentId,
  close,
  refetch,
}: commentBarPropTypes) {
  const {
    handleComment,
    handleFeature,
    handleGuest,
    handleSubmit,
    name,
    email,
    website,
    comment,
    error,
    feature,
    userToken,
  } = useCommentBar({ blogId, commentId, refetch });

  return (
    <section className="comment-bar">
      <div className="comment-bar__title">
        <h2 className={`comment-bar__${commentId ? "reply" : "comment"}-text`}>
          write a {commentId ? "reply" : "comment"}
        </h2>

        {commentId && <IoMdClose onClick={close} />}
      </div>
      <form className="comment-bar__wrapper" onSubmit={handleSubmit}>
        {!userToken && (
          <div className="comment-bar__user-info">
            <div className={`error-boundary ${error.name && "error"}`}>
              <input
                className="comment-bar__input"
                type="text"
                name="name"
                value={name}
                placeholder="name"
                onChange={handleGuest}
              />
              {error.name && <p className="error">{error.name} </p>}
            </div>
            <div className={`error-boundary ${error.email && "error"}`}>
              <input
                className="comment-bar__input"
                type="email"
                name="email"
                value={email}
                placeholder="email"
                onChange={handleGuest}
              />
              {error.email && <p className="error">{error.email} </p>}
            </div>
            <input
              className="comment-bar__input"
              type="text"
              name="website"
              value={website}
              placeholder="website"
              onChange={handleGuest}
            />
          </div>
        )}
        <div className={`error-boundary ${error.comment && "error"}`}>
          <textarea
            className="comment-bar__input comment-bar__comment"
            name="comment"
            value={comment}
            id="comment"
            cols={30}
            placeholder="enter your comment here"
            onChange={handleComment}
          />
          {error.comment && <p className="error">{error.comment} </p>}
        </div>
        {!userToken && (
          <div className="comment-bar__feature">
            <input
              type="checkbox"
              id="save-info"
              name="saveInfo"
              checked={feature.saveInfo}
              onChange={handleFeature}
            />
            <label htmlFor="save-info">
              {" "}
              Save my name, email, and website in this browser for the next time
              I comment.{" "}
            </label>
          </div>
        )}
        <button className="comment-bar__button" type="submit">
          post {commentId ? "Reply" : "comment"}
        </button>
      </form>
    </section>
  );
}

export default CommentBar;
