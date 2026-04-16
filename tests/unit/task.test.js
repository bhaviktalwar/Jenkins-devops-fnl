const taskModel = require('../../src/models/taskModel');

describe('Task Model Unit Tests', () => {

    test('Create task', () => {
        const task = taskModel.createTask({ title: "Test Task" });
        expect(task.title).toBe("Test Task");
    });

    test('Get tasks', () => {
        const tasks = taskModel.getTasks();
        expect(Array.isArray(tasks)).toBe(true);
    });

});