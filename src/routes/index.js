import express from "express";
import agendamentos from "./agendamentoRoutes.js"
import register from "./registerRoutes.js";
import auth from "./authRoutes.js"
import cors from "cors";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("API em execução"));

    app.use(express.json(), auth, register, agendamentos);

    app.use(cors);
};

export default routes;