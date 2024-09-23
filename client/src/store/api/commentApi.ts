import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const RELATION = "api::blog.blog:";
const BASE_URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments`;

interface CommentAuthor {
  id: string;
  name: string;
  email: string;
}

interface CommentBase {
  id: number;
  token: string;
}

interface GetCommentsParams extends Partial<CommentBase> {
  query?: string;
}

interface AddCommentParams extends CommentBase {
  threadOf?: number | null;
  content: string;
  query?: string;
  author?: CommentAuthor;
}

interface EditCommentParams extends CommentBase {
  content: string;
  comment_id: number;
}

interface RemoveCommentParams extends CommentBase {
  comment_id: number;
  author_id?: number;
}

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query<any, GetCommentsParams>({
      query: ({ id, query }) => ({
        url: `${RELATION}${id}${query ? `?${query}` : ""}`,
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      }),
      providesTags: ["Comment"],
    }),

    addComment: builder.mutation<any, AddCommentParams>({
      query: ({ id, content, token, threadOf = null, query, author }) => ({
        url: `${RELATION}${id}${query ? `?${query}` : ""}`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { content, threadOf, author },
      }),
      invalidatesTags: ["Comment"],
    }),

    editComment: builder.mutation<any, EditCommentParams>({
      query: ({ id, content, comment_id, token }) => ({
        url: `${RELATION}${id}/comment/${comment_id}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: { content },
      }),
      invalidatesTags: ["Comment"],
    }),

    removeComment: builder.mutation<any, RemoveCommentParams>({
      query: ({ id, comment_id, token, author_id = 1 }) => ({
        url: `${RELATION}${id}/comment/${comment_id}?authorId=${author_id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useRemoveCommentMutation,
} = commentsApi;
