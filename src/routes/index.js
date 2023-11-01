import express from "express";
import agendamentos from "./agendamentoRoutes.js"
import auth from "./authRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("API em execução"));

    app.use(express.json(), auth, agendamentos);
};

export default routes;