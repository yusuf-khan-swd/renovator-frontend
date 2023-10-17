import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CART_URL = "/carts";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCart: build.mutation({
      query: (data) => ({
        url: CART_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),

    carts: build.query({
      query: () => {
        return {
          url: CART_URL,
          method: "GET",
        };
      },

      providesTags: [tagTypes.cart],
    }),

    cart: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${CART_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.cart],
    }),

    updateCart: build.mutation({
      query: (data) => ({
        url: `${CART_URL}/${data.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),

    deleteCart: build.mutation({
      query: (id) => ({
        url: `${CART_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.cart],
    }),
  }),
});

export const {
  useCartsQuery,
  useCartQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = cartApi;
