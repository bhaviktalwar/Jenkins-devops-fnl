let tasks = [];

exports.createTask = (task) => {
    tasks.push(task);
    return task;
};

exports.getTasks = () => tasks;

exports.updateTask = (id, task) => {
    tasks[id] = task;
};

exports.deleteTask = (id) => {
    tasks.splice(id, 1);
};