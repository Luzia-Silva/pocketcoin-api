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
  async findOne(request: Request, response: Response) {
    const { email } = request.query;
    try {
      const users = await User.findOne({ email });
      if (!users) {
        return response.status(400).json({
          error: "406",
          message: "There is no user with this registered email"
        });
      }
      return response.json(users);
    } catch (error) {
      return response.status(500).send({
        error: "Something wrong happened, try again",
        message: error
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
