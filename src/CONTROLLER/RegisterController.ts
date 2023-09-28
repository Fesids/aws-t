import { HttpRequest, HttpResponse, IController } from "../DTO/ComunProtocols";
import { IUserRepository, UserLoginDTO } from "../DTO/UserDTO";
import { IUser } from "../MODELS/User";
import { badRequest, created } from "../UTILS/Helper";

export class RegisterController implements IController{
    constructor(private readonly userRepository: IUserRepository){}
    async handle(httpRequest: HttpRequest<UserLoginDTO>):
     Promise<HttpResponse<IUser | String>> {
        try{
            const requiredFields = ["username", "email", "password"];
            const {role} = httpRequest.params;

            for(const field of requiredFields){
                if(!httpRequest?.body?.[field as keyof UserLoginDTO]){
                    return badRequest(`Field ${field} is required`);
                }
            }

            if(!httpRequest.body){
                throw new Error("No body provided. Please, specify a body");
            }

            const user = await this.userRepository.save(httpRequest.body, role);
            return created(user);


        }catch(err){
            return badRequest("Failed to create user. Somthing went wrong");
        }
    }

}