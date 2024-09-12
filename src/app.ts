import express from 'express';
import mongoose from 'mongoose';
import logger from './utils/logger';
import { errorHandler } from './utils/errorHandler';
import * as config from './config/defaults';
import passport from 'passport';
import { configureGoogleAuth } from './auth/passport.google';
import { configureGithubAuth } from './auth/passport.github';
import session from 'express-session';
import { basicRouter } from './routes/basic.route';
import { googleRouter } from './routes/google.route';
import { GithubRouter } from './routes/github.route';
import { serializeUser } from './auth/serializeUser';
import { deserializeUser } from './auth/deserializeUser';


const port = config.port
const dbURI = config.dbURI

const app = express();
app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "session secret"
}))
app.use(passport.initialize());
app.use(passport.session());

configureGoogleAuth();
configureGithubAuth();
serializeUser();
deserializeUser();


app.use(express.json());

app.use('/', basicRouter);
app.use('/auth/google', googleRouter);
app.use('/auth/github', GithubRouter)
app.use(errorHandler);


if (dbURI === undefined) {
    logger.error('Error while connecting to the Datebase')
} else {
    (async () => {
        try {
            await mongoose.connect(dbURI)
            app.listen(port, () => {
                logger.info(`App runs successfully, Listening on port ${port}`)
            })

        } catch (err: any) {
            logger.error(err.message)
        }
    })();
}