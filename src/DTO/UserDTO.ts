import { IUser } from "../MODELS/User";

export interface UserDTO{
    username: string,
    email: string,
    password: string,
    role: string,
}

export interface UserRegisterDTO{
    username: string,
    email: string,
    password: string
}

export interface UserLoginDTO{
    password: string,
    email: string

}

export interface IUserRepository{

    save(body: UserRegisterDTO, role: string): Promise<IUser>;

    login(body: UserLoginDTO): Promise<IUser>;

    retrieveUserById(id:number): Promise<IUser>

}