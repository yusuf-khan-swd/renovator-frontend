import {} from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const REVIEW_URL = "/reviews";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (data) => ({
        url: REVIEW_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),

    reviews: build.query({
      query: () => {
        return {
          url: REVIEW_URL,
          method: "GET",
        };
      },

      providesTags: [tagTypes.review],
    }),

    review: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${REVIEW_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),

    updateReview: build.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.review],
    }),

    deleteReview: build.mutation({
      query: (id) => ({
        url: `${REVIEW_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const {
  useReviewsQuery,
  useReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
