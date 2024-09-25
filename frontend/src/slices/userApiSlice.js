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

    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/updateUser`,
        method: "PATCH",
        body: data,
      }),
    }),

    updateUserImage: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/upload-user-image`,
        method: "POST",
        body: data,
      }),
    }),

    getSavedPropertiesById: builder.query({
      query: () => ({
        url: `${USER_URL}/get-saved-properties`,
      }),
    }),

    getManagedPropertiesById: builder.query({
      query: () => ({
        url: `${USER_URL}/get-managed-properties`,
      }),
    }),

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
  useUpdateUserImageMutation,
} = userApiSlice;
