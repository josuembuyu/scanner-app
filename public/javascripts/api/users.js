import { postForm, alertMessage, getDatas, customDate, loader} from "./init.js";

/**
 * Fonction permettant de faire le login
 */

const login = () => {
    postForm("login-form", "login-form-btn", "/api/users/login", (state, datas) => {
        if (state) {
            window.location.assign("/dashboard")
        } else {
            $("#message-alert").html(alertMessage(datas.message, 'danger'));
        }
    })
}


const sessions = () => {
    $.get("/api/getsession", function (response) {

        $("#session_container").html(`<div class="row"><div style="padding-top:5em;" class="col-md-12"><center>${loader('post')}</center></div></div>`);

        $.get(`https://www.goshen.auroreapp.com/api/session/control?api_token=${response.data.api_token}`, (datas) => {
            
            var sessions = JSON.parse(datas)

            $("#session_container").html(`
                <div class="mb-2">
                    <h5>Sessions contrôle</h5>
                </div>
                <ul id="list_session" class="profile-details">
                </ul>
            `);

            sessions.data.map(session => {
                $("#list_session").append(`
                    <a href="/scan/${session.id}">
                        <li>
                            <div class="details-icon" style="background-color: #1E88E5;">
                                <img src="/images/icons/icon4.svg" alt="">
                            </div>
                            <div class="profile-details-content">
                                <h6>Du ${session.begin} au ${session.end}</h6>
                                <span>${session.label}</span>
                            </div>
                        </li>
                    </a>
                `)
            })
        })
    });
}
export { login, sessions } 

