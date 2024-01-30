import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const ABOUT_URL = "/about";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAbout: build.mutation({
      query: (data) => ({
        url: ABOUT_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.about],
    }),

    allAbout: build.query({
      query: () => {
        return {
          url: ABOUT_URL,
          method: "GET",
        };
      },
      providesTags: [tagTypes.about],
    }),

    about: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ABOUT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.about],
    }),

    updateAbout: build.mutation({
      query: (data) => ({
        url: `${ABOUT_URL}/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.about],
    }),

    deleteAbout: build.mutation({
      query: (id) => ({
        url: `${ABOUT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.about],
    }),
  }),
});

export const {
  useAllAboutQuery,
  useAboutQuery,
  useCreateAboutMutation,
  useUpdateAboutMutation,
  useDeleteAboutMutation,
} = aboutApi;
