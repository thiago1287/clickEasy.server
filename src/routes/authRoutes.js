import express from "express";
import AuthController from "../Controllers/AuthController.js";

const routes = express.Router()

routes.get("/alunos", AuthController.listarAlunos);
routes.get("/pacientes", AuthController.listarPacientes);
routes.get("/user/:id", AuthController.listarUserPorId);
routes.post("/register/aluno", AuthController.cadastrarAluno);
routes.post("/register/professor", AuthController.cadastrarProfessor);
routes.post("/register/paciente", AuthController.cadastrarPaciente);
routes.put("/user/:id", AuthController.atualizarUser);

export default routes;