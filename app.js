const express = require("express");
const bodyParser = require(`body-parser`);
const app = express();

// dotenv configuration
require(`dotenv`).config();

const port = process.env.PORT || 5000;

const dbConnection = require(`./config/db`);
const taskRoutes = require(`./src/tasks/routes/task.routes`);
const userRoutes = require(`./src/users/routes/user.routes`);

// public middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//database configuration
dbConnection();

app.use(taskRoutes);
app.use(userRoutes);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
