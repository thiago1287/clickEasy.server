import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
class registerController {
  static async cadastrarAluno(req, res) {
    const {
      nome,
      email,
      password,
      confirmedpassword,
      role,
      turma,
      curso,
      matricula,
    } = req.body;
    function sendError(msg) {
      return res.status(400).json({ msg });
    }
    if (!nome) return sendError("O nome é obrigatório!");
    if (!email) return sendError("O email é obrigatório!");
    if (!password) return sendError("A senha é obrigatória!");
    if (!confirmedpassword)
      return sendError("Confirmação de senha é obrigatória!");
    if (confirmedpassword !== password)
      return sendError("As senhas não coincidem!");
    if (!turma) return sendError("A turma é obrigatória!");
    if (!curso) return sendError("O curso é obrigatório!");
    if (!matricula) return sendError("A matrícula é obrigatória!");

    const userExists = await prisma.user.findFirst({
      where: {
        email: String(email),
      },
    });

    if (userExists) return sendError("Por favor, utilize outro email!");

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        password: passwordHash,
        turma,
        curso,
        matricula,
        role: "aluno",
      },
    });

    try {
      res.status(201).json({ msg: "Usuario cadastrado com sucesso" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

  static async cadastrarProfessor(req, res) {
    const { nome, email, password, confirmedpassword, role, turma, curso } =
      req.body;
    function sendError(msg) {
      return res.status(400).json({ msg });
    }
    if (!nome) return sendError("O nome é obrigatório!");
    if (!email) return sendError("O email é obrigatório!");
    if (!password) return sendError("A senha é obrigatória!");
    if (!confirmedpassword)
      return sendError("Confirmação de senha é obrigatória!");
    if (confirmedpassword !== password)
      return sendError("As senhas não coincidem!");
    if (!turma) return sendError("A turma é obrigatória!");
    if (!curso) return sendError("O curso é obrigatório!");

    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExists) return sendError("Por favor, utilize outro email!");

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        password: passwordHash,
        turma,
        curso,
        role: "professor",
      },
    });

    try {
      res.status(201).json({ msg: "Usuario cadastrado com sucesso" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

  static async cadastrarPaciente(req, res) {
    const {
      nome,
      role,
      nomePai,
      nomeMae,
      datadenascimento,
      telefone,
      sexo,
      cpf,
      estCivil,
      observacoes,
      rua,
      bairro,
      cidade,
      numero,
    } = req.body;
    function sendError(msg) {
      return res.status(400).json({ msg });
    }
    if (!nome) return sendError("O nome é obrigatório!");
    if (!datadenascimento)
      return sendError("A data de nascimento é obrigatorio!");
    if (!nomePai) return sendError("O nome do pai é obrigatorio!");
    if (!nomeMae) return sendError("O nome da mãe é obrigatorio!");
    if (!sexo) return sendError("O sexo é obrigatorio!");
    if (!telefone) return sendError("O telefone é obrigatorio!");
    if (!cpf) return sendError("O CPF é obrigatorio!");
    if (!estCivil) return sendError("O estado civil é obrigatorio!");

    const salt = await bcrypt.genSalt(12);
    const cpfHash = await bcrypt.hash(cpf, salt);
    user = await prisma.user.create({
      data: {
        nome,
        nomeMae,
        nomePai,
        datadenascimento,
        telefone,
        sexo,
        cpf: cpfHash,
        estCivil,
        observacoes,
        role: "paciente",
        endereco: { rua, bairro, cidade, numero },
      },
    });

    try {
      res.status(201).json({ msg: "Usuario cadastrado com sucesso" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

  static async cadastrarProfissional(req, res) {
    const { nome, email, password, confirmpassword, role, curso } = req.body;
    function sendError(msg) {
      return res.status(400).json({ msg });
    }
    if (!nome) return sendError("O nome é obrigatório!");
    if (!email) return sendError("O email é obrigatório!");
    if (!password) return sendError("A senha é obrigatória!");
    if (!confirmedpassword)
      return sendError("Confirmação de senha é obrigatória!");
    if (confirmedpassword !== password)
      return sendError("As senhas não coincidem!");
    if (!curso) return sendError("O curso é obrigatório!");

    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return res.status(422).json({ msg: "Por favor, utilize outro email!" });
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    user = await prisma.user.create({
      data: {
        nome,
        email,
        password: passwordHash,
        curso,
        role: "Profissional",
      },
    });

    try {
      res.status(201).json({ msg: "Usuario cadastrado com sucesso" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

  //puxar todos alunos
  static async listarAlunos(req, res) {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: "aluno",
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao buscar usuários" });
    }
  }

  static async listarPacientes(req, res) {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: "paciente",
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao buscar usuários" });
    }
  }

  //puxar usuario unico pelo id
  static async listarUserPorId(req, res) {
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: String(id), // Certifique-se de converter o `id` para um número, se necessário
        },
      });

      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao buscar usuário" });
    }
  }

  static async atualizarUser(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: String(id),
        },
      });

      if (!existingUser) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }
      const updatedUser = await prisma.user.update({
        where: {
          id: String(id),
        },
        data,
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Erro ao atualizar usuário" });
    }
  }
}
export default registerController;
