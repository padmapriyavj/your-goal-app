
var goalService = require('../services/goal.service')


var createGoalControllerFn = async (req, res) => 
    {
        console.log(req.body);
        
        var status = await goalService.createGoalDBService(req.body);
        if (status) {
            res.send({ "status": true, "message": "goal created successfully" });
        } else {
            res.send({ "status": false, "message": "Error creating goal" });
        }
    }

    var updateGoalController = async (req, res) => {
        console.log('Request Params:', req.params);
        console.log('Request Body:', req.body)
    
        var result = await goalService.updateGoalDBService(req.params.id, req.body);
        if (result) {
            res.send({ "status": true, "message": "Goal Updated" });
        } else {
            res.send({ "status": false, "message": "Goal Update Failed" });
        }
    };
    
var getDataControllerfn = async (req,res) =>
{
    var goal = await goalService.getDataFromDBService();
    res.send({"status":true, "data":goal});
}

var deleteGoalController = async (req, res) => {
    console.log(req.params.id);

    var result = await goalService.deleteGoalDBService(req.params.id);
    if (result) {
        res.send({ "status": true, "message": "Goal Deleted" });
    } else {
        res.send({ "status": false, "message": "Goal Deletion Failed" });
    }
};



module.exports = { getDataControllerfn, createGoalControllerFn, updateGoalController, deleteGoalController};