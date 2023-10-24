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
        return res.status(402).json({ msg: 'Esse profissionalId não é um profissional'})
    }
    const schedule = await prisma.schedule.create({
        data: {
            pacienteId,
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

module.exports = router;
