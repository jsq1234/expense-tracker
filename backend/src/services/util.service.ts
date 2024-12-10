import { UserEntity } from "@/models/user.model";
import { JwtConfig } from "@/utils/types";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();


if(!process.env.JWT_SECRET){
  throw new Error("JWT_SECRET not found!");
};

if(!process.env.JWT_EXPIRES_IN){
  throw new Error("JWT_EXPIRES_IN not found!");
}

const jwtConfig: JwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
}
export class UtilService {
  static generateJwt(user: UserEntity): string {
    return jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );
  }

  static removeKeys<T>(obj: T, keys: (keyof T)[]) {
    for (const key of keys) {
      delete obj[key];
    }
    return obj;
  }

  static removeNullKeys<T extends Record<string, any>>(obj: T) {
    Object.keys(obj).forEach((key) => {
      if (key in obj && obj[key] === null) {
        delete obj[key];
      }
    });
    return obj;
  }
}
