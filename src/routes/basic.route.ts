import express, { Request, Response } from "express";

export const basicRouter = express.Router();

basicRouter.get('/login', (req: Request, res: Response) => {
    res.render('login')
})

basicRouter.get('/protected', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.status(200).render('protected', { user: req.user });
    } else {
        res.status(401).send("Unauthorized");
    }
})


basicRouter.get('/logout', (req: Request, res: Response) => {
    req.logout((err) => {
        if (err)
            console.log(err)
    });
    res.redirect('/login')
})