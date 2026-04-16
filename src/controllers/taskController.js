const taskModel = require('../models/taskModel');

exports.create = (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).send("Title required");
    }

    taskModel.createTask({ title });
    res.status(201).send("Task created");
};

exports.getAll = (req, res) => {
    res.json(taskModel.getTasks());
};

exports.update = (req, res) => {
    taskModel.updateTask(req.params.id, req.body);
    res.send("Task updated");
};

exports.delete = (req, res) => {
    taskModel.deleteTask(req.params.id);
    res.send("Task deleted");
};