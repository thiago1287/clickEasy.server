import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProntuarioController {
  static async cadastrarProntuario(req, res) {
    const {
      pacienteId,
      observacoes,
      profissionalId,
      professorId,
      clinicaId,
      alunoId,
    } = req.body;
    try {
      const prontuario = await prisma.prontuario.create({
        data: {
          observacoes,
          alunoId,
          pacienteId,
          profissionalId,
          clinicaId,
          professorId,
        },
      });
      res.status(201).json({ msg: "Prontuário Registrado", prontuario });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  }

  static async buscarProntuario(req, res) {
    try {
      const { pacienteId, profissionalId, clinicaId, professorId } = req.params;
      const prontuarios = await prisma.prontuario.findMany({
        include: {
          paciente: true,
        },
      });
      res.status(200).json(prontuarios);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao buscar prontuarios" });
    }
  }

  static async buscarProntuarioPorId(req, res) {
    try {
      const { pacienteId, profissionalId, clinicaId, professorId, id } =
        req.params;

      const prontuarios = await prisma.prontuario.findUnique({
        where: {
          id: String(id),
        },
        include: {
          paciente: true,
        },
      });
      if (!prontuarios) {
        return res.status(404).json({ msg: "Prontuario não encontrado" });
      }
      res.status(200).json(prontuarios);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao buscar prontuarios" });
    }
  }

  static async alterarProntuario(req, res) {
    const { id } = req.params;
    const { observacoes } = req.body;
    try {
      const prontuarioAtualizado = await prisma.prontuario.update({
        where: {
          id: String(id),
        },
        data: {
          observacoes,
        },
      });

      res.status(200).json({
        msg: "Observações do prontuário atualizada",
        prontuario: prontuarioAtualizado,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ msg: "Erro ao atualizar as observações do prontuário" });
    }
  }

  static async excluirProntuario(req, res) {
    const { id } = req.params;
    try {
      const prontuarioExcluido = await prisma.prontuario.delete({
        where: {
          id: String(id),
        },
      });

      res.status(200).json({
        msg: "Prontuário excluído com sucesso",
        prontuario: prontuarioExcluido,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao excluir o prontuário" });
    }
  }
  static async excluirProntuario(req, res) {
    const { id } = req.params;
    try {
      const prontuarioExcluido = await prisma.prontuario.delete({
        where: {
          id: String(id),
        },
      });

      res
        .status(200)
        .json({
          msg: "Prontuário excluído com sucesso",
          prontuario: prontuarioExcluido,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao excluir o prontuário" });
    }
  }
}

export default ProntuarioController;
