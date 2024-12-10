import passport from "passport";
import { googleStrategy } from "./googleStrategy";
import { jwtStrategy } from "./jwtStrategy";

//passport.use(googleStrategy);
passport.use(jwtStrategy);

export default passport;
