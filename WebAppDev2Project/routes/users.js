let express = require('express');
let router = express.Router();
let User = require('../models/users');
let Objective = require('../models/objectives');

//GET all users and their objectives
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

//POST user and objective
//WORKING
router.addUserAndObjective = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var user = new User();
    var todo_id = Math.floor((Math.random() * 1000000) + 1);

    let objective = new Objective();

    objective.todo_id = todo_id,
        objective.time = req.body.time,
        objective.location = req.body.location,
        objective.goal = req.body.goal,
        objective.likes = 0

    user.username = req.body.username,
        user.objectives = objective;
    objective.save(function(err) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
    });
    user.save(function (err) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else
            res.send(JSON.stringify(user, null, 5));
    });
}

//POST user without objective
//WORKING
router.addUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var user = new User();
    user.username = req.body.username,
        user.objectives = [{
        }]

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
            user.username = req.body.username;
            user.save(function (err) {
                if (err)
                    res.send(JSON.stringify(err, null, 5));
                else
                    res.send(JSON.stringify({Message: "Namw Change Successful", user}, null, 5));
            });
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
            res.send(JSON.stringify({message: 'To Do Not Deleted', err}, null, 5));
        else
            res.send(JSON.stringify({Message: "To DO Deleted"}, null, 5));
    });
}

module.exports = router;
