const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    req.body
    res.send("Teste schedule!")
})
module.exports = router;