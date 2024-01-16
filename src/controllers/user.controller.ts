import { Request, Response } from "express";
import { createUser, getUserByEmail, getUsers } from "../db/models/user";
import {
  check_password,
  getHashedPassword,
  random,
} from "../auth/hashers/hash";
import { authenticate } from "../auth/index";
import EnvData from "../config/data/env-data";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please provied all the fields" });
    }
    const existing_user = await getUserByEmail(email);
    if (existing_user) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: getHashedPassword(salt, password),
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Registration failed. Please try again." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please proved both email and password" });
    }
    const existing_user = await getUserByEmail(email);
    if (!existing_user) {
      return res
        .status(400)
        .json({ error: "Email and password did not match" });
    }
    if (
      check_password(
        password,
        existing_user.authentication?.password!,
        existing_user.authentication?.salt!
      )
    ) {
      const user = await authenticate(email, password);
      if (user === null) {
        return res
          .status(400)
          .json({ error: "Email and password did not match" });
      }
      const salt = random();
      user.authentication!.sessionToken = await getHashedPassword(
        salt,
        user._id.toString()
      );
      await user.save();
      res.cookie(EnvData.COOKIE_KEY, user.authentication?.sessionToken!, {
        domain: "localhost",
        path: "/",
      });
      return res.status(200).json(user);
    }
    return res.status(400).json({ error: "Email and password did not match" });
  } catch (error) {
    return res.status(400).json({ error: "Login failed. Please try again." });
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: "Login failed. Please try again." });
  }
};