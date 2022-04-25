import { IMatch, IMatchPayload } from './../../shared/index.d';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const matchApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: "/api/match" }),
	endpoints: (build) => ({
		fetchMatch: build.query<IMatch[], undefined>({
			query: () => "/",
			providesTags: () => ["matches"],
		}),
		getMatchById: build.query<IMatch, string>({
			query: (id) => `/${id}`,
			providesTags: () => ["match"],
		}),
		createMatch: build.mutation<IMatch[], IMatchPayload>({
			query: (body) => ({
				body,
				method: "POST",
				url: "/",
			}),
			invalidatesTags: ["matches"],
		}),
		updateMatch: build.mutation<
			IMatch[],
			{ id: string; body: IMatchPayload }
		>({
			query: ({ body, id }) => ({
				body,
				method: "PUT",
				url: `/${id}`,
			}),
			invalidatesTags: ["matches"],
		}),
		removeMatch: build.mutation<IMatch[], string>({
			query: (id) => ({
				method: "DELETE",
				url: `/${id}`,
			}),
			invalidatesTags: ["matches"],
		}),
		scores: build.mutation<
			IMatch[],
			{
				body: { guestTeamScore: number; homeTeamScore: number }
				id: string
			}
		>({
			query: ({ body, id }) => ({
				body,
				method: "PUT",
				url: `/scores/${id}`,
			}),
			invalidatesTags: ["matches"],
		}),
		resetScores: build.mutation<IMatch[], string>({
			query: (id) => ({
				method: "DELETE",
				url: `/scores/${id}`,
			}),
			invalidatesTags: ["matches"],
		}),
		photos: build.mutation<IMatch, { body: FormData; id: string }>({
			query: ({ body, id }) => ({
				body,
				method: "PUT",
				url: `/photos/${id}`,
			}),
			invalidatesTags: ["match"],
		}),
		removePhotos: build.mutation<
			IMatch,
			{ body: { files: string[] }; id: string }
		>({
			query: ({ body, id }) => ({
				body,
				method: "DELETE",
				url: `/photos/${id}`,
			}),
			invalidatesTags: ["match"],
		}),
		videos: build.mutation<IMatch, { body: {link: string}, id: string }>({
			query: ({ body, id }) => ({
				body,
				method: "PUT",
				url: `/video/${id}`,
			}),
			invalidatesTags: ["match"],
		}),
		removeVideos: build.mutation<
			IMatch,
			{ body: { files: string[] }; id: string }
		>({
			query: ({ body, id }) => ({
				body,
				method: "DELETE",
				url: `/video/${id}`,
			}),
			invalidatesTags: ["match"],
		}),
	}),
	reducerPath: "matchApi",
	tagTypes: ["matches", "match"],
})

export const {
	useFetchMatchQuery,
	useGetMatchByIdQuery,
	useCreateMatchMutation,
	useUpdateMatchMutation,
	useRemoveMatchMutation,
	useScoresMutation,
	usePhotosMutation,
	useRemovePhotosMutation,
	useResetScoresMutation,
	useVideosMutation,
	useRemoveVideosMutation,
} = matchApi

export default matchApi