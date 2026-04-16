let users = [];

exports.createUser = (user) => {
    users.push(user);
    return user;
};

exports.findUser = (username, password) => {
    return users.find(u => u.username === username && u.password === password);
};