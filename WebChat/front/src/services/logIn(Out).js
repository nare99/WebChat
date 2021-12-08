import cookie from 'react-cookies';

function onLogIn(access_token) {
    cookie.save('access_token', access_token, { path: '/' });
}

function onLogOut() {
    cookie.remove('access_token', { path: '/' });
}

export { onLogIn, onLogOut };