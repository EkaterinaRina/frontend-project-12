import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPaths } from '../utils/routes';
import prepareHeaders from '../utils/prepareHeaders';

const channelsApi = createApi({
	reducerPath: 'channelsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: apiPaths.channelPath(),
		prepareHeaders,
	}),
	tagTypes: ['Channel'],
	endpoints: (build) => ({
		getChannels: build.query({
			query: () => '',
		}),

		addChannel: build.mutation({
			query: (channel) => ({
				method: 'POST',
				body: channel,
			}),
		}),

		renameChannel: build.mutation({
			query: (channel) => ({
				url: channel.id,
				method: 'PATCH',
				body: channel,
			}),
		}),

		removeChannel: build.mutation({
			query: (id) => ({
				url: id,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetChannelsQuery,
	useAddChannelMutation,
	useRemoveChannelMutation,
	useRenameChannelMutation,
} = channelsApi;

export default channelsApi;