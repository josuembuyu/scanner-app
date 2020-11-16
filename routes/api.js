var express = require('express'),
    router = express.Router(),
    API = require('./includes/config').URL().API,
    functions = require('./includes/module'),
    session = require("cookie-session"),
    axios = require("axios").default;
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


/**
 * Récuperation de la session du user
 */

 router.get("/getsession", (req, res) => {
    if (req.session.admin && req.session.admin.id) {
        res.status(200).send({
            state: true,
            message: "Voici les informations du user",
            data: req.session.admin
        });
    } else {
        res.status(200).send({
            state: false,
            message: "Le user n'est pas connecté"
        });
    }
 })


module.exports = router;