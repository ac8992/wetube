import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", { useNewUrlParser: true, useUnifiedTopology: true });

const handleOpen = () => console.log("Connected to DB");
const handleError = () => console.log("DB Error");

mongoose.connection.on("error", handleError);
mongoose.connection.once("open", handleOpen);