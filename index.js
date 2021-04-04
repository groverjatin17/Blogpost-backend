import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import postsRoutes from "./routes/posts.js";

const app = express();

// common middleware to add data limit and cross origin
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//middleware for posts routes
// this code statement below states that every route inside postsRoutes file
// will start with /posts route. Eg: localhost:5000/posts
app.use("/posts", postsRoutes);

//mongoDB Atlas
const CONNECTION_URL =
    "mongodb+srv://" +
    process.env.MONGOUSER +
    ":" +
    process.env.PASSWORD +
    "@cluster0.zxmqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

// useNewUrlParser and useUnifiedTopology are used to prevent warnings in browser console.
mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server connected to Database. Running on ${PORT}`)
        )
    )
    .catch((e) => console.log(e.message));

//default settings that the creator asked to avoid warnings in the console.
mongoose.set("useFindAndModify", false);
