import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITransactionResponse } from "@/types";






export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        depositMoney: builder.mutation({
            query: (data) => ({
                url: "/transaction/deposit",
                method: "POST",
                data: data
            }),
            invalidatesTags: ["Wallet", "User", "Transaction"]
        }),

        withDrawMoney: builder.mutation({
            query: (data) => ({
                url: "/transaction/withdraw",
                method: "POST",
                data: data
            }),
            invalidatesTags: ["Wallet", "User", "Transaction"]
        }),

        sendMoney: builder.mutation({
            query: (data) => ({
                url: "/transaction/send",
                method: "POST",
                data: data
            }),
            invalidatesTags: ["Wallet", "User", "Transaction"]
        }),

        cashInMoney: builder.mutation({
            query: (data) => ({
                url: "/transaction/cash-in",
                method: "POST",
                data: data
            }),
            invalidatesTags: ["User", "Wallet", "Transaction"]
        }),

        cashOutMoney: builder.mutation({
            query: (data) => ({
                url: "/transaction/cash-out",
                method: "POST",
                data: data
            }),
            invalidatesTags: ["User", "Wallet", "Transaction"]
        }),

        getAllTransaction: builder.query({
            query: (params) => ({
                url: "/transaction/all-transactions",
                method: "GET",
                params

            }),
            providesTags: ["Transaction"]
        }),

        getMyTransaction: builder.query <ITransactionResponse, unknown> ({
            query: (params) => ({
                url: "/transaction/me",
                method: "GET",
                params

            }),
            providesTags: ["Transaction"],
            transformResponse: (response: IResponse<ITransactionResponse>) => response.data
        }),
    })
})


export const {
    useDepositMoneyMutation,
    useWithDrawMoneyMutation,
    useSendMoneyMutation,
    useGetAllTransactionQuery,
    useGetMyTransactionQuery,
    useCashInMoneyMutation,
    useCashOutMoneyMutation
} = transactionApi