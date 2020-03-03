const express = require("express");
const {json, urlencoded} = require('body-parser');
const app = express();

app.use(urlencoded({extended: false}));
app.use(json());


let user = {
    name: '',
    surname: ''
};

let response = {
    error: false,
    code: 200,
    message: 'ok'
};

app.get('/', function(req, res) {
    response = {
        error: false,
        code: 200,
        message: '[GET] entry point'
    };
    res.send(response);
});

app.route('/user')
    .get(function (req, res) {
        if (user.name === '' || user.surname === '') {
            response = {
                error: true,
                code: 501,
                message: "[GET] user route. User does not exist."
            };
        }
        else {
            response = {
                error: false,
                code: 200,
                message: "[GET] user route. User exists."
            }
        }
        res.send(response);
    })
    .post(function (req, res) {
        user = {
            name: req.body.name,
            surname: req.body.surname
        }
    });

app.listen(3000, () => {
    console.log("Server running on port 3000");
});