import passport from "passport";
import GoogleTokenStrategy  from 'passport-google-token'

import config from "./config";
import { createGoogleUser } from "./helpers/google-user";

passport.use(
    new GoogleTokenStrategy.Strategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
        },
        (
            accessToken,
            refreshToken,
            profile,
            done
        ) => {
            createGoogleUser(accessToken, refreshToken, profile)
                .then((user) => done(null, user))
                .catch((error) => done(error))
        }
    )
);
