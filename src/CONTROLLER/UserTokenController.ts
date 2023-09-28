import { HttpRequest, HttpResponse, IController } from "../DTO/ComunProtocols";
import { IUserRepository } from "../DTO/UserDTO";
import { badRequest, ok } from "../UTILS/Helper";

import jwt, {JwtPayloadUser} from "jsonwebtoken"

declare module "jsonwebtoken"{
    export interface JwtPayloadUser extends JwtPayload{
        id: number
    }
}


/*export interface CustomRequest extends Request{
    token: JwtPayloadUser | string
}*/


export class UserTokenController implements IController{
    constructor(private readonly userRepository:IUserRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<string>> {
        try{
            //const {Authorization} = httpRequest.headers;
            const Authorization = httpRequest.header;

            if(!Authorization || Authorization == null){
                return badRequest("Access denied")
            }

            const tokenInfo = <jwt.JwtPayloadUser> jwt.verify(Authorization, "jwtkey");

           const user_id = tokenInfo.user_id;

           const user = await this.userRepository.retrieveUserById(user_id);

            return ok(user);
        }catch(err){
            return badRequest("Something went wromg trying to retrieve user")
        }
    }
    
}