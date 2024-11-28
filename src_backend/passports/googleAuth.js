import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {configs} from "../configs/config";
import {ApiError} from "../errors/api.error";

class GoogleAuth {
    constructor() {
        this.initialize();
    }

    initialize() {
        if(!configs.BACK_END_HOST){
            throw new ApiError("Google authentication failed",500)
        }
        const callbackURL =`${configs.BACK_END_HOST}/auth/google/callback`;
        console.log("GoogleAuth:",{host:configs.BACK_END_HOST, secret:configs.GOOGLE_CLIENT_SECRET});
        passport.use(
            new GoogleStrategy(
                {
                    clientID: configs.GOOGLE_CLIENT_ID,
                    clientSecret: configs.GOOGLE_CLIENT_SECRET,
                    callbackURL,
                    passReqToCallback: true,
                },
                this.verifyCallback
            )
        );

        passport.serializeUser(this.serializeUser);
        passport.deserializeUser(this.deserializeUser);
    }

    async verifyCallback(request, accessToken, refreshToken, profile, done) {
        // Here you can implement your user creation logic
        /*
        const exist = await User.findOne({ email: profile["emails"][0].value });
        if (!exist) {
          await User.create({
            email: profile["emails"][0].value,
            fullName: profile["displayName"],
            avatar: profile["photos"][0].value,
            username: profile["name"]["givenName"],
            verified: true,
          });
        }
        const user = await User.findOne({ email: profile["emails"][0].value });
        return done(null, user);
        */
        console.log("googleAuth:  ",{
            email: profile["emails"][0].value,
            fullName: profile["displayName"],
            avatar: profile["photos"][0].value,
            username: profile["name"]["givenName"],
            verified: true,
        });

        return done(null, profile);
    }

    serializeUser(user, done) {
        done(null, user);
    }

    deserializeUser(user, done) {
        done(null, user);
    }
}

export const googleAuth = new GoogleAuth();