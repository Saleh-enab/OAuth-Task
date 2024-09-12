import passport from 'passport';
import { UserModel } from '../models/user.model';
var GoogleStrategy = require('passport-google-oauth2').Strategy;
import { googleClientID, googleClientSecret } from '../config/defaults';

export const configureGoogleAuth = () => {
    passport.use(new GoogleStrategy({
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
        async function (request: any, accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) {
            try {
                let user = await UserModel.findOne({ appId: "google-" + profile.id });
                if (!user) {
                    user = new UserModel({
                        name: profile.displayName,
                        appId: "google-" + profile.id,
                        email: profile.emails && profile.emails[0] && profile.emails[0].value
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    ));
}
