import express from "express";
import env from "dotenv";
import goalRoute from "./Routes/goalRoute.js";
import userRoute from "./Routes/userRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import colors from "colors";
import connectDB from "./config/db.js";
import path from "path";

//app config
const dotenv = env.config();
const port = process.env.PORT || 8000;
const app = express();

//db config
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", goalRoute);
app.use("/api/users", userRoute);

// //serve production
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static())
// }

app.use(errorHandler);

//api listners

//port listners
app.listen(port, () => console.log(`server started on ${port}`));
