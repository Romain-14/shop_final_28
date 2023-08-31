import { getRandomInteger } from "../utils/index.js";
import { readFile } from "fs/promises";

const datas = JSON.parse(
    await readFile(new URL("../data/products.json", import.meta.url))
);

const homeView = (req, res) => {
    const randomDatas = [...datas];
    const datasToDisplay = 3;
    for (let i = 0; i < datas.length - datasToDisplay; i++) {
        const index = getRandomInteger(0, randomDatas.length - 1);
        randomDatas.splice(index, 1);
    }
    res.status(200).render("layout", {
        template: "./home",
        randomDatas,
        user: req.session.user,
    });
};

export { homeView };
