import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IFootballer, IFootballerPayload } from "../../shared"

const squadApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: "/api/squad/" }),
    endpoints: build => ({
        fetchFootballers: build.query<IFootballer[], undefined>({
            query: () => '/',
            providesTags: () => ['footballers']
        }),
        createFootballer: build.mutation<void, IFootballerPayload>({
            query: body => ({
                body,
                method: 'POST',
                url: '/'
            }),
            invalidatesTags: ['footballers']
        }),
        updateFootballer: build.mutation<void, { body: IFootballerPayload, id: string }>({
            query: ({ body, id }) => ({
                body,
                method: 'PUT',
                url: `/${id}`
            }),
            invalidatesTags: ['footballers']
        }),
        removeFootballer: build.mutation<void, string>({
            query: id => ({
                method: 'DELETE',
                url: `/${id}`
            }),
            invalidatesTags: ['footballers']
        }),
        uploadFootballerAvatar: build.mutation<void, { body: FormData , id: string }>({
            query: ({ body, id }) => ({
                body,
                method: 'PUT',
                url: `/avatar/${id}`
            }),
            invalidatesTags: ['footballers']
        }),
        removeFootballerAvatar: build.mutation<void, string>({
            query: id => ({
                method: 'DELETE',
                url: `/avatar/${id}`
            }),
            invalidatesTags: ['footballers']
        })
    }),
    reducerPath: 'squadApi',
    tagTypes: ['footballers']
})

export const {
    useFetchFootballersQuery,
    useCreateFootballerMutation,
    useUpdateFootballerMutation,
    useRemoveFootballerMutation,
    useUploadFootballerAvatarMutation,
    useRemoveFootballerAvatarMutation
} = squadApi

export default squadApi