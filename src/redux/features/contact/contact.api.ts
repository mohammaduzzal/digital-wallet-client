import { baseApi } from "@/redux/baseApi";





export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        contact: builder.mutation({
            query: (contactInfo) => ({
                url: "/contact/post",
                method: "POST",
                data: contactInfo
            }),
        }),
    })
})


export const {
   useContactMutation
} = contactApi