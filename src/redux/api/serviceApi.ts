import { IMeta, IService } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SERVICE_URL = "/services";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createService: build.mutation({
      query: (data) => ({
        url: SERVICE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    services: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SERVICE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),

    upcomingService: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${SERVICE_URL}/upcoming`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.service],
    }),

    ongoingService: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${SERVICE_URL}/ongoing`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.service],
    }),

    service: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),

    updateService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useServicesQuery,
  useServiceQuery,
  useUpcomingServiceQuery,
  useOngoingServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
