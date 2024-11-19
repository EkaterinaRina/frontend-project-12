import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsModal: {
    name: '',
    id: '',
  },
  showModal: '',
};

const modalSlice = createSlice({
  name: 'channelsModal',
  initialState,
  reducers: {
    setModalChannel: (state, action) => ({
      ...state,
      channelsModal: {
        ...state.channelsModal,
        name: action.payload.name,
        id: action.payload.id,
      },
      showModal: action.payload.modal,
    }),
  },
});

export const { setModalChannel } = modalSlice.actions;

export default modalSlice.reducer;
