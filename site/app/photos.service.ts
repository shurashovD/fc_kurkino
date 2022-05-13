import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { IMatchPhoto } from '../../shared';

const photosApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/api/site/photos-page' }),
    endpoints: build => ({
        getAlboms: build.query<{data: IMatchPhoto[], length: number}, {limit: number, page: number}>({
            query: ({ limit, page }) => `?limit=${limit}&page=${page}`,
            providesTags: () => ['photos']
        })
    }),
    reducerPath: 'photosApi',
    tagTypes: ['photos']
})

export const { useGetAlbomsQuery } = photosApi

export default photosApi