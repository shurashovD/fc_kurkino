import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IMatch, IMatchPage } from '../../shared';

const matchApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: "/api/site/match-page" }),
	endpoints: (build) => ({
		futures: build.query<IMatchPage[], undefined>({
			query: () => "/futures",
			providesTags: () => ["futures"],
		}),
		continous: build.query<IMatchPage[], undefined>({
			query: () => "/continous",
			providesTags: () => ["continous"],
		}),
		getMatch: build.query<IMatch, string>({
			query: (id) => `/match/${id}`,
			providesTags: () => ['match']
		}),
	}),
	reducerPath: "matchPageApi",
	tagTypes: ["futures", "continous", "match"],
})

export default matchApi

export const { useFuturesQuery, useContinousQuery, useGetMatchQuery } = matchApi