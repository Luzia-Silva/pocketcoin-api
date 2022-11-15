import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../database/schemas/User";
import jwt from "jsonwebtoken";
class UserController {
  async create(request: Request, response: Response) {
    const { name, surname, category, amount, email, password } = request.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return response.status(400).json({
          error: true,
          message: "User already exists"
        });
      }
      const user = await User.create({
        name,
        surname,
        category,
        email,
        password
      });
      return response.json(user);
    } catch (error) {
      return response.status(500).send({
        error: true,
        message: "Registration failed"
      });
    }
  }
  async auth(request: Request, response: Response) {
    const { email, password } = request.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (comparePassword) {
          const secret = process.env.SECRET;
          const token = jwt.sign(
            {
              _id: user._id
            },
            String(secret)
          );

          response
            .status(200)
            .json({ message: "authentication performed successfully", token });
        } else {
          response
            .status(400)
            .json({ error: true, message: "Invalid Password" });
        }
      } else {
        response
          .status(401)
          .json({ error: true, message: "User does not exist" });
      }
    } catch (error) {
      return response.status(500).send({
        error: error,
        message: "error in backend"
      });
    }
  }
  async delete(request: Request, response: Response) {
    const { _id } = request.params;
    try {
      const userExists = await User.findOne({ _id });
      if (!_id) {
        return response.status(400).json({
          error: true,
          message: "This record does not exist"
        });
      }
      const user = await User.deleteOne({
        _id
      });
      return response.json(user);
    } catch (error) {
      return response.status(500).send({
        error: true,
        message: "This error in application"
      });
    }
  }

  async find(request: Request, response: Response) {
    const { name, surname, category, email } = request.body;
    try {
      const users = await User.find();
      return response.json(users);
    } catch (error) {
      return response.status(500).send({
        error: true,
        message: "This record does not exist"
      });
    }
  }
}
export default new UserController();
