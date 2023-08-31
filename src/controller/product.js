import { readFile } from "fs/promises";

const datas = JSON.parse(
    await readFile(new URL("../data/products.json", import.meta.url))
);

const productView = (req, res) => {
    res.status(200).render("layout", {
        template: "./product/all",
        datas,
        user: req.session.user,
    });
};

const oneProductView = (req, res) => {
    const data = datas.find((data) => data.id === parseInt(req.params.id));

    res.status(200).render("layout", {
        template: "./product/one",
        data,
        user: req.session.user,
    });
}

const searchProductView = (req, res) => {
    console.log(datas)
    const search = datas.filter((data) =>
        data.label.toLowerCase().includes(req.query.search.toLowerCase())
    );

    res.status(200).render("layout", {
        template: "./search",
        search,
        user: req.session.user,
    });
}

const searchProduct = (req, res) => {
    res.redirect(`/product/search?search=${req.body.search}`);
}

export { productView, oneProductView, searchProductView, searchProduct };
