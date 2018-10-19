var express = require('express');
var router = express.Router();
var User = require('../models/users');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


function getByObjectiveValue(array, id) {
    var result = array.filter(function (obj) {
        return obj.todo_id == id;
    });
    return result ? result[0] : null; // or undefined
}

//GET all users and their objectives
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    User.find(function (err, users) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(users, null, 5));
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

//GET all users WITHOUT their objectives
router.findAllUsers = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    let response = [];
    for (let i = 0; i < users.length; i++) {
        response.push({"user_id": users[i].user_id, "username": users[i].username});
    }
    res.send(JSON.stringify(response, null, 5));
}
router.findOneUser = (req, res) => {
    var user = getByValue(users, req.params.user_id);

    if (user != null) {
        res.setHeader('Content-Type', 'application/json');
        let response = [{"user_id": user.user_id, "username": user.username}];
        res.send(JSON.stringify(response, null, 5));
    } else {
        res.json("Error: ID not found");
    }
}

//Get all objectives without the users
router.findAllObjectives = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    let response = [];
    for (let i = 0; i < users.length; i++) {
        response.push(users[i].objectives)
    }
    res.send(JSON.stringify(response, null, 5));
}

router.findOneObjective = (req, res) => {
    var user = getByValue(users, req.params.user_id);

    if (user != null) {
        res.setHeader('Content-Type', 'application/json');
        let response = user.valueOf().objectives;
        res.send(JSON.stringify(response, null, 5));
    } else {
        res.json("Error: ID not found");
    }
}

//POST user and objective
router.addUserAndObjective = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var user = new User();

    user.username = req.body.username,
        user.objectives = [{
            todo_id: req.body.todo_id,
            time: req.body.time,
            location: req.body.location,
            likes: 0,
            goal: req.body.goal
        }]

    user.save(function (err) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else
            res.send(JSON.stringify(user, null, 5));
    });
}

//POST user without objective
router.addUser = (req, res) => {
    //Add a new user to our list
    var user_id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    var currentSize = users.length;

    users.push({
        "user_id": user_id, "username": req.body.username, "objectives": []
    });

    if ((currentSize + 1) == users.length)
        res.json({message: 'User Added!'});
    else
        res.json({message: 'User NOT Added!'});
}

//POST objectives to users
//app.post('/users', users.addObjective);
router.addObjective = (req, res) => {
    var user = getByValue(users, req.params.user_id);

    if (user != null) {
        var currentSize = user.objectives.length;
        var todo_id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id

        user.objectives.push({"todo_id": todo_id, "time": req.body.time, 'likes': 0, "goal": req.body.goal});
        if ((currentSize + 1) == users.length)
            res.json({message: 'User Added!'});
        else
            res.json({message: 'User NOT Added!'});
    } else {
        res.json("Error: ID not found");
    }
}


//PUT change user name
router.changeUsername = (req, res) => {
    var user = getByValue(users, req.params.user_id);

    if (user != null) {
        user.username = req.body.username;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({status: 200, message: "Change Successful", user: user}, null, 5));
    } else {
        res.json("Error: ID not found");
    }
}

//PUT change objective time
/*
router.changeTime = (req, res) => {
    for (let i = 0; i < users.length; i++) {
        var objective = getByObjectiveValue(users[i].objectives, req.params.todo_id);
        if (objective == null) {
            if (i == users.length - 1) {
                res.send("Error: ID Not Found");
            }
            else
                continue;
        } else {
            users[i].objectives.time = req.body.time;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                status: 200,
                message: "Change Successful",
                objective: users[i].objective
            }, null, 5));
        }
    }
}


//PUT change objective goal
router.changeGoal = (req, res) => {
    for (let i = 0; i < users.length; i++) {
        var objective = getByObjectiveValue(users[i].objectives, req.params.todo_id);
        if (objective == null) {
            if (i == users.length - 1) {
                res.send("Error: ID Not Found");
            }
            else
                continue;
        } else {
            users[i].objectives.goal = req.body.goal;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                status: 200,
                message: "Change Successful",
                objective: users[i].objective
            }, null, 5));
        }
    }
}

//PUT change objective location
router.changeLocation = (req, res) => {
    for (let i = 0; i < users.length; i++) {
        var objective = getByObjectiveValue(users[i].objectives, req.params.todo_id);
        if (objective == null) {
            if (i == users.length - 1) {
                res.send("Error: ID Not Found");
            }
            else
                continue;
        } else {
            users[i].objectives.location = req.body.location;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                status: 200,
                message: "Change Successful",
                objective: users[i].objective
            }, null, 5));
        }
    }
}

//PUT like objective
router.likeObjective = (req, res) => {

    User.findById(req.params._id, function(err,objective) {
        if (err)
            res.send(JSON.stringify(err, null, 5));
        else {
            objective.likes += 1;
            objective.save(function (err) {
                if (err)
                    res.send(JSON.stringify(err, null, 5));
                else
                    res.send(JSON.stringify({Message:"Like Successful",objective}, null, 5));
            });
        }
    });
}*/


//DELETE objective
router.deleteObjective = (req, res) => {
    //Delete the selected user objective based on its id

    // First, find the relevant user objective to delete
    // Next, find it's position in the list of user's objectives
    for (let i = 0; i < users.length; i++) {
        var currentSize = users[i].objectives.length;
        var objective = getByObjectiveValue(users[i].objectives, req.params.todo_id);
        if (objective == null) {
            if (i == users.length - 1) {
                res.send("Error: ID Not Found");
            }
            else
                continue;
        } else {
            var index = users[i].objectives.indexOf(objective);
            // Then use users.splice(index, 1) to remove it from the list
            users[i].objectives.splice(index, 1);
            // Return a message to reflect success or failure of delete operation
            if ((currentSize - 1) == users[i].objectives.length)
                res.json({message: 'User Deleted!'});
            else
                res.json({message: 'User NOT Deleted!'});
        }
    }
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
