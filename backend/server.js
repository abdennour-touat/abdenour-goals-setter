// calling express to run the server
const express = require("express");
//to hide our sensitive informations
const dotenv = require("dotenv").config();
// to make the log looks better
const colors = require("colors");
//calling our custom error handler
const { errorHandler } = require("./middleware/errorMiddleware");
//calling our function to connect with our database
const connectDB = require("./config/db");
//if we're in production the we'll use another port
const port = process.env.PORT || 5000;

connectDB();
const app = express();
//to enable json in the post methods
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//calling the goals route
app.use("/api/goals", require("./routes/goalRoutes"));
//calling the users route
app.use("/api/users", require("./routes/usersRoutes"));
//using our error handler
app.use(errorHandler);

//starting the server
app.listen(port, () => console.log(`Server started on port ${port}`.green));
