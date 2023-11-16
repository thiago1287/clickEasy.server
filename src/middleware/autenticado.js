
import pkg from 'jsonwebtoken';
const { verify, decode } = pkg;


import { secret } from '../config/jsonSecret.js';


export default async(req,res,next)=>{
    const token = req.headers.authorization

    if (!token){
        return res.status(401).send('Access token nao informado')
    }

    const[,acessToken] = token.split(" ")

    try{
        verify(acessToken,secret.secret)

        const {id,email} = await decode(acessToken)

        req.usuarioId = id
        req.usuarioEmail = email

        return next()
    }  
    catch(error){
        res.status(401).send('Usario não autorizado')
    }
    }

    