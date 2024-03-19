import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USERS_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    users: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: USERS_URL,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.user],
    }),

    adminUsers: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USERS_URL}/admins`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    normalUsers: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USERS_URL}/normal-users`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    user: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateUser: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUsersQuery,
  useAdminUsersQuery,
  useNormalUsersQuery,
  useUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
