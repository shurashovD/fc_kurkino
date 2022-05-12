import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { INews } from '../../shared';

const newsApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: "/api/news" }),
	endpoints: (build) => ({
		getNews: build.query<INews[], undefined>({
			query: () => "/",
			providesTags: () => ["news"],
		}),
		createNew: build.mutation<undefined, { title: string; date: string }>({
			query: (body) => ({
				body,
				method: "POST",
				url: "/",
			}),
			invalidatesTags: ["news"],
		}),
		updateNew: build.mutation<undefined, {body: { title: string; date: string }, id: string}>({
			query: ({body, id}) => ({
				body,
				method: "PUT",
				url: `/${id}`,
			}),
			invalidatesTags: ["news"],
		}),
        removeNew: build.mutation<undefined, string>({
			query: id => ({
				method: "DELETE",
				url: `/${id}`,
			}),
			invalidatesTags: ["news"],
		}),
        updateText: build.mutation<undefined, {body: { text: string }, id: string}>({
			query: ({body, id}) => ({
				body,
				method: "PUT",
				url: `/text/${id}`,
			}),
			invalidatesTags: ["news"],
		}),
        updatePhoto: build.mutation<undefined, {body: FormData, id: string}>({
			query: ({body, id}) => ({
				body,
				method: "PUT",
				url: `/photo/${id}`,
			}),
			invalidatesTags: ["news"],
		}),
        removePhoto: build.mutation<undefined, string>({
			query: id => ({
				method: "DELETE",
				url: `/photo/${id}`,
			}),
			invalidatesTags: ["news"],
		}),
	}),
	reducerPath: "newsApi",
	tagTypes: ["news"],
})

export const {
    useCreateNewMutation,
    useGetNewsQuery,
    useRemoveNewMutation,
    useRemovePhotoMutation,
    useUpdateNewMutation,
    useUpdatePhotoMutation,
    useUpdateTextMutation
} = newsApi

export default newsApi