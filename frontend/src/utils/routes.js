const serverPath = 'api/v1';

export const apiPaths = {
    loginPath: () => [serverPath, 'login'].join('/'),
    channelPath: () => [serverPath, 'channels'].join('/'),
    messagePath: () => [serverPath, 'messages'].join('/'),
    signupPath: () => [serverPath, 'signup'].join('/'),
}

const routes = {
    login: '/login',
    chat: '/',
    signup: '/signup',
    error: '*',
}

export default routes;
