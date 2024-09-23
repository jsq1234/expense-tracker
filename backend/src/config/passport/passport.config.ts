import passport from "passport";
import { googleStrategy } from "./googleStrategy";

passport.use(googleStrategy);
export default passport;
