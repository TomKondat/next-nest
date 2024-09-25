import { PROPERTY_URL, RESAULT_NUM, USER_URL } from "./urlConstrains";
import { apiSlice } from "./apiSlice";

export const propertyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: ({
        page = 1,
        limit = RESAULT_NUM,
        propertyType,
        priceRange,
        bedrooms,
        saleType,
        sort,
      }) => {
        let queryParams = `?page=${page}&limit=${limit}`;
        if (sort) queryParams += `&sort=${sort}`;
        if (propertyType)
          queryParams += `&propertyType=${propertyType.toLowerCase()}`;
        if (priceRange) queryParams += `&priceRange=${priceRange}`;
        if (bedrooms) queryParams += `&bedrooms=${bedrooms}`;
        if (saleType) queryParams += `&saleType=${saleType}`;
        return { url: `${PROPERTY_URL}${queryParams}` };
      },
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
    removeSaveProperty: builder.mutation({
      query: (propertyId) => ({
        url: `${USER_URL}/delete-from-saved-properties/${propertyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedProperty"],
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
  useRemoveSavePropertyMutation,
} = propertyApiSlice;
