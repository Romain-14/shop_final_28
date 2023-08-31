import express from "express";
import session from "express-session";
import "dotenv/config";

import { setSession} from "./config/session.js"

import router from "./router/index.routes.js";

console.log(process.env.SECRET_TOKEN);

const app = express();
const PORT = process.env.PORT || 9000;

app.set("views", "./src/views")
    .set("view engine", "ejs")
    .use(express.static("public"))
    .use(express.urlencoded({ extended: true }))
    .use(session({
        secret: process.env.SECRET_TOKEN,
        resave: false,
        saveUninitialized: false,
    }))
    .use(setSession)
    .use(router);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
