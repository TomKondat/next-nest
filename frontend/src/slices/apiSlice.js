import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./urlConstrains";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    api.dispatch(logout());
  }
  return result;
};
export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Property", "User"],
  endpoints: (builder) => ({}),
});
