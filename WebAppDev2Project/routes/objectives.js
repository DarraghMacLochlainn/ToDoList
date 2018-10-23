var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Objective = require('../models/objectives');


//GET

//POST objectives to users
router.addObjective = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var objective = new Objective();
    User.findById(req.params._id, function (err, user) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            var todo_id = Math.floor((Math.random() * 1000000) + 1);
            objective.todo_id = todo_id,
                objective.time = req.body.time,
                objective.location = req.body.location,
                objective.likes = 0,
                objective.goal = req.body.goal

            user.objectives.push(objective);
            objective.save(function (err) {
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
    });
}


//PUT change objective time
router.changeTime = (req, res) => {
    Objective.findById(req.params._id, function (err, objective) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            objective.time = req.body.time;
            objective.save(function (err) {
                if (err)
                    res.send(JSON.stringify(err, null, 5));
                else
                    res.send(JSON.stringify({Message: "Time Change Successful", objective}, null, 5));
            });
        }
    });
}


//PUT change objective goal
router.changeGoal = (req, res) => {
    Objective.findById(req.params._id, function (err, objective) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            objective.goal = req.body.goal;
            objective.save(function (err) {
                if (err)
                    res.send(JSON.stringify(err, null, 5));
                else
                    res.send(JSON.stringify({Message: "Goal Change Successful", objective}, null, 5));
            });
        }
    });
}

//PUT change objective location
router.changeLocation = (req, res) => {
    Objective.findById(req.params._id, function (err, objective) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            objective.location = req.body.location;
            objective.save(function (err) {
                if (err)
                    res.send(JSON.stringify(err, null, 5));
                else
                    res.send(JSON.stringify({Message: "Location Change Successful", objective}, null, 5));
            });
        }
    });
}

//PUT like objective
router.likeObjective = (req, res) => {

    Objective.findById(req.params._id, function (err, objective) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            objective.likes += 1;
            objective.save(function (err) {
                if (err)
                    res.send(JSON.stringify(err, null, 5));
                else
                    res.send(JSON.stringify({Message: "Like Successful", objective}, null, 5));
            });
        }
    });
}


//DELETE objective
//todo
router.deleteObjective = (req, res) => {
    //Delete the selected user based on its id
    // First, find the relevant user to delete
    // Next, find it's position in the list of users
    User.findById(req.params._id, function (err, user) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else
            for (let objective in user.objectives) {
                if(objective.todo_id == req.params.todo_id){
                    user.objectives.pop(objective);
                }
            }
    });
}

module.exports = router;
