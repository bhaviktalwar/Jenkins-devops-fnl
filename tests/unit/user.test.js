const userModel = require('../../src/models/userModel');

describe('User Model Unit Tests', () => {

    test('Create user', () => {
        const user = userModel.createUser({ username: "u1", password: "p1" });
        expect(user.username).toBe("u1");
    });

    test('Find user success', () => {
        userModel.createUser({ username: "u2", password: "p2" });
        const user = userModel.findUser("u2", "p2");

        expect(user).toBeDefined();
    });

    test('Find user fail', () => {
        const user = userModel.findUser("wrong", "wrong");
        expect(user).toBeUndefined();
    });

});