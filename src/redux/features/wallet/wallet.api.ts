import { baseApi } from "@/redux/baseApi";





export const walletApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllWallets: builder.query({
            query: (params) => ({
                url: "/wallet/all-wallets",
                method: "GET",
                params

            }),
            providesTags: ["Wallet"]
        }),

        getMyWallet: builder.query({
            query: (params) => ({
                url: "/wallet/my-wallet",
                method: "GET",
                params

            }),
            providesTags: ["Wallet"]
        })
    })
})


export const {
   useGetMyWalletQuery,
   useGetAllWalletsQuery,
} = walletApi