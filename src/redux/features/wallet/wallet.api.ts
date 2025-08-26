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
            query: () => ({
                url: "/wallet/my-wallet",
                method: "GET",
                

            }),
            providesTags: ["Wallet"]
        }),

        updateWallet: builder.mutation({
            query: ({ walletId, payload }) => ({
                url: `/wallet/${walletId}`,
                method: "PATCH",
                data: payload
            }),
            invalidatesTags: ["Wallet","User"]
        }),
    })
})


export const {
    useGetMyWalletQuery,
    useGetAllWalletsQuery,
    useUpdateWalletMutation
} = walletApi