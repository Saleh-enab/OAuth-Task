import passport from "passport";
import { UserModel } from "../models/user.model";
var GithubStrategy = require('passport-github2').Strategy;
import { githubClientID, githubClientSecret } from "../config/defaults";

export const configureGithubAuth = () => {
    passport.use(new GithubStrategy({
        clientID: githubClientID,
        clientSecret: githubClientSecret,
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
        async function (accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) {
            try {
                let user = await UserModel.findOne({ appId: "github-" + profile.id });
                if (!user) {
                    user = new UserModel({
                        name: profile.displayName || profile.username,
                        appId: "github-" + profile.id,
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
