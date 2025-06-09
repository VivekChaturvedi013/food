import { Router } from "express";import { Sample_Users } from "../data";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { FoodModel } from "../models/food.model";
import { UserModel } from "../models/user.model";

const router = Router()

router.get('/seed', asyncHandler(
  async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      res.send('seed is already done');
    }
    await UserModel.create(Sample_Users);
    res.send("seed is done");
}

) );

router.post("/login", (req, res) => {
    
    const { email, password } = req.body;
    const user = Sample_Users.find(user =>
        user.email === email && user.password === password
    );
    if (user) {
        res.send(generatTokenResponse(user));
    } else {
        res.status(401).send({ message: "Invalid email or password" });
    }
    // This is a placeholder for user login logic
    // In a real application, you would validate user credentials here
    res.send({ message: "Login successful" });
});

const generatTokenResponse = (user:any) => {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, 'vivek', {
        expiresIn: '30d' // Token expiration time
    })

    user.token = token;
    return user;

}

export default router;