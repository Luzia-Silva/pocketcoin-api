import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../database/schemas/User";

class UserController {
  async create(request: Request, response: Response) {
    const { name, surname, category, email, password } = request.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return response.status(400).json({
          error: "400",
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
        error: "Registration failed",
        message: error
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
          response.status(200).json({ message: "Valid password" });
        } else {
          response.status(400).json({ error: "Invalid Password" });
        }
      } else {
        response.status(401).json({ error: "User does not exist" });
      }
    } catch (error) {
      return response.status(500).send({
        error: error,
        message: "error in backend"
      });
    }
  }
  async delete(request: Request, response: Response) {
    const { email } = request.query;
    try {
      const userExists = await User.findOne({ email });
      if (!userExists) {
        return response.status(400).json({
          error: "404",
          message: "This record does not exist"
        });
      }
      const user = await User.deleteOne({
        email
      });
      return response.json(user);
    } catch (error) {
      return response.status(500).send({
        error: "This record does not exist",
        message: error
      });
    }
  }

  async find(request: Request, response: Response) {
    const { name, surname, category, email, password } = request.body;
    try {
      const users = await User.find();
      return response.json(users);
    } catch (error) {
      return response.status(500).send({
        error: "This record does not exist",
        message: error
      });
    }
  }
}
export default new UserController();
