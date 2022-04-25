import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICoach } from '../../shared';

const coachPageApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/api/site/coach-page' }),
    endpoints: build => ({
        squad: build.query<ICoach[], undefined>({
            query: () => '/'
        })
    }),
    reducerPath: 'coachPage'
})

export const { useSquadQuery } = coachPageApi

export default coachPageApi