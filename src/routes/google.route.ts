import passport = require("passport");
import express, { Request, Response } from 'express';

export const googleRouter = express.Router()

googleRouter.get('/',
    passport.authenticate('google', {
        scope: ['profile']
    }
    ));

googleRouter.get('/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }));

googleRouter.get('/success', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.status(200).redirect('/protected')
    } else {
        res.status(401).redirect('/login');
    }
});

googleRouter.get('/failure', (req: Request, res: Response) => {
    res.status(401).send("Authentication Failed, Please try again")
})