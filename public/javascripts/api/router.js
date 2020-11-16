import { login, sessions } from './users.js';

(() => {

    var pathname = window.location.pathname
    if (pathname == "/") {
        login();
    }

    if (pathname == "/dashboard") {
        sessions()
    }
})()