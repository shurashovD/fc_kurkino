import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { INews } from '../../shared';

const newsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/api/site/news-page' }),
    endpoints: build => ({
        getNews: build.query<{data: INews, length: number}, {limit: number, page: number}>({
            query: ({ limit, page }) => `?limit=${limit}&page=${page}`,
            providesTags: () => ['news']
        })
    }),
    reducerPath: 'newsApi',
    tagTypes: ['news']
})

export const { useGetNewsQuery } = newsApi

export default newsApi