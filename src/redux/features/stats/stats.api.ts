import { baseApi } from "@/redux/baseApi";


export const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({       

        getTransactionStats: builder.query({
            query: () => ({
                url: "/stats/transactions",
                method: "GET",

            }),
            providesTags: ["Stats"],
            transformResponse: (response) => response.data

        }),

        getUserStats: builder.query({
            query: () => ({
                url: "/stats/users",
                method: "GET",

            }),
            providesTags: ["Stats"],
            transformResponse: (response) => response.data

        }),

        
    })
})


export const {
    useGetTransactionStatsQuery,
    useGetUserStatsQuery
} = statsApi