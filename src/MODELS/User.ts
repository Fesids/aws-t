import { RowDataPacket } from "mysql2";
import { UserRole } from "../ENUM/UserRole";

export interface IUser extends RowDataPacket{
    id: number,
    username: string,
    email: string,
    password: string,
    role: UserRole
}