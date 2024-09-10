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

    // Get user by ID (uncomment if needed)
    // getUserById: builder.query({
    //   query: (userId) => ({
    //     url: `${USER_URL}/${userId}`,
    //   }),
    //   keepUnusedDataFor: 5,
    //   provideTags: ["User"],
    // }),

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

    // Logout user (uncomment if needed)
    // logout: builder.mutation({
    //   query: () => ({
    //     url: `${USER_URL}/logout`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
  // useGetUserByIdQuery,
  // useLogoutMutation,
} = userApiSlice;
