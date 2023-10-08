const express = require("express");
const { prisma } = require("../services/prisma");
const router = express.Router();
const bcrypt = require('bcrypt');



router.post("/register", async(req,res) =>{
    const{name, email, password, confirmpassword} = req.body
    if(!name){
        return res.status(400).json({msg: 'O nome é obrigatorio!'});
    }
    if(!email){
        return res.status(400).json({msg: 'O email é obrigatorio!'});
    }
    if(!password){
        return res.status(400).json({msg: 'O senha é obrigatorio!'});
    }
    if(!confirmpassword){
        return res.status(400).json({msg: 'Confirmar a senha é obrigatorio!'});
    }
    if(confirmpassword !== password){
        return res.status(400).json({msg: 'A senha não esta igual'});
    }

    //checando se o usuario existe// 

    const userExists = await prisma.user.findUnique({
        where: {
          email: email,
        },
    })

    if (userExists){
        return res.status(422).json({msg: 'Por favor, utilize outro email!'})
    }

    //senha

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password,salt)

    //criar usuario

    const user = await prisma.user.create({
        data: {
          name,
          email,
          password:passwordHash
        },
      });

    try{
        res.status(201).json({msg:'Usuario cadastrado com sucesso'})
        return user;
    }catch(error){
        res.status(500).json({msg:error})

    }
    
})
router.get("/get", async (req, res) => {
    try {
      const users = await prisma.user.findMany({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao buscar usuários" });
    }
  });

module.exports = router;