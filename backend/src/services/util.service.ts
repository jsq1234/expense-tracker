import { UserEntity } from "@/models/user.model";
import { JwtConfig } from "@/utils/types";
import jwt from "jsonwebtoken";

export class UtilService {
  static generateJwt(user: UserEntity, config: JwtConfig): string {
    return jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      config.secret,
      { expiresIn: config.expiresIn }
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
