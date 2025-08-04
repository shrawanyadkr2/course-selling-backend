const express = require('express');
const app = express();

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { mongo, default: mongoose } = require('mongoose');

app.use("api/v1/user", userRouter);
app.use("api/v1/course", courseRouter);
app.use("api/v1/admin", adminRouter);

async function main() {
    await mongoose.connect("mongodb+srv://admin:ftc5w1ttoyEOAWDV@cluster0.uyjza.mongodb.net/coursera-app");

    app.listen(3000);

    console.log("app is listening and connected as well");

}

main();



