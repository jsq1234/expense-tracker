import { UserService } from '@/services/user.service';
import { Strategy as LocalStrategy} from 'passport-local';

export const localStrategy = new LocalStrategy({
    session: false,
    usernameField: 'email',
    passwordField: 'password'
},  async (username, password, done) => {
    try{
        const user = await UserService.fetchUserByEmail(username);
        if(!user){
            return done(null, false, { message: 'Incorrect username' });
        }

        const isMatch = await UserService.comparePassword(password, user.password);

        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }
        
        return done(null, user);
    }catch(e: any){
        return done(e);
    }
})