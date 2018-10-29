let express = require('express');
let router = express.Router();
let User = require('../models/users');
var Objective = require('../models/objectives');

//GET all users
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    User.find(function (err, users) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            res.send(JSON.stringify(users, null, 5));
        }
    });
}

router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    User.find({"_id": req.params.id}, function (err, user) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else
            res.send(JSON.stringify(user, null, 5));
    });
}

//get all users and their objectives
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    User.find(function (err, users) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            res.send(JSON.stringify(users, null, 5));
        }
    });
}

//get 1 user and their objectives
router.findUserAndObjectives = (req, res) => {
    var users = {};
    var objectives = [];
    User.find({"_id": req.params.id}, function (err, usersArr) {
        if (err) {
            console.log(err);
        } else {
            users = usersArr;
        }
    });

    Objective.find({'user_id': req.params.id}, function (err, objectivesArrs) {
        if (err) {
            console.log(err);
        } else {
            objectives = objectivesArrs;
            res.send(JSON.stringify({users: users, objectives: objectives}, null, 5));
        }
    });
}

//POST user
router.addUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var user = new User();

    user.username = req.body.username,
        user.email = req.body.email,
        user.password = req.body.password

    user.save(function (err) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else
            res.send(JSON.stringify(user, null, 5));
    });
}

//PUT change user name

router.changeUsername = (req, res) => {
    User.findById(req.params._id, function (err, user) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            try {
                user.username = req.body.username;
                user.save(function (err) {
                    if (err)
                        res.send(JSON.stringify(err, null, 5));
                    else
                        res.send(JSON.stringify({Message: "Name Change Successful", user}, null, 5));
                });
            }
            catch (err) {
                res.send(JSON.stringify({Message: "Could not find username, check _id used", err}, null, 5));
            }
        }
    });
}

router.changeUserPassword = (req, res) => {
    User.findById(req.params._id, function (err, user) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            try {
                user.password = req.body.password;
                user.save(function (err) {
                    if (err)
                        res.send(JSON.stringify(err, null, 5));
                    else
                        res.send(JSON.stringify({Message: "Password Change Successful", user}, null, 5));
                });
            }
            catch (err) {
                res.send(JSON.stringify({Message: "Could not find username, check _id used", err}, null, 5));
            }
        }
    });
}

router.changeUserEmail = (req, res) => {
    User.findById(req.params._id, function (err, user) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            try {
                user.email = req.body.email;
                user.save(function (err) {
                    if (err)
                        res.send(JSON.stringify(err, null, 5));
                    else
                        res.send(JSON.stringify({Message: "Email Change Successful", user}, null, 5));
                });
            }
            catch (err) {
                res.send(JSON.stringify({Message: "Could not find username, check _id used", err}, null, 5));
            }
        }
    });
}


//DELETE User and Objectives
router.deleteUser = (req, res) => {
    //Delete the selected user based on its id
    // First, find the relevant user to delete
    // Next, find it's position in the list of users
    User.findByIdAndRemove(req.params._id, function (err) {
        if (err)
            res.send(JSON.stringify({message: 'User Not Deleted', err}, null, 5));
        else
            res.send(JSON.stringify({message: 'User Deleted. Associated To-DOs Not Deleted, Must Be Deleted Individually', err}, null, 5));
    });
}

module.exports = router;
