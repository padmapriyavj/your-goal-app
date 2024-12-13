var goalModel = require('../models/goal.model');

module.exports.getDataFromDBService = async () => {
    try {
        const goals = await goalModel.find({});
        return goals; 
    } catch (error) {
        console.error('Error fetching goals:', error);
        return null; 
    }
};

module.exports.createGoalDBService = async (goalDetails) => {
    try {
        var goalModelData = new goalModel();

        goalModelData.targetGoal = goalDetails.targetGoal;
        goalModelData.startWeight = goalDetails.startWeight;
        goalModelData.startDate = goalDetails.startDate;
        goalModelData.endDate = goalDetails.endDate;
        goalModelData.status = goalDetails.status;

        await goalModelData.save(); 
        return true; 
    } catch (error) {
        console.error('Error saving goal:', error);
        return false; 
    }
};

module.exports.updateGoalDBService = async (id, goalDetails) => {
    try {
        console.log(goalDetails);

        const updatedGoal = await goalModel.findByIdAndUpdate(id, goalDetails, { new: true });

        if (!updatedGoal) {
            return false; 
        }

        return true; 
    } catch (error) {
        console.error('Error updating goal:', error);
        return false; 
    }
};

module.exports.deleteGoalDBService = async (id) => {
    try {
        
        const deletedGoal = await goalModel.findByIdAndDelete(id);

        if (!deletedGoal) {
            return false; 
        }

        return true; 
    } catch (error) {
        console.error('Error deleting goal:', error);
        return false; 
    }
};
