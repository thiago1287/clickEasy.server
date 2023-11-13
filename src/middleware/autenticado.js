module.exports = async(req,res,next)=>{
    const token = req.headers.authorization

    if (token){
        res.status(401).send('Access token nao informado')
    }

    const[,acessToken] = token.split(" ")

}