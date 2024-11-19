import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPaths } from '../utils/routes';
import prepareHeaders from '../utils/prepareHeaders';

const messagesApi = createApi({
	reducerPath: 'messagesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: apiPaths.messagePath(),
		prepareHeaders,
	}),
	tagTypes: ['Messages'],
	endpoints: (builder) => ({
		getMessages: builder.query({
			query: () => '',
		}),

		addMessage: builder.mutation({
			query: (message) => ({
				method: 'POST',
				body: message,
			}),
		}),

		removeMessage: builder.mutation({
			query: (id) => ({
				url: id,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetMessagesQuery,
	useAddMessageMutation,
	useRemoveMessageMutation,
} = messagesApi;

export default messagesApi;
