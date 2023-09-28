import {Response, Request} from "express";
import { UserRepository } from "../REPOSITORY/UserRepository";
import { RegisterController } from "../CONTROLLER/RegisterController";
import { LoginController } from "../CONTROLLER/LoginController";
import { UserTokenController } from "../CONTROLLER/UserTokenController";
import {} from "jsonwebtoken";


export const getUser = async (req:Request, res:Response) =>{

    const repository = new UserRepository();

    const controller = new UserTokenController(
        repository
    );

    let token = req.header("Authorization");

    const authorization = token?.slice(7, token.length).trimStart();

    const {body, statusCode} = await controller.handle({
        headers: req.headers,
        header: authorization//req.header("Authorization")
    });

    res.status(statusCode).json(body);

}
export const Login = async (req:Request, res:Response) =>{

    const repository = new UserRepository();

    const controller = new LoginController(
        repository
    );

    const {statusCode, body} = await controller.handle({
        body: req.body
    });

    res.status(statusCode).json(body);

}

export const Register = async (req:Request, res:Response) =>{

    const userRepository = new UserRepository();

    const userController = new RegisterController(
        userRepository
    );

    const {body, statusCode} = await userController.handle({
        body: req.body,
        params: req.params
    });

    res.status(statusCode).json(body);

}