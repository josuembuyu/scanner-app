/**
 * Gere toutes les requetes post d'un formulaire vers l'api
 * @param {*} form le formulaire qui est envoyé 
 * @param {*} button le bouton submit du formulaire, nous sert a y mettre le loader
 * @param {*} route la route a laquelle envoyée les datas
 * @param {*} callback la fonctions callback
 */
function postForm(form, button, url, callback) {
    var form = $('#' + form),
        inputs,
        obj = {},
        name,
        btnSubmit,
        btnText;
    form.submit((e) => {
        e.preventDefault();
        inputs = e.target.elements;
        btnSubmit = $("#" + button);
        btnText = btnSubmit.html();
        //Recuperation des inputs text et autres
        for (let index = 0; index < inputs.length; index++) {
            name = inputs[index].name;
            if (name != "") {
                if (/input|textarea/i.test(e.target.elements[index].localName)) {
                    
                    if (/radio/i.test(inputs[index].type)) {
                        
                        if (inputs[index].checked) {
                            obj[name] = inputs[index].value;
                        }

                    }else if (/checkbox/i.test(inputs[index].type)) {
                        if (inputs[index].checked) {
                            obj[name] = true;
                        } else {
                            obj[name] = false;
                        }
                    }else {
                        obj[name] = inputs[index].value;
                    }
                }
                if (/select/i.test(e.target.elements[index].localName)) {
                    obj[name] = inputs[index].options[inputs[index].selectedIndex].value;
                }
            }
        }

        console.log(obj);
        //Envoi de la requete avec ajax
        $.ajax({
            type: 'POST',
            url: `${url}`,
            dataType: "json",
            data: obj,
            beforeSend: function () {
                btnSubmit.html(`<div class="sbl-circ white"></div>`);
            },
            success: function (data) {
                btnSubmit.html(btnText);
                if (data.state) {
                    callback(true, data);
                } else {
                    callback(false, data);
                }
            },
            error: function (err) {
                btnSubmit.html(btnText);
                callback(false, err);
            }
        });
    })
}


/**
 * Effecture une requete get
 * @param {*} url le lien permettant de recuperer les donnees
 * @param {*} callback la fonctions callback
 */

function getDatas(url, callback) {
    $.get(url, function (data) {
        if (data.state) {
            callback(true, data);
        } else {
            callback(false, data);
        }
    });
}

/**
 * Tester si un objet littérale contient des clés à valeur vide
 * @param {ObjectConstructor} object L'objet à tester
 */
const notEmpty = object => {
    let flag = false;

    for (const value in object) {

        if (object[value] !== "" && object.hasOwnProperty(value)) {
            flag = true;
        } else {
            flag = false;
            break;
        }
    }

    return flag;
}

/**
 * 
 * @param {*} text Le text a decoupé
 * @param {*} delimit La delimitation
 */
const sliceText = (text, delimit) => {
    if (text.length > delimit) {
        return text.substring(0, delimit) + '...';
    } else {
        return text;
    }
}

/**
 * Modelisation de la date
 * @param {*} date La date
 */
const  customDate = (date) => {
    var myDate = new Date(date),
        jour = function () {

            return parseInt(myDate.getDate()) < 10 ? '0' + myDate.getDate() : myDate.getDate();
        },
        mois = function () {

            //return myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
            var month = myDate.getMonth() + 1;

            //La date par rapport à sa nomination
            switch (month) {
                case 1:
                    return 'janvier';
                case 2:
                    return 'février';
                case 3:
                    return 'mars';
                case 4:
                    return 'avril';
                case 5:
                    return 'mai';
                case 6:
                    return 'juin';
                case 7:
                    return 'juillet';
                case 8:
                    return 'août';
                case 9:
                    return 'septembre';
                case 10:
                    return 'octobre';
                case 11:
                    return 'novembre';
                case 12:
                    return 'décembre';
                default:
                    return null;
            }
        },
        heure = function () {

            return myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();

        },
        minute = function () {

            return myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();

        };

    return jour() + ' ' + mois() + ' ' + myDate.getFullYear() + ' à ' + heure() + ' h ' + minute() + "'";
}

/**
 * Fonction renvoyant le loader par rapport au type de la requete
 * @param {*} type Le type de la requete
 */
const loader =  (type) => {
    if (type == "get") {
        return `<div class="loadingio-spinner-spinner-m9n4n59uta"><div class="ldio-xy9pts5xfn">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div></div>`;
    } else if(type == "post") {
        return `<div class="sbl-circ"></div>`;
    }
}

/**
 * Renvoi le message alert
 * @param {*} message Le message a affiché
 * @param {*} type Le type de message, soit danger ou success, etc
 */
function alertMessage(message, type) {
    return `
    <div class="alert alert-${type} alert-dismissible mb-2" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <div class="d-flex align-items-center">
            <span>
                ${message}
            </span>
        </div>
    </div>`;
}

/** Retourne l'avatar par defaut */
function defaultAvatar() {
    return `/images/blank-profile-picture-973460_640.png`;
}

export { defaultAvatar, getDatas,customDate, sliceText, loader, postForm, alertMessage, notEmpty } 