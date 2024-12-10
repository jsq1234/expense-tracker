import { CommonResponse, UserDto } from "@/utils/types";
import { Request , Router, Response, NextFunction } from "express";
import { UserEntity } from "@/models/user.model";
import { httpLogger, logger } from "@/config/logger.config";
import { config } from "dotenv";
import { createUserSchema } from "@/utils/validation";
import { UserService } from "@/services/user.service";
import { UtilService } from "@/services/util.service";

config();
export const router = Router();

const registerUser = async (req: Request, res: Response): Promise<any> => {
    logger.info({ user: req.body }, "Creating user");
    const createUser = createUserSchema.parse(req.body);
    const userId = await UserService.createUser(createUser);

    const data = {
        userId,
        jwtToken: UtilService.generateJwt(new UserEntity({ id: userId, ...createUser}))
    };

    const commonRespose: CommonResponse<typeof data> = {
        data,
        status: "SUCCESS",
        errors: null
    }
    return res.status(200).json(commonRespose);
};


const fetchUser = async (req: Request, res: Response): Promise<any> => {
    const user = new UserEntity(req.user as UserEntity).getDto();
    req.log.info({ user }, "Fetching user");
     //logger.child({ userId: user.id }).info({ user }, "Fetching user");
    return res.status(200).json({ data: user, errors: null, status: "SUCCESS"} as CommonResponse<UserDto>)
}


router.post("/user/register", registerUser);
router.get("/user", fetchUser);