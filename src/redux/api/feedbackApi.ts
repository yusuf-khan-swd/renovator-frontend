import {} from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const FEEDBACK_URL = "/feedbacks";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFeedback: build.mutation({
      query: (data) => ({
        url: FEEDBACK_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    feedbacks: build.query({
      query: () => {
        return {
          url: FEEDBACK_URL,
          method: "GET",
        };
      },

      providesTags: [tagTypes.feedback],
    }),

    feedback: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),

    updateFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    deleteFeedback: build.mutation({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});

export const {
  useFeedbacksQuery,
  useFeedbackQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
