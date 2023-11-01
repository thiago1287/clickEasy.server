import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class AgendamentoController {

    static async listarAgendamento(req, res) {
        try {
            const agendamento = await prisma.agendamento.findMany({});
            res.status(200).json(agendamento);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar agendamento" });
        }
    };

    static async listarAgendamentoPorId(req, res) {
        try {
            const { id } = req.params.id;
            const horarioEncontrado = await prisma.agendamento.findUnique({
                where: {
                    id: String(id),
                },
            });

            if (!horarioEncontrado) {
                return res.status(404).json({ msg: "Horario não encontrado" });
            }

            res.status(200).json(user);

        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar horario" });
        }
    };

    static async cadastrarAgendamento(req, res) {
        const { userId, dia, horaInicio, horaFim, paciente, aluno } = req.body

        const agendamento = await prisma.agendamento.create({
            data: {
                userId,
                dia,
                horaInicio,
                horaFim,
                paciente,
                aluno
            },
        });

        try {
            res.status(201).json({ msg: 'Horario Registrado' })
            return agendamento;
        } catch (error) {
            res.status(500).json({ msg: error })
        }
    };

    static async atualizarAgendamento(req, res) {
        const { id } = req.params;
        const data = req.body;

        try {
            const horarioMarcado = await prisma.agendamento.findUnique({
                where: {
                    id: String(id),
                },
            });

            if (!horarioMarcado) {
                return res.status(404).json({ msg: "Horario não encontrado" });
            }
            const horarioAtualizado = await prisma.agendamento.update({
                where: {
                    id: String(id),
                },
                data,
            });

            res.status(200).json(horarioAtualizado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao atualizar horario" });
        }
    };

    static async deletarAgendamento(req, res) {
        const { id } = req.params;

        try {

            const horarioMarcado = await prisma.agendamento.findUnique({
                where: {
                    id: String(id),
                },
            });

            if (!horarioMarcado) {
                return res.status(404).json({ msg: "Horario não encontrado" });
            }
            const horarioDeletado = await prisma.agendamento.delete({
                where: {
                    id: String(id),
                },
                data,
            });

            res.status(200).json({ msg: "Horario deletado" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao deletar horario" });
        }
    };
}

export default AgendamentoController;
