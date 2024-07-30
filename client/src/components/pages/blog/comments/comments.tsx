"use client";

import { useGetCommentsQuery } from "@/store/api/commentApi";
import CommentBar from "../commentBar";
import SectionLayout from "../sectionLayout";
import Comment from "./comment";
import { commentTypes } from "@/types/blog.types";
import { useState } from "react";
import EmptyComments from "./emptyComments";

interface commentPropsType {
  blogId: number;
}

function Comments({ blogId }: commentPropsType) {
  const { data, refetch } = useGetCommentsQuery({ id: 1 });

  const [commentbar, setCommentbar] = useState<number>(0);
  const commentbarOpen = (id: number) => {
    setCommentbar(id);
  };

  const commentbarClose = () => {
    setCommentbar(0);
  };

  return (
    <div className="blog-comments-container">
      <SectionLayout title={`comments ${data?.length || 0}`}>
        {data?.length > 0 ? (
          <div className="blog-comments">
            {data.map((comment: commentTypes) => (
              <Comment
                key={comment.id}
                {...comment}
                blogId={blogId}
                commentbar={commentbar}
                commentbarOpen={commentbarOpen}
                commentbarClose={commentbarClose}
                refetch={refetch}
                replyId={comment.id}
              />
            ))}
          </div>
        ) : (
          <EmptyComments />
        )}
      </SectionLayout>
      {!commentbar && <CommentBar blogId={blogId} refetch={refetch} />}
    </div>
  );
}

export default Comments;
