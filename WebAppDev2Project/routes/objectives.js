var express = require('express');
var router = express.Router();
var Objective = require('../models/objectives');


//GET
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    Objective.find(function (err, objectives) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            res.send(JSON.stringify(objectives, null, 5));
        }
    });
}

router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Objective.find({"_id": req.params.id}, function (err, objective) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else
            res.send(JSON.stringify(objective, null, 5));
    });
}

router.findObjectives = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Objective.find({"user_id": req.params.user_id}, function (err, objective) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else
            res.send(JSON.stringify(objective, null, 5));
    });
}

//get all for 1 user

//POST objectives to users
router.addObjective = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let objective = new Objective();

    objective.goal = req.body.goal,
        objective.user_id = req.body.user_id,
        objective.time = req.body.time,
        objective.location = req.body.location


    objective.save(function (err) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else
            res.send(JSON.stringify(objective, null, 5));
    });
}


//PUT change objective time
router.changeTime = (req, res) => {
    Objective.findById(req.params._id, function (err, objective) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            try {
                objective.time = req.body.time;

                objective.save(function (err) {
                    if (err)
                        res.send(JSON.stringify(err, null, 5));
                    else
                        res.send(JSON.stringify({Message: "Location Change Successful", objective}, null, 5));
                });
            }
            catch (err) {
                res.send(JSON.stringify({Message: "Could not find time, check _id used", err}, null, 5));
            }
        }
    });
}


//PUT change objective goal
router.changeGoal = (req, res) => {
    Objective.findById(req.params._id, function (err, objective) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            try {
                objective.goal = req.body.goal;

                objective.save(function (err) {
                    if (err)
                        res.send(JSON.stringify(err, null, 5));
                    else
                        res.send(JSON.stringify({Message: "Location Change Successful", objective}, null, 5));
                });
            }
            catch (err) {
                res.send(JSON.stringify({Message: "Could not find time, check _id used", err}, null, 5));
            }
        }
    });
}

//PUT change objective location
router.changeLocation = (req, res) => {
    Objective.findById(req.params._id, function (err, objective) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            try {
                objective.location = req.body.location

                objective.save(function (err) {
                    if (err)
                        res.send(JSON.stringify(err, null, 5));
                    else
                        res.send(JSON.stringify({Message: "Location Change Successful", objective}, null, 5));
                });
            }
            catch (err) {
                res.send(JSON.stringify({Message: "Could not find location, check _id used", err}, null, 5));
            }
        }
    });
}

//PUT like objective
router.likeObjective = (req, res) => {

    Objective.findById(req.params._id, function (err, objective) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            try {
                objective.likes = likes + 1

                objective.save(function (err) {
                    if (err)
                        res.send(JSON.stringify(err, null, 5));
                    else
                        res.send(JSON.stringify({Message: "Likes Increase Successful", objective}, null, 5));
                });
            }
            catch (err) {
                res.send(JSON.stringify({Message: "Could not find likes, check _id used", err}, null, 5));
            }
        }
    });
}


//DELETE objective
router.deleteObjective = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Objective.findByIdAndRemove(req.params._id, function (err) {
        if (err)
            res.send(JSON.stringify({message: 'To Do Not Deleted', err}, null, 5));
        else
            res.send(JSON.stringify({Message: "To DO Deleted"}, null, 5));
    });
}

module.exports = router;
