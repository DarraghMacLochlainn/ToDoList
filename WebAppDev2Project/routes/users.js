let users = require('../models/users');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function getByValue(array, id) {
    var result = array.filter(function (obj) {
        return obj.user_id == id;
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
    }else {
        res.json("Error: ID not found");
    }
}

//GET all users WITHOUT thier objectives
//findAllUsers
//findOneUsers

//Get all objectives without the users
//findAllObjectives
//findOneObjective

//POST user and objective
router.addUserAndObjective = (req, res) => {
    //Add a new user to our list
    var user_id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    var todo_id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    var currentSize = users.length;

    users.push({"user_id": user_id, "username": req.body.username, "objectives":[
        {"todo_id": todo_id, "time": req.body.time, 'likes': 0, "goal": req.body.goal}]});

    if((currentSize + 1) == users.length)
        res.json({ message: 'User Added!'});
    else
        res.json({ message: 'User NOT Added!'});
}

//POST user without objective
//addUser

//POST objectives to users
//app.post('/users', users.addObjective);

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
//app.delete('/users/:todo_id', users.deleteObjective);

//DELETE User and Objectives
router.deleteUser = (req, res) => {
    //Delete the selected user based on its id

    // First, find the relevant user to delete
    // Next, find it's position in the list of users
    var currentSize = users.length;
    var user = getByValue(users, req.params.id);
    if(user == null){
        res.send("Error: ID Not Found");
    }else {
        var index = users.indexOf(user);
        // Then use users.splice(index, 1) to remove it from the list
        users.splice(index, 1);

        // Return a message to reflect success or failure of delete operation
        if((currentSize - 1) == users.length)
            res.json({ message: 'User Deleted!'});
        else
            res.json({ message: 'User NOT Deleted!'});    }
}

module.exports = router;
