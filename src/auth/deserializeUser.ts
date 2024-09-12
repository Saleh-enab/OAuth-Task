import passport = require("passport");
import { UserModel } from "../models/user.model";

export const deserializeUser = () => {
    passport.deserializeUser(async (obj: { id: string; type: string }, done) => {
        try {
            const user = await UserModel.findById(obj.id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}