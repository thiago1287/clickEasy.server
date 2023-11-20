import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as jsonSecret from "../config/jsonSecret.js";

const prisma = new PrismaClient();

export default class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    console.log("ruela");
    try {
      const usuario = await prisma.user.findFirst({
        select: {
          id: true,
          email: true,
          password: true,
        },
        where: {
          email: email,
        },
      });

      if (!usuario) {
        throw new Error("Usuário não cadastrado");
      }

      const senhaIguais = await bcrypt.compare(password, usuario.password); // Utilizando a função compare do bcrypt

      if (!senhaIguais) {
        throw new Error("Senha inválida");
      }

      const accessToken = jwt.sign(
        { id: usuario.id, email: usuario.email },
        jsonSecret.secret,
        { expiresIn: 86400 }
      );

      delete usuario.password;

      return res.status(200).json({ usuario, accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao realizar o login" });
    }
  }
}
