import { apiSlice } from "./apiSlice";
import { USER_URL } from "./urlConstrains";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: USER_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    // Get user by ID
    getUserById: builder.query({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
        method: "GET",
      }),
    }),

    // Register user
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    // Login user
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    // Logout user
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),

    // Update user profile
    editUser: builder.mutation({
      query: ({ data, userId }) => ({
        url: `${USER_URL}/${userId}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useEditUserMutation,
  useGetUserByIdQuery,
} = userApiSlice;
