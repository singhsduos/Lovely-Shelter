import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hashedPass,
        });

        await newUser.save();
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
           
    } catch (err) {
        next(err);
       }
};
