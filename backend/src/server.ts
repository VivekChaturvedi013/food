import express, { json } from 'express';
import cors from 'cors';
import foodRouter from './routers/food.router'
import userRouter from './routers/user.router';
import dotenv from 'dotenv';
dotenv.config();
import { dbconnect } from './configs/database.config';

dbconnect();

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors(
    {
        credentials: true,
        origin: ["http://localhost:4200"]
    }
));

app.use("/api/foods", foodRouter)
app.use("/api/users", userRouter)

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});