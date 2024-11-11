import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPaths } from '../utils/routes';
import prepareHeaders from '../utils/prepareHeaders';

export const channelsApi = createApi({
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
    })
});

export const { useGetChannelsQuery } = channelsApi;