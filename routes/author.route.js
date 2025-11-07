const express = require("express")
const {getAllAuthors, createAuthor, updateAuthorById, deleteAuthorById} = require("../controllers/author.controler")
const {getAuthorValidateMiddleware, createAuthorValidateMiddleware, updateAuthorValidateMiddleware, deleteAuthorValidateMiddleware} = require("../middlewares/author.validation.middleware")

const router = express.Router()

// ------------------------------------ Author APIs
// GET all authors
// GET /api/v1/authors
// GET /api/v1/authors?search=xxxxxxxx
router.get("/", getAuthorValidateMiddleware ,getAllAuthors)

// create authors
// GET /api/v1/authors
router.post("/", createAuthorValidateMiddleware ,createAuthor)

// update
// PATCH /api/v1/authors/:id
router.patch("/:id", updateAuthorValidateMiddleware ,updateAuthorById)

// Delete 
// PATCH /api/v1/authors/:id
router.delete("/:id", deleteAuthorValidateMiddleware ,deleteAuthorById)


module.exports = router