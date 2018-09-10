/* In case if user reloads /show/:id URI */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = require('../models/Task');

router.get('/:id', (req, res, next) => {
    Task.findById(req.params.id, function (err, task) {
        if (err) {
            return next(err);
        }
        res.json(task);
    })
});

module.exports = router;