import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        //generating hashing method here
        const salt = bcrypt.genSaltSync(10);
        //and now we use this function to encrypt our password
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
      //search the user by username in db
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found!"));

      //compare the password from db and by user
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or username!"));

      //generate the token for login
    //basically token will store all the info of user and check the weather the user is admin or not
       const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin },process.env.JWT);

      const { password, isAdmin, ...otherDetails } = user._doc; //doc is because we described a auth model inside user model
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
       }
};
