import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { config } from "dotenv";
config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
  throw new Error("Missing required environment variables for Google OAuth");
}

export const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile: Profile, done) => {
    // const user = await getUserCredByProviderId(profile.id);
    if (user) {
      return done(null, user);
    }

    if (!profile._json.email) {
      return done("email not provided by google", false);
    } 

    // const newUser = await createUser({
    //   email: profile._json.email,
    //   username: profile._json.email,
    //   avatar: profile._json.picture,
    //   firstName: profile._json.given_name,
    //   lastName: profile._json.family_name,
    //   password: null,
    //   provider: "google",
    //   role: "user",
    //   provider_id: profile.id,
    // });

    // return done(null, newUser);
  }
);
