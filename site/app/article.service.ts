import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { INews } from '../../shared';

const articleApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: "/api/site" }),
	endpoints: (build) => ({
		getArticle: build.query<INews, string>({
			query: (id) => `/article-page/get-by-id/${id}`,
		}),
		getLastArticles: build.query<INews[], string>({
			query: (currId) => `/article-page/get-last/${currId}`,
		}),
	}),
	reducerPath: "articleApi",
})

export const { useGetArticleQuery, useGetLastArticlesQuery } = articleApi

export default articleApi