import express from "express";
import auth from "./authRoutes.js";
import agendamentos from "./agendamentoRoutes.js";
import register from "./registerRoutes.js";
import clinica from "./clinicaRoutes.js";
import prontuarios from "./prontuariosRoutes.js"
import cors from "cors";


const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("API em execução"));

    app.use(express.json(),register, auth, agendamentos,clinica,prontuarios);

  app.use(cors);
};

export default routes;
