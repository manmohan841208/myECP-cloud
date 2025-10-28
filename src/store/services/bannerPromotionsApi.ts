// services/promotionApi.ts
import { baseApi } from './baseApi';

export const promotionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPromotions: builder.query<any, number>({
      query: (type = 1) => `promotions?type=${type}`,
    }),
  }),
});

export const { useGetPromotionsQuery } = promotionApi;
