const express = require("express");
const { prisma } = require("../services/prisma");
const router = express.Router();
const bcrypt = require('bcrypt');


router.post("/register", async(req,res) =>{
    const{name, email, password, confirmpassword,role,turma,curso} = req.body
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
    if(!role){
      return res.status(400).json({msg: 'O cargo é obrigatório'})
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
    if (role === 'professor') {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
          role,
        },
      });
    } else if (role === 'aluno') {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
          role,
          turma,
          curso,
        },
      });
    } else if (role === 'paciente') {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
          role,
        },
      });
    } else if (role === 'profissional') {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
          role,
        },
      });
    }

    try{
        res.status(201).json({msg:'Usuario cadastrado com sucesso'})
        
    }catch(error){
        res.status(500).json({msg:error})

    }
    
})

//puxar todos alunos
router.get("/alunos", async (req, res) => {
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
  });

router.get("/pacientes", async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: 'paciente' 
        }
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao buscar usuários" });
    }
  })

//puxar usuario unico pelo id
router.get("/user/:id", async (req, res) => {
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
});


router.put("/user/:id", async (req, res) => {
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
});






module.exports = router;