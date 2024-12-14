


var express = require('express');

const router = express.Router();

var goalController =  require('../controller/goal.controller');
const authRoutes = require('./auth.routes'); // New auth routes

console.log('goalController:', goalController);

router.route('/goal/getAll').get(goalController.getDataControllerfn);

router.route('/goal/create').post(goalController.createGoalControllerFn);

router.route('/goal/update/:id').patch(goalController.updateGoalController);

router.route('/goal/delete/:id').delete(goalController.deleteGoalController);

router.use('/auth', authRoutes);
module.exports = router;