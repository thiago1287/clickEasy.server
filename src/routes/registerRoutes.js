import express from "express";
import RegisterController from "../Controllers/RegisterController.js";
import autenticado from '../middleware/autenticado.js';


const routes = express.Router()
routes.use(autenticado)
routes.get("/alunos", RegisterController.listarAlunos);
routes.get("/pacientes", RegisterController.listarPacientes);
routes.get("/user/:id", RegisterController.listarUserPorId);
routes.post("/register/aluno", RegisterController.cadastrarAluno);
routes.post("/register/professor", RegisterController.cadastrarProfessor);
routes.post("/register/paciente", RegisterController.cadastrarPaciente);
routes.put("/user/:id", RegisterController.atualizarUser);

export default routes;
