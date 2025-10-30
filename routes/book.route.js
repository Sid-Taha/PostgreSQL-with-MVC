// routes\book.route.js
const express = require("express")
const {getAllBook, getBookById, createBook, deleteBookById, updateBookById} = require("../controllers/books.controler")

const router = express.Router()


router.get("/", getAllBook)

router.get("/:id", getBookById)

router.post("/", createBook)

router.delete("/:id", deleteBookById)

router.patch("/:id", updateBookById)


module.exports = router