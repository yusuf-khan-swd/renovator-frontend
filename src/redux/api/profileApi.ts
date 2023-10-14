import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PROFILE_URL = "/profile";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: () => {
        return {
          url: PROFILE_URL,
          method: "GET",
        };
      },

      providesTags: [tagTypes.profile],
    }),

    updateProfile: build.mutation({
      query: (data) => ({
        url: PROFILE_URL,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.profile],
    }),

    deleteProfile: build.mutation({
      query: (id) => ({
        url: PROFILE_URL,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const {
  useProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profileApi;
