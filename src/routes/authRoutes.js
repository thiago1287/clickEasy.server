import express from "express";
import AuthController from "../Controllers/AuthController.js";


const routes = express.Router()

routes.post("/auth/login", AuthController.login);

export default routes;