// controllers\books.controler.js
const { eq, sql } = require("drizzle-orm")
const db = require("../db/connection")
const bookTable = require("../models/book.model")
const authorTable = require("../models/author.model")

// ------------------------------------------------  GET
exports.getAllBook = async (req, res)=>{
    try {
        const {search, bookId, authorId} = req.query
        let query = db.select().from(bookTable)
        
        if(search){
            query = query.where(sql`to_tsvector('english', ${bookTable.title}) @@ plainto_tsquery('english', ${search})`);
        }
        if(bookId){
            query = query.where(eq(bookTable.id, bookId))
        }
        if(authorId){
            query = query.where(eq(bookTable.authorId, authorId))
        }
        const result = await query

        return res.status(200).json({message: "Book fetched successfully", result : result})
    } catch (error) {
        console.error("Error fetching books:", error)
        return res.status(500).json({message: "Error fetching books"})
    }
    
}




// ------------------------------------------------  CREATE
exports.createBook = async (req, res) => {
    try {
        const {title, description, authorId} = req.body

        // check if author exists
        const authorExists = await db.select().from(authorTable).where(eq(authorTable.id, authorId)).limit(1)

        if(authorExists.length == 0){
            return res.status(404).json({message : "Author not found"})
        }

        const result = await db.insert(bookTable).values({
            title,
            description,
            authorId
        }).returning()
        
        return res.status(201).json({message: "Book created successfully", result : result})
    } catch (error) {
        console.error("Error creating book:", error)
        return res.status(500).json({message: "Error creating book"})
    }
}




// ------------------------------------------------  UPDATE

exports.updateBookById = async (req, res) => {
    try {
        const updateId = req.params.id
        const { title, description, authorId } = req.body
        
        // Build update object with only provided fields
        const updateData = {}
        if (title !== undefined) updateData.title = title
        if (description !== undefined) updateData.description = description
        if (authorId !== undefined) updateData.authorId = authorId
        
        // Check if there's anything to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No fields to update!" })
        }
        
        const result = await db
            .update(bookTable)
            .set(updateData)
            .where(eq(bookTable.id, updateId))
            .returning({
                id: bookTable.id,
                title: bookTable.title,
                description: bookTable.description,
                authorId: bookTable.authorId
            })
        
        if (!result || result.length === 0) {
            return res.status(404).json({ message: "Book not found!" })
        }
        
        res.json({ message: "Book updated successfully!", book: result[0] })
    } catch (error) {
        console.error("Error updating book:", error)
        return res.status(500).json({message: "Error updating book"})
    }
}




// ------------------------------------------------  DELETE

exports.deleteBookById = async (req, res) => {
    try {
        const deleteId = req.params.id
        
        const result = await db.delete(bookTable).where(eq(bookTable.id, deleteId)).returning()

        if (result.length == 0){
            return res.status(404).json({message: "Book not found"})
        }
        
        return res.status(200).json({message: "Book Deleted !"})
    } catch (error) {
        console.error("Error deleting book:", error)
        return res.status(500).json({message: "Error deleting book"})
    }
}

