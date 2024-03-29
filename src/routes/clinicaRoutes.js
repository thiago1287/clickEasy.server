import express from "express";
import ClinicaController from "../Controllers/ClinicaController.js";

const routes = express.Router()

routes.get("/clinicas", ClinicaController.listarClinicas);
routes.get("/clinica/:id", ClinicaController.listarClinicaPorId);
routes.post("/clinica/psico", ClinicaController.cadastrarClinicaPsico);
routes.post("/clinica/odonto", ClinicaController.cadastrarClinicaOdonto);
routes.post("/clinica/fisio", ClinicaController.cadastrarClinicaFisio);
routes.put("/clinica/:id", ClinicaController.atualizarClinica);
routes.delete("/clinica/:id", ClinicaController.deletarClinica);

export default routes;