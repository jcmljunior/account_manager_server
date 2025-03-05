import bcrypt from "bcrypt";
import { Request, Response } from 'express';
import UserModel from "../models/userModel";
import { createUser, getUser, UserResult } from "../repositories/accountRepository";

const SALT_ROUNDS = 10;

const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios!');
    }

    const hashedPassword = await bcrypt.hash(password.toString(), SALT_ROUNDS);

    const user = new UserModel({
      email: email.toString(),
      password: hashedPassword.toString(),
      isVerified: false,
    });

    const result: UserResult = await createUser(user);

    res.status(result.statusCode).send(result);
  } catch (error: any) {
    res.status(400).send({
      statusCode: 400,
      message: error.message
    });
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios!');
    }

    const hashedPassword = await bcrypt.hash(password.toString(), SALT_ROUNDS);

    const user = new UserModel({
      email: email.toString(),
      password: password.toString(),
      isVerified: false,
    });

    const result = await getUser(user);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      statusCode: 400,
      message: error.message
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      throw new Error('Email é senha são obrigatórios!');
    }

    const user = new UserModel({
      email: email.toString(),
      password: password.toString(),
    });
    const result: UserResult = await createUser(user);

    res.status(result.statusCode).send(result);
  } catch (error: any) {
    res.status(400).send({
      statusCode: 400,
      message: error.message
    })
  }
};

export default {
  signup,
  signin,
  deleteUser
}
