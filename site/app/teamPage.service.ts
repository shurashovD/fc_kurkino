import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITeamPage } from '../../shared';

const teamPageApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/api/site/team-page' }),
    endpoints: build => ({
        team: build.query<ITeamPage[], undefined>({
            query: () => '/'
        })
    }),
    reducerPath: 'teamPage'
})

export const { useTeamQuery } = teamPageApi

export default teamPageApi