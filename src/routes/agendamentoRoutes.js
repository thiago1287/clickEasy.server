import express from "express";
import AgendamentoController from "../Controllers/AgendamentoController.js";

const routes = express.Router()

routes.get("/agendamento", AgendamentoController.listarAgendamento);
routes.get("/agendamento/:id", AgendamentoController.listarAgendamentoPorId);
routes.post("/agendamento", AgendamentoController.cadastrarAgendamento);
routes.put("/agendamento/:id", AgendamentoController.atualizarAgendamento);
routes.delete("/agendamento/:id", AgendamentoController.deletarAgendamento);

export default routes;