import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js"
import UplaodRoute from "./Routes/UplaodRoute.js"
const app = express();

app.use(express.static("public"))
app.use("/images",express.static("images"))


app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

dotenv.config()
mongoose.connect(process.env.MONGO_DB,
).then(
    () => app.listen(process.env.PORT, () => console.log("listening ..."))
).catch((e) => console.log(e))



app.use("/auth", AuthRoute)
app.use("/user", UserRoute)
app.use("/post", PostRoute)
app.use("/upload", UplaodRoute)