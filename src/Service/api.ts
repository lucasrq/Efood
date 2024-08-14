import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RestaurantersApi } from '../Components/ProductList';
type Product = {
    id: number;
    price: number;
}

type PurchasePayload = {
    products: Product[];
    delivery: {
        receiver: string;
        address: {
            description: string;
            city: string;
            zipCode: string;
            number: number;
            complement?: string; // `?` indica que o campo é opcional
        }
    };
    payment: {
        card: {
            name: string;
            number: string;
            code?: number;
            expires?: {
                month: number;
                year: number;
            }
        }
    };
}

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fake-api-tau.vercel.app/api/efood'
    }),
    endpoints: (builder) => ({
        getFeatureRest: builder.query<RestaurantersApi, void>({
            query: () => 'restaurantes'
        }),
        purchase: builder.mutation<any, PurchasePayload>({
            query: (body) => ({
                url: 'checkout',
                method:'POST',
                body
            })
        })
    })
});


export const { useGetFeatureRestQuery, usePurchaseMutation } = api;

export default api;
