let users = require('../models/users');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

function getByUserValue(array, id) {
    var result = array.filter(function (obj) {
        return obj.user_id == id;
    });
    return result ? result[0] : null; // or undefined
}

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
    res.send(JSON.stringify(users, null, 5));
}

router.findOne = (req, res) => {
    var user = getByValue(users, req.params.user_id);

    if (user != null) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(user, null, 5));
    } else {
        res.json("Error: ID not found");
    }
}

//GET all users WITHOUT thier objectives
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
    //Add a new user to our list
    var user_id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    var todo_id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    var currentSize = users.length;

    users.push({
        "user_id": user_id, "username": req.body.username, "objectives": [
            {"todo_id": todo_id, "time": req.body.time, 'likes': 0, "goal": req.body.goal}]
    });

    if ((currentSize + 1) == users.length)
        res.json({message: 'User Added!'});
    else
        res.json({message: 'User NOT Added!'});
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
//app.put('/users/:user_id/newName', users.changeUsername);

//PUT change objective time
//app.put('/users/:todo_id/newTime', users.changeTime);

//PUT change objective goal
//app.put('/users/:todo_id/newGoal', users.changeGoal);

//PUT change objective location
//app.put('/users/:todo_id/newLocation', users.changeLocation);

//PUT like objective
//app.put('/users/:todo_id/support', users.likeObjective);

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
    var currentSize = users.length;
    var user = getByUserValue(users, req.params.user_id);
    if (user == null) {
        res.send("Error: ID Not Found");
    } else {
        var index = users.indexOf(user);
        // Then use users.splice(index, 1) to remove it from the list
        users.splice(index, 1);

        // Return a message to reflect success or failure of delete operation
        if ((currentSize - 1) == users.length)
            res.json({message: 'User Deleted!'});
        else
            res.json({message: 'User NOT Deleted!'});
    }
}

module.exports = router;
