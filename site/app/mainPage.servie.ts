import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBirthday, ICoach, IFootballer, IMatch, IMatchPhoto } from '../../shared'

const mainPagehApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: "/api/site/main-page" }),
	endpoints: (build) => ({
		matches: build.query<IMatch[], undefined>({
			query: () => "/matches",
			providesTags: () => ["matches"],
		}),
		photos: build.query<IMatchPhoto[], undefined>({
			query: () => "/photos",
			providesTags: () => ["photos"],
		}),
		birthdays: build.query<IBirthday[], undefined>({
			query: () => "/birthdays",
			providesTags: () => ['birthdays']
		}),
	}),
	reducerPath: "matchApi",
	tagTypes: ["matches", "photos", 'birthdays'],
})

export const { useBirthdaysQuery, useMatchesQuery, usePhotosQuery } = mainPagehApi

 export default mainPagehApi