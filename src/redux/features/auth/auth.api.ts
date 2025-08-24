import { baseApi } from "@/redux/baseApi";





export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: ["User"]
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET"

            }),
            providesTags: ["User"]
        }),
        getAllUser: builder.query({
            query: (params) => ({
                url: "/user/all-users",
                method: "GET",
                params

            }),
            providesTags: ["User"]
        }),

            updateUser : builder.mutation({
            query : ({userId,payload})=>({
                url : `/user/${userId}`,
                method : "PATCH",
                data : payload
            }),
            invalidatesTags: ["User"]
        }),

        resetPassword : builder.mutation({
            query:(data) =>({
                url : "/auth/reset-password",
                method : "POST",
                data : data
            }),
             invalidatesTags: ["User"]
        }),

    })
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useUserInfoQuery,
    useLogoutMutation,
    useUpdateUserMutation,
    useResetPasswordMutation,
    useGetAllUserQuery,
} = authApi