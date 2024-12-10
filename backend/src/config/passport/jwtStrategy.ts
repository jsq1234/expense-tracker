import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { config } from "dotenv";
import { JwtPayload } from "jsonwebtoken";
import { UserService } from "@/services/user.service";
import { ApiError } from "@/utils/errors";
import { HttpStatus } from "@/utils/http-status";
import { ZodError, ZodIssueCode } from "zod";
config();

const { JWT_SECRET } = process.env;

if(!JWT_SECRET){
    throw new Error("JWT_SECRET not found!");
}

export const jwtStrategy = new JwtStrategy({
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload: JwtPayload, done) => {
    try{
        if(!payload.sub){
            return done(null, false);
        }
        const user = await UserService.fetchUser(payload.sub);

        if(!user){
            return done(null, false, { message: "User not found" });
        }
        return done(null, user);
    }catch(e: any){
        return done(e);
    }
})