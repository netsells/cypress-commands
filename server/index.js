const express = require('express');
const fs = require('fs');
const path = require('path');

const curryPageFile = file =>
    (req, res, next) => {
        fs.readFile(path.join(__dirname, file), (err, data) => {
            if (err) {
                next(err);
                return;
            }

            res.set('Content-Type', 'text/html');
            res.send(data);
        });
    };

express()
    .get('/fields', curryPageFile('fields.html'))
    .listen(process.env.PORT || 3000);
