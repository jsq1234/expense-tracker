import { User } from "@/models/user.model";
import { JwtConfig } from "@/utils/interface";
import jwt from "jsonwebtoken";

export class UserService {
  generateJwt(user: User, config: JwtConfig): string {
    return jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      config.secret,
      { expiresIn: config.expiresIn }
    );
  }
}
