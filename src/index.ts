import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {config} from "dotenv";
import {Request, Response} from "express";
import { AuthRoutes } from "./ROUTES/UserRoutes";



const main = ()=>{
    config();
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());

    app.use("/api/v1/auth", AuthRoutes);

    
    const port = process.env.PORT || 8001
 
    

    app.listen(port, ()=>{
        console.log(`The gateway has started at port ${port}`)
    })

}

main();