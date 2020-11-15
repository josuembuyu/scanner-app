import { postForm, alertMessage, getDatas, customDate} from "./init.js";

/**
 * Fonction permettant de faire le login
 */

const login = () => {
    postForm("login-form", "login-form-btn", "/api/users/login", (state, datas) => {
        if (state) {
            
        } else {
            
        }
    })
}

