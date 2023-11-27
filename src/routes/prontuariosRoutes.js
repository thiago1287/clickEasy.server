import express from "express";
import ProntuariosController from "../Controllers/ProntuariosController.js";

const routes = express.Router()


routes.post("/prontuarios", ProntuariosController.cadastrarProntuario);
routes.get("/prontuarios", ProntuariosController.buscarProntuario);
routes.get("/prontuarios:id", ProntuariosController.buscarProntuarioPorId);

export default routes;
