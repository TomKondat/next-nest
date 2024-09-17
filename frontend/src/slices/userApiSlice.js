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
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/editprofile`,
        method: "PATCH",
        body: data,
      }),
    }),
    // Saved user properties

    getSavedPropertiesById: builder.query({
      query: () => ({
        url: `${USER_URL}/get-saved-properties`,
      }),
    }),
    // Managed user properties

    getManagedPropertiesById: builder.query({
      query: () => ({
        url: `${USER_URL}/get-managed-properties`,
      }),
    }),
    // User Info

    getUserInfo: builder.query({
      query: () => ({
        url: `${USER_URL}/get-user-info`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserProfileMutation,
  useGetSavedPropertiesByIdQuery,
  useGetManagedPropertiesByIdQuery,
  useGetUserInfoQuery,
} = userApiSlice;
