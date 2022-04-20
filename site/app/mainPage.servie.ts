import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMatch, IMatchPhoto } from '../../shared'

const mainPagehApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: "/api/site/main-page" }),
	endpoints: (build) => ({
		matches: build.query<IMatch[], undefined>({
			query: () => "/matches",
			providesTags: () => ["matches"],
		}),
		photos: build.query<IMatchPhoto[], undefined>({
			query: () => '/photos',
			providesTags: () => ['photos']
		}),
	}),
	reducerPath: "matchApi",
	tagTypes: ["matches", "photos"],
})

export const { useMatchesQuery, usePhotosQuery } = mainPagehApi

 export default mainPagehApi