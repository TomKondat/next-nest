import { PROPERTY_URL } from "./urlConstrains";
import { apiSlice } from "./apiSlice";

export const propertyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => ({
        url: PROPERTY_URL,
      }),
      providesTags: ["Property"],
    }),

    getPropertyById: builder.query({
      query: (propertyId) => ({
        url: `${PROPERTY_URL}/${propertyId}`,
      }),
    }),

    addProperty: builder.mutation({
      query: (data) => ({
        url: PROPERTY_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Property"],
    }),

    editProperty: builder.mutation({
      query: ({ data, propertyId }) => ({
        url: `${PROPERTY_URL}/${propertyId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Property"],
    }),

    deleteProperty: builder.mutation({
      query: (propertyId) => ({
        url: `${PROPERTY_URL}/${propertyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"],
    }),
    saveProperty: builder.mutation({
      query: (propertyId) => ({
        url: `${PROPERTY_URL}/${propertyId}/save`,
        method: "POST",
      }),
      invalidatesTags: ["Property"],
    }),
  }),
});
export const {
  useGetPropertiesQuery,
  useGetPropertyByIdQuery,
  useAddPropertyMutation,
  useEditPropertyMutation,
  useDeletePropertyMutation,
  useSavePropertyMutation,
} = propertyApiSlice;
