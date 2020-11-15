import { login } from './users.js';

(() => {

    var pathname = window.location.pathname
    if (pathname == "/") {
        login();
    }
})()