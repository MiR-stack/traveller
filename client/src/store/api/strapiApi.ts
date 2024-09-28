import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const strapiApi = createApi({
  reducerPath: "strapiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api`,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ path, query }: { path: string; query?: string }) => ({
        url: `/${path}${query ? `?${query}` : ""}`,
      }),
    }),
    subscribe: builder.mutation({
      query: (data) => ({
        url: "/subscribers",
        method: "POST",
        body: { data },
      }),
    }),
    contact: builder.mutation({
      query: (data) => ({
        url: "/contacts",
        method: "POST",
        body: { data },
      }),
    }),
  }),
});

export const { useGetDataQuery, useSubscribeMutation, useContactMutation } =
  strapiApi;
