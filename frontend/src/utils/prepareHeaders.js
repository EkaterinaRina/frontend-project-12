const prepareHeaders = (header, { getState }) => {
	const state = getState();
	const { token } = state.auth;

	if (token) {
		header.set('Authorization', `Bearer ${token}`);
	}
	return header;
};

export default prepareHeaders;
