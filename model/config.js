const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
//mongoose.connect('mongodb://localhost:27017/review_rating');
mongoose.connect("mongodb://127.0.0.1:27017/blogApp",
    {
        useNewUrlParser: "true",
    });
mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error", err);
});

mongoose.connection.on("connected", (err, res) => {
    console.log("Mongoose is connected");
});

