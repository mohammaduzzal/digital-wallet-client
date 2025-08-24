import { baseApi } from "@/redux/baseApi";





export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        depositMoney : builder.mutation({
            query:(data) =>({
                url : "/transaction/deposit",
                method : "POST",
                data : data
            }),
             invalidatesTags: ["Wallet","User"]
        }),

        withDrawMoney : builder.mutation({
            query:(data) =>({
                url : "/transaction/withdraw",
                method : "POST",
                data : data
            }),
             invalidatesTags: ["Wallet","User"]
        }),

        sendMoney : builder.mutation({
            query:(data) =>({
                url : "/transaction/send",
                method : "POST",
                data : data
            }),
             invalidatesTags: ["Wallet","User"]
        }),

        cashInMoney : builder.mutation({
            query:(data) =>({
                url : "/transaction/cash-in",
                method : "POST",
                data : data
            }),
             invalidatesTags: ["Transaction"]
        }),

        cashOutMoney : builder.mutation({
            query:(data) =>({
                url : "/transaction/cash-out",
                method : "POST",
                data : data
            }),
             invalidatesTags: ["Transaction"]
        }),

        getAllTransaction: builder.query({
            query: (params) => ({
                url: "/transaction/all-transactions",
                method: "GET",
                params

            }),
            providesTags: ["Transaction"]
        }),

        getMyTransaction: builder.query({
            query: (params) => ({
                url: "/transaction/me",
                method: "GET",
                params

            }),
            providesTags: ["Transaction"]
        })
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