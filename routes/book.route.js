// routes\book.route.js
const express = require("express")
const {getAllBook, getBookById, createBook, deleteBookById, updateBookById, getBookByTitle} = require("../controllers/books.controler")
const {getBookValidateMiddleware, createBookValidateMiddleware, updateBookValidateMiddleware, deleteBookValidateMiddleware} = require("../middlewares/book.validation.middleware")

const router = express.Router()

// GET all books with this api
// GET /api/v1/books
// GET /api/v1/books?search=book 1
// GET /api/v1/books?authorId=xxxxxxxxxxxx
// GET /api/v1/books?bookId=xxxxxxxxxxxxxx
router.get("/", getBookValidateMiddleware ,getAllBook)

// Create new book
// POST /api/v1/books
router.post("/", createBookValidateMiddleware ,createBook)

// Update existing data
// PATCH /api/v1/books/:id
router.patch("/:id", updateBookValidateMiddleware ,updateBookById)

// Delete existing data
// DELETE /api/v1/books/:id
router.delete("/:id", deleteBookValidateMiddleware ,deleteBookById)



module.exports = router