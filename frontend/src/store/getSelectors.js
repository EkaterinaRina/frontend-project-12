import channelsApi from '../api/channelApi';

const getToken = (state) => state.auth.token;

const getChannelsModalId = (state) => state.channelsModal.channelsModal.id;

const getChannelsModalName = (state) => state.channelsModal.channelsModal.name;

const getCurrentChannelId = (state) => state.currentChannel.currentChannel.id;

const getCurrentChannel = (state) => state.currentChannel.currentChannel;

const getUsername = (state) => state.auth.userName;

const getShowModal = (state) => state.channelsModal.showModal;

const getCannels = (state) => channelsApi.endpoints.getChannels.select()(state)?.data;

export {
  getToken,
  getChannelsModalId,
  getChannelsModalName,
  getCurrentChannelId,
  getCurrentChannel,
  getUsername,
  getCannels,
  getShowModal,
};
