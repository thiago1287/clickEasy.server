import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ClinicaController {
    static async listarClinicas(req, res) {
        try {
            const clinicas = await prisma.clinica.findMany({});
            res.status(200).json(clinicas);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar clinicas" });
        }
    }

    static async listarClinicaPorId(req, res) {
        try {
            const { id } = req.params;
            const clinicaEncontrada = await prisma.clinica.findUnique({
                where: {
                    id: String(id),
                },
            });

            if (!clinicaEncontrada) {
                return res.status(404).json({ msg: "Clinica não encontrada" });
            }

            res.status(200).json(clinicaEncontrada);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar clinica" });
        }
    }

    static async cadastrarClinicaPsico(req, res) {
        const { nome, rua, bairro, cidade, numero, tipo } = req.body;
        try {

            const clinicaExistente = await prisma.clinica.findFirst({
                where: {
                    nome,
                    endereco: { rua, bairro, cidade, numero },
                    tipo: "psicologia"
                }
            })

            if (clinicaExistente) {
                return res.status(400).json({ msg: 'Clinica já cadastrado' });
            }

            await prisma.clinica.create({
                data: {
                    nome,
                    endereco: { rua, bairro, cidade, numero },
                    tipo
                },
            });

            res.status(201).json({ msg: 'Clinica Cadastrada' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: error });
        }
    }

    static async cadastrarClinicaFisio(req, res) {
        const { nome, rua, bairro, cidade, numero, tipo } = req.body;
        try {

            const clinicaExistente = await prisma.clinica.findFirst({
                where: {
                    nome,
                    endereco: { rua, bairro, cidade, numero },
                    tipo: "fisioterapia"
                }
            })

            if (clinicaExistente) {
                return res.status(400).json({ msg: 'Clinica já cadastrado' });
            }

            await prisma.clinica.create({
                data: {
                    nome,
                    endereco: { rua, bairro, cidade, numero },
                    tipo
                },
            });

            res.status(201).json({ msg: 'Clinica Cadastrada' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: error });
        }
    }

    static async cadastrarClinicaOdonto(req, res) {
        const { nome, rua, bairro, cidade, numero, tipo } = req.body;
        try {

            const clinicaExistente = await prisma.clinica.findFirst({
                where: {
                    nome,
                    endereco: { rua, bairro, cidade, numero },
                    tipo: "odontologia"
                }
            })

            if (clinicaExistente) {
                return res.status(400).json({ msg: 'Clinica já cadastrado' });
            }

            await prisma.clinica.create({
                data: {
                    nome,
                    endereco: { rua, bairro, cidade, numero },
                    tipo
                },
            });

            res.status(201).json({ msg: 'Clinica Cadastrada' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: error });
        }
    }

    static async atualizarClinica(req, res) {
        const { id } = req.params;
        const data = req.body;

        try {
            const clinicaExistente = await prisma.clinica.findUnique({
                where: {
                    id: String(id),
                },
            });

            if (!clinicaExistente) {
                return res.status(404).json({ msg: "Clinica não encontrada" });
            }

            const clinicaAtualizada = await prisma.clinica.update({
                where: {
                    id: String(id),
                },
                data,
            });

            res.status(200).json(clinicaAtualizada);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao atualizar clinica" });
        }
    }

    static async deletarClinica(req, res) {
        const { id } = req.params;

        try {
            const clinicaExistente = await prisma.clinica.findUnique({
                where: {
                    id: String(id),
                },
            });

            if (!clinicaExistente) {
                return res.status(404).json({ msg: "Clinica não encontrada" });
            }

            await prisma.clinica.delete({
                where: {
                    id: String(id),
                },
            });

            res.status(200).json({ msg: "Clinica deletada" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao deletar clinica" });
        }
    }
}

export default ClinicaController;