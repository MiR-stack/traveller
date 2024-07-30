import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_token = process.env.NEXT_PUBLIC_API_TOKEN;
const relation = "api::blog.blog:";

interface getCommentsTypes {
  id: number;
  query?: string;
}

interface addCommentTypes {
  id: number;
  token: string;
  threadOf?: number | null;
  content: string;
  query?: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

interface editCommentTypes {
  id: number;
  token: string;
  content: string;
  comment_id: number;
}

interface removeCommentTypes {
  id: number;
  token: string;
  comment_id: number;
  author_id?: number;
}

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}/comments`,
  }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: ({ id, query }: getCommentsTypes) => ({
        url: `${relation}${id}?${query ? query : ""}`,
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      }),
    }),
    addComment: builder.mutation({
      query: ({
        id,
        content,
        token,
        threadOf = null,
        query,
        author,
      }: addCommentTypes) => ({
        url: `${relation}${id}?${query ? query : ""}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          content,
          threadOf,
          author,
        },
      }),
    }),
    editComment: builder.mutation({
      query: ({ id, content, comment_id, token }: editCommentTypes) => ({
        url: `${relation}${id}/comment/${comment_id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          content,
        },
      }),
    }),

    removeComment: builder.mutation({
      query: ({
        id,
        comment_id,
        token,
        author_id = 1,
      }: removeCommentTypes) => ({
        url: `${relation}${id}/comment/${comment_id}?authorId=${author_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useAddCommentMutation,
  useEditCommentMutation,
  useGetCommentsQuery,
  useRemoveCommentMutation,
} = commentsApi;
