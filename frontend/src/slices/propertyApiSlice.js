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
    addSaveProperty: builder.mutation({
      query: (propertyId) => ({
        url: `${PROPERTY_URL}/${propertyId}/add-saved-property`,
        method: "PATCH",
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
  useAddSavePropertyMutation,
} = propertyApiSlice;
