import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RestaurantersApi } from '../Components/ProductList';

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fake-api-tau.vercel.app/api/efood'
    }),
    endpoints: (builder) => ({
        getFeatureRest: builder.query<RestaurantersApi, void>({
            query: () => 'restaurantes'
        })
    })
});

export const { useGetFeatureRestQuery } = api;
export default api;
