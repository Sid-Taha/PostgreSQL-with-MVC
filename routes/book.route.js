const express = require("express")
const {getAllBook} = require("../controllers/books.controler")

const router = express.Router()


router.get("/", getAllBook)


module.exports = router