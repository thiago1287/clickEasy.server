const express = require("express");
const { prisma } = require("../services/prisma");
const router = express.Router();


router.post("/agendamento", async (req, res) => {
    const { userId, dia, horaInicio, horaFim } = req.body

    //criar horario
    console.log(userId)
    const profissional = await prisma.user.findUnique({
        where: {
            id: profissionalId,
        },
    })

    if (profissional.role != 'profissional') {
        return res.status(402).json({ msg: 'Esse profissionalId não é um profissional' })
    }

    const professor = await prisma.user.findUnique({
        where: {
            id: professorId,
        },
    })

    if (professor.role != 'professor') {
        return res.status(402).json({ msg: 'Esse professorId não é um professor' })
    }

    const schedule = await prisma.schedule.create({
        data: {
            pacienteId,
            profissionalId,
            profissionalId,
            dia,
            horaInicio,
            horaFim
        },
    });

    try {
        res.status(201).json({ msg: 'Horario Registrado' })
        return schedule;
    } catch (error) {
        res.status(500).json({ msg: error })

    }

});

//puxar todos horarios
router.get("/horarios", async (req, res) => {
    try {
        const horario = await prisma.schedule.findMany({});
        res.status(200).json(horario);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar horario" });
    }
});


//puxar horario unico pelo id
router.get("/horarios/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const horario = await prisma.schedule.findUnique({
            where: {
                id: String(id), // Certifique-se de converter o `id` para um número, se necessário
            },
        });

        if (!horario) {
            return res.status(404).json({ msg: "Horario não encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar horario" });
    }
});


router.put("/horarios/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {

        const horarioMarcado = await prisma.schedule.findUnique({
            where: {
                id: String(id),
            },
        });

        if (!horarioMarcado) {
            return res.status(404).json({ msg: "Horario não encontrado" });
        }
        const updatedHorario = await prisma.schedule.update({
            where: {
                id: String(id),
            },
            data,
        });

        res.status(200).json(updatedHorario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro ao atualizar horario" });
    }
});

router.delete("/horarios/:id", async (req, res) => {
    const { id } = req.params;

    try {

        const horarioMarcado = await prisma.schedule.findUnique({
            where: {
                id: String(id),
            },
        });

        if (!horarioMarcado) {
            return res.status(404).json({ msg: "Horario não encontrado" });
        }
        const deleteHorario = await prisma.schedule.delete({
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
});

module.exports = router;
