const express = require("express")
const {getAllAuthors, createAuthor, updateAuthorById, deleteAuthorById} = require("../controllers/author.controler")

const router = express.Router()

// ------------------------------------ Author APIs
// GET all authors
// GET /api/v1/authors
// GET /api/v1/authors?search=xxxxxxxx
router.get("/", getAllAuthors)

// create authors
// GET /api/v1/authors
router.post("/", createAuthor)

// update
// PATCH /api/v1/authors/:id
router.patch("/:id", updateAuthorById)

// Delete 
// PATCH /api/v1/authors/:id
router.delete("/:id", deleteAuthorById)


module.exports = router