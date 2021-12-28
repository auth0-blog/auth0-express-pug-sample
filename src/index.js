/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const { auth } = require('express-openid-connect');

require("dotenv").config();

/**
 * App Variables
 */

const env = process.env.NODE_ENV || "development";
const app = express();
const port =
    env === "development" ? process.env.DEV_PORT : process.env.PROD_PORT;

/**
 *  App Configuration
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(
    auth({
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.AUTH0_CLIENT_ID,
        secret: process.env.SESSION_SECRET,
        authRequired: false,
        auth0Logout: true,
    }),
);

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.oidc.isAuthenticated();
    res.locals.activeRoute = req.originalUrl;
    next();
});

/**
 * Routes Definitions
 */

// > Home

app.get("/", (req, res) => {
    res.render("home");
});

// > Profile

app.get("/profile", (req, res) => {
    res.render("profile");
});

// > External API

app.get("/external-api", (req, res) => {
    res.render("external-api");
});

// > Authentication

app.get('/sign-up', (req, res) => {
    const { page } = req.params;

    res.oidc.login({
        returnTo: page,
        authorizationParams: {
            screen_hint: 'signup',
        },
    });
});

app.get('/login/:page', (req, res) => {
    const { page } = req.params;

    res.oidc.login({
        returnTo: page,
    });
});

app.get('/logout/:page', (req, res) => {
    const { page } = req.params;

    res.oidc.logout({
        returnTo: page,
    });
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});