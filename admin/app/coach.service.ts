import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ICoach, ICoachPayload } from "../../shared"

const coachApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: "/api/coach" }),
    endpoints: build => ({
        fetchCoaches: build.query<ICoach[], undefined>({
            query: () => '/',
            providesTags: () => ['coaches']
        }),
        createCoach: build.mutation<void, ICoachPayload>({
            query: body => ({
                body,
                method: 'POST',
                url: '/'
            }),
            invalidatesTags: ['coaches']
        }),
        updateCoach: build.mutation<void, { body: ICoachPayload, id: string }>({
            query: ({ body, id }) => ({
                body,
                method: 'PUT',
                url: `/${id}`
            }),
            invalidatesTags: ['coaches']
        }),
        removeCoach: build.mutation<void, string>({
            query: id => ({
                method: 'DELETE',
                url: `/${id}`
            }),
            invalidatesTags: ['coaches']
        }),
        uploadCoachAvatar: build.mutation<void, { body: FormData , id: string }>({
            query: ({ body, id }) => ({
                body,
                method: 'PUT',
                url: `/avatar/${id}`
            }),
            invalidatesTags: ['coaches']
        }),
        removeCoachAvatar: build.mutation<void, string>({
            query: id => ({
                method: 'DELETE',
                url: `/avatar/${id}`
            }),
            invalidatesTags: ['coaches']
        })
    }),
    reducerPath: 'coachApi',
    tagTypes: ['coaches']
})

export const {
	useFetchCoachesQuery, 
    useCreateCoachMutation,
    useUpdateCoachMutation,
    useRemoveCoachMutation,
    useUploadCoachAvatarMutation,
    useRemoveCoachAvatarMutation
} = coachApi

export default coachApi