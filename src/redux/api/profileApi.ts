import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PROFILE_URL = "/profile";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: (id: string) => {
        return {
          url: `${PROFILE_URL}/${id}`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.profile],
    }),

    updateProfile: build.mutation({
      query: (data) => ({
        url: PROFILE_URL,
        method: "PATCH",
        data: data,
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
