import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const ABOUT_URL = "/about";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAboutUs: build.mutation({
      query: (data) => ({
        url: ABOUT_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.about],
    }),

    getAllAboutUs: build.query({
      query: () => {
        return {
          url: ABOUT_URL,
          method: "GET",
        };
      },
      providesTags: [tagTypes.about],
    }),

    aboutUs: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ABOUT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.about],
    }),

    updateAboutUs: build.mutation({
      query: (data) => ({
        url: `${ABOUT_URL}/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.about],
    }),

    deleteAboutUs: build.mutation({
      query: (id) => ({
        url: `${ABOUT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.about],
    }),
  }),
});

export const {
  useGetAllAboutUsQuery,
  useAboutUsQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
  useDeleteAboutUsMutation,
} = aboutApi;
