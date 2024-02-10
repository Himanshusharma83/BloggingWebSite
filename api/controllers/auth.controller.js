import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt  from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All Fields are required"));
  }

  const hasedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hasedPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "signup Completed" });
  } catch (error) {
    next(error);
  }
};


export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler("all field are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not Found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid password"));
    }

    const token = Jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET
    );

    const {password:pass,...rest} = validUser._doc

    res.status(200).cookie('access_token', token, {
      httpOnly: true
    }).json(rest);

  } catch (error) {
    next(error);
  }
};

