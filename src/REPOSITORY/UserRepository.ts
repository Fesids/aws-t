import { values } from "lodash";
import { MysqlPool } from "../DATABASE/MySQLDBConnect";
import { IUserRepository, UserDTO, UserLoginDTO, UserRegisterDTO } from "../DTO/UserDTO";
import { IUser } from "../MODELS/User";
import bcrypt from "bcryptjs";

export class UserRepository implements IUserRepository{

    async retrieveUserById(id: number): Promise<IUser> {

        let q = "select * from users where id=?";

        const user = await MysqlPool.query<IUser[]>(q, id);

        if(!user){
            throw new Error("User not found! check your credentials");
        }


        return user[0][0];

    }

    async login(body: UserLoginDTO): Promise<IUser> {
        let q = "select * from users where email=?";

        const user = await MysqlPool.query<IUser[]>(q, body.email);

        if(!user){
            throw new Error("User not found! check your credentials");
        }

        const isPasswordCorrect = bcrypt.compareSync(body.password, user[0][0].password);

        if(!isPasswordCorrect){
            throw new Error("Password is incorrect! please, check your password");
        }

        return user[0][0];
        
    }


    async save(body: UserRegisterDTO, role:string): Promise<IUser> {
        let q = "select * from users where email=? or username=?";

        let [rows] = await MysqlPool.query<IUser[]>(q, [body.email, body.username])
        
        if(rows.length){
            throw new Error("A User with this credentials already exist");
        }

        q = "insert into users(username, email, password, role) values(?, ?, ?, ?)";
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(body.password, salt);

        const saveBody = [
            body.username,
            body.email,
            hashPassword,
            role

        ]

        await MysqlPool.query<IUser[]>(q, saveBody);
        q = "select * from users where email=?";
        const email = body.email;
        const res = await MysqlPool.query<IUser[]>(q, email);

        return res[0][0];

    
    }
    
}