const express = require('express');
const app = express();

app.use(express.json());

// Logging middleware (monitoring)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Health
app.get('/health', (req, res) => res.send("OK"));

// Metrics
app.get('/metrics', (req, res) => {
    res.json({ uptime: process.uptime() });
});

// Routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

const PORT = 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;