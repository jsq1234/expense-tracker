import passport from "@/config/passport/passport.config";
import { NextFunction, Request, Response } from "express";
const permittedUrlList = [
    "/api/user/register",
    "/api/user/login",
    "/api/health",
];
export const authenticationMiddleware = function(req: Request, res: Response, next: NextFunction){
    if(permittedUrlList.includes(req.url)){
        return next();
    }
    passport.authenticate("jwt", { session: false }, (err: any, user: any, _info: any) => {
        if(err) { 
            return next(err);
        }
        if(!user){
            return res.status(401).send("Unauthorized");
        }else{
            req.user = user;
        }
        return next();
    })(req, res, next)
}