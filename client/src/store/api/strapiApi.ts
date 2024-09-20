import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const strapiApi = createApi({
  reducerPath: "strapiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api`,
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ path, query }: { path: string; query?: string }) => ({
        url: `/${path}${query ? `?${query}` : ""}`,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      }),
    }),
  }),
});

export const { useGetDataQuery } = strapiApi;
