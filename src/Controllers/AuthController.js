import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

class AuthController {

  static async cadastrarAluno(req, res) {
    const { nome, email, password, confirmedpassword, role, turma, curso, matricula } = req.body

    if (!nome) {
      return res.status(400).json({ msg: 'O nome é obrigatorio!' });
    }
    if (!email) {
      return res.status(400).json({ msg: 'O email é obrigatorio!' });
    }
    if (!password) {
      return res.status(400).json({ msg: 'O senha é obrigatorio!' });
    }
    if (!confirmedpassword) {
      return res.status(400).json({ msg: 'Confirmar a senha é obrigatorio!' });
    }
    if (confirmedpassword !== password) {
      return res.status(400).json({ msg: 'A senha não esta igual' });
    }
    if (!turma) {
      return res.status(400).json({ msg: 'A turma é obrigatorio' });
    }
    if (!curso) {
      return res.status(400).json({ msg: 'A turma é obrigatorio' });
    }
    if (!matricula) {
      return res.status(400).json({ msg: 'A matricula é obrigatorio' });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    })

    if (userExists) {
      return res.status(422).json({ msg: 'Por favor, utilize outro email!' })
    }
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)



    const user = await prisma.user.create({
      data: {
        nome,
        email,
        password: passwordHash,
        turma,
        curso,
        matricula,
        role: "aluno"
      },
    });




    try {
      res.status(201).json({ msg: 'Usuario cadastrado com sucesso' })

    } catch (error) {
      res.status(500).json({ msg: error })

    }

  };

  static async cadastrarProfessor(req, res) {
    const { nome, email, password, confirmedpassword, role, turma, curso, } = req.body

    if (!nome) {
      return res.status(400).json({ msg: 'O nome é obrigatorio!' });
    }
    if (!email) {
      return res.status(400).json({ msg: 'O email é obrigatorio!' });
    }
    if (!password) {
      return res.status(400).json({ msg: 'O senha é obrigatorio!' });
    }
    if (!confirmedpassword) {
      return res.status(400).json({ msg: 'Confirmar a senha é obrigatorio!' });
    }
    if (confirmedpassword !== password) {
      return res.status(400).json({ msg: 'A senha não esta igual' });
    }
    if (!turma) {
      return res.status(400).json({ msg: 'A turma é obrigatorio' });
    }
    if (!curso) {
      return res.status(400).json({ msg: 'A turma é obrigatorio' });
    }


    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (userExists) {
      return res.status(422).json({ msg: 'Por favor, utilize outro email!' })
    }
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)



    const user = await prisma.user.create({
      data: {
        nome,
        email,
        password: passwordHash,
        turma,
        curso,
        role: "professor"
      },
    });


    try {
      res.status(201).json({ msg: 'Usuario cadastrado com sucesso' })

    } catch (error) {
      res.status(500).json({ msg: error })

    }

  };


  static async cadastrarPaciente(req, res) {
    const { nome, role, nomePai, nomeMae, datadenascimento, telefone, sexo, cpf, estCivil, observacoes, rua, bairro, cidade, numero } = req.body

    if (!nome) {
      return res.status(400).json({ msg: 'O nome é obrigatorio!' });
    }
    if (!datadenascimento) {
      return res.status(400).json({ msg: 'A data de nascimento é obrigatorio' });
    }
    if (!nomePai) {
      return res.status(400).json({ msg: 'O nome do pai é obrigatorio' });
    }
    if (!nomeMae) {
      return res.status(400).json({ msg: 'O nome da mãe é obrigatorio' });
    }
    if (!sexo) {
      return res.status(400).json({ msg: 'O sexo é obrigatorio' });
    }
    if (!telefone) {
      return res.status(400).json({ msg: 'O telefone é obrigatorio' });
    }
    if (!cpf) {
      return res.status(400).json({ msg: 'O cpf é obrigatorio' });
    }
    if (!estCivil) {
      return res.status(400).json({ msg: 'O Estado civil é obrigatorio' });
    }



    user = await prisma.user.create({
      data: {
        nome,
        nomeMae,
        nomePai,
        datadenascimento,
        telefone,
        sexo,
        cpf,
        estCivil,
        observacoes,
        role: "paciente",
        endereco: { rua, bairro, cidade, numero }

      },
    });


    try {
      res.status(201).json({ msg: 'Usuario cadastrado com sucesso' })

    } catch (error) {
      res.status(500).json({ msg: error })

    }

  };

  //puxar todos alunos
  static async listarAlunos(req, res) {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: 'aluno'
        }
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao buscar usuários" });
    }
  };

  static async listarPacientes(req, res) {

    try {
      const users = await prisma.user.findMany({
        where: {
          role: 'paciente'
        }
      });
      res.status(200).json(users);
    } catch (error) {
      console.log(error)
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
  };


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
  };
}


export default AuthController;