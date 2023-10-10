const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log(req.params);
    res.send("Teste schedule!");
});
module.exports = router;