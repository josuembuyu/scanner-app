var express = require('express'),
    router = express.Router(),
    API = require('./includes/config').URL().API,
    functions = require('./includes/module'),
    session = require("cookie-session"),
    app = express();

app.use(session({
    secret: "secrettoken"
}))

/**
 * Module pour le login du user
 */
router.post("/users/login", (req, res) => {
    var datas = {
        phone : req.body.phone,
        password : req.body.password
    }

    if (functions.NoEmpty(datas)) {
        functions.axiosPostRequest(`${API}/auth/login`, datas, (statusCode, state, response) => {
            if (state) {

                var { data } = response;

                req.session.admin = data;

                res.status(statusCode).send(response);

            } else {
                res.status(statusCode).send(response);
            }
        })
    } else {
        res.send({
            state: false,
            message: "Veuillez tous les champs important"
        })
    }
})


module.exports = router;