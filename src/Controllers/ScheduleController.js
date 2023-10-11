const express = require("express");
const { prisma } = require("../services/prisma");
const router = express.Router();


router.post("/agendamento", async (req, res) => {
    const { userId, dia, horaInicio, horaFim } = req.body
    //recuperar o userId
    const user = await Name.findById(UserId).select('name');

    //criar horario
    const schedule = await prisma.schedule.create({
        data: {
            userId
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