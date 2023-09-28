import { HttpRequest, HttpResponse, IController } from "../DTO/ComunProtocols";
import { IUserRepository, UserLoginDTO } from "../DTO/UserDTO";
import { IUser } from "../MODELS/User";
import { badRequest, ok } from "../UTILS/Helper";
import jwt from "jsonwebtoken";

export class LoginController implements IController{
    constructor(private readonly userRepository:IUserRepository){}
    async handle(httpRequest: HttpRequest<UserLoginDTO>): 
    Promise<HttpResponse<IUser | string>> {

        try{
            const user = await this.userRepository.login(httpRequest.body);
            const user_id = user.id;
            const role = user.role
            const authenticationToken = jwt.sign({user_id, role}, "jwtkey")
            return ok(authenticationToken);
        }catch(err){
            return badRequest("Failed to login")
        }
       
    }
    
}