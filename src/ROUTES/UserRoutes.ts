import {Router} from "express";
import { Login, Register, getUser } from "../SERVICE/UserService";

const route = Router()

route.post("/register/:role", Register);
route.post("/login", Login);
route.get("/user", getUser);


export const AuthRoutes = route;