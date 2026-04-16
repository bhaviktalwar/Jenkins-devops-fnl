const request = require('supertest');
const app = require('../../src/app');

describe('API Integration Tests', () => {

    test('Health check', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
    });

    test('Register user', async () => {
        const res = await request(app)
            .post('/users/register')
            .send({ username: "test", password: "123" });

        expect(res.statusCode).toBe(201);
    });

    test('Login user', async () => {
        await request(app).post('/users/register').send({ username: "a", password: "1" });

        const res = await request(app)
            .post('/users/login')
            .send({ username: "a", password: "1" });

        expect(res.statusCode).toBe(200);
    });

    test('Create task', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ title: "Task1" });

        expect(res.statusCode).toBe(201);
    });

    test('Get tasks', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toBe(200);
    });
test('Login fail (wrong credentials)', async () => {
    const res = await request(app)
        .post('/users/login')
        .send({ username: "wrong", password: "wrong" });

    expect(res.statusCode).toBe(401);
});

test('Create task without title (validation)', async () => {
    const res = await request(app)
        .post('/tasks')
        .send({});

    expect(res.statusCode).toBe(400);
});

test('Update task', async () => {
    await request(app).post('/tasks').send({ title: "Old Task" });

    const res = await request(app)
        .put('/tasks/0')
        .send({ title: "Updated Task" });

    expect(res.statusCode).toBe(200);
});

test('Delete task', async () => {
    await request(app).post('/tasks').send({ title: "Delete Task" });

    const res = await request(app)
        .delete('/tasks/0');

    expect(res.statusCode).toBe(200);
});

});