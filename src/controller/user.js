import { readFile } from "fs/promises";
import bcrypt from "bcrypt";
import { writeFile } from "fs";

const SALT_ROUND = 10;

const datas = JSON.parse(
    await readFile(new URL("../data/users.json", import.meta.url))
);

const signinView = (req, res) => {
    const { msg } = req.query;

    res.status(200).render("layout", {
        template: "./user/signin",
        user: req.session.user,
        msg,
    });
}
const signinUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.redirect("/user/signin?msg=Pas%20de%20champs%20vide%20!");
        return;
    }

    const user = datas.find((user) => req.body.email === user.email);
    if (user) {
        bcrypt.compare(req.body.password, user.password, (err, same) => {
            if (err) return console.log("compare", err);
            if (same) {
                req.session.user = { isLogged: true, email: req.body.email };
                res.redirect("/");
            } else {
                res.redirect(
                    "/user/signin?msg=Mot%20de%20passe%20erroné%20!%20Contactez%20l'administrateur%20!"
                );
            }
        });
    } else res.redirect("/user/signin?msg=Email%20inconnu%20!");
}

const signupView = (req, res) => {
    res.status(200).render("layout", {
        template: "./user/signup",
        user: req.session.user,
    });
}

const signupUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.redirect("/user/signup");
        return;
    }

    const user = {
        id: datas.length
            ? Math.max(...datas.map((user) => user.id)) + 1
            : 1,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, SALT_ROUND),
        signup_date: new Date(),
    };

    datas.push(user);

    writeFile("src/data/users.json", JSON.stringify(datas), (err) => {
        if (err) return console.log("writefile", err);

        res.redirect("/user/signin");
    });
}

const signout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

export { signinView, signinUser, signupView, signupUser, signout };
