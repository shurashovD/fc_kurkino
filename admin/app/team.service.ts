import { ITeam, ITeamPayload } from './../../shared/index.d';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const teamApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: "/api/team" }),
	endpoints: (build) => ({
		getTeams: build.query<ITeam[], null>({
			query: () => "",
			providesTags: () => ["Teams"],
		}),
		getTeamById: build.query<ITeam, string>({
			query: (id: string) => `/${id}`,
		}),
		createTeam: build.mutation<ITeam[], ITeamPayload>({
			query: (body) => ({
				body,
				method: "POST",
				url: "/",
			}),
			invalidatesTags: ["Teams"],
		}),
		updateTeam: build.mutation<ITeam[], { body: ITeamPayload; id: string }>(
			{
				query: ({ body, id }) => ({
					body,
					method: "PUT",
					url: `/${id}`,
				}),
				invalidatesTags: ["Teams"],
			}
		),
		uploadLogo: build.mutation<ITeam[], { body: FormData; id: string }>({
			query: ({ body, id }) => ({
				body,
				method: "PUT",
				url: `/upload-logo/${id}`,
			}),
			invalidatesTags: ["Teams"],
		}),
		deleteLogo: build.mutation<ITeam[], string>({
			query: (id) => ({
				method: "DELETE",
				url: `/logo/${id}`,
			}),
			invalidatesTags: ["Teams"],
		}),
		delete: build.mutation<ITeam[], string>({
			query: (id) => ({
				method: "DELETE",
				url: `/${id}`,
			}),
			invalidatesTags: ["Teams"],
		}),
	}),
	reducerPath: "teamApi",
	tagTypes: ["Team", "Teams"],
})

export const {
    useCreateTeamMutation,
    useDeleteLogoMutation,
    useDeleteMutation,
    useGetTeamByIdQuery,
    useGetTeamsQuery,
    useUpdateTeamMutation,
    useUploadLogoMutation
} = teamApi