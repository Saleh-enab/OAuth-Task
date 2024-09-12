import passport = require("passport");
import express, { Request, Response } from 'express';

export const GithubRouter = express.Router()

GithubRouter.get('/',
    passport.authenticate('github', {
        scope: ['user', 'user:email']
    }
    ));

GithubRouter.get('/callback',
    passport.authenticate('github', {
        successRedirect: '/auth/github/success',
        failureRedirect: '/auth/github/failure'
    })
)


GithubRouter.get('/success', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.status(200).redirect('/protected')
    } else {
        res.status(401).redirect('/login');
    }
});

GithubRouter.get('/failure', (req: Request, res: Response) => {
    res.status(401).send("Authentication Failed, Please try again")
})