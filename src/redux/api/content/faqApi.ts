import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const FAQ_URL = "/faqs";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFaq: build.mutation({
      query: (data) => ({
        url: FAQ_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    faqs: build.query({
      query: () => {
        return {
          url: FAQ_URL,
          method: "GET",
        };
      },
      providesTags: [tagTypes.faq],
    }),

    faq: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FAQ_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),

    updateFaq: build.mutation({
      query: (data) => ({
        url: `${FAQ_URL}/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    deleteFaq: build.mutation({
      query: (id) => ({
        url: `${FAQ_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useFaqsQuery,
  useFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
