import { configureStore } from '@reduxjs/toolkit'
import api from '../Service/api'
import cartReducer from './reducers/cart'

export const store = configureStore({
    reducer: {
        cart:cartReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaltMiddleware) => getDefaltMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>