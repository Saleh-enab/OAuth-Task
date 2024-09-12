import passport = require("passport");

export const serializeUser = () => {
    passport.serializeUser((user: any, done) => {
        const appType = user.appId.split('-')[0]
        done(null, { id: user._id, type: appType });
    });
}