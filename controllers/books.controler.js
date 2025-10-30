// controllers\books.controler.js
const { eq } = require("drizzle-orm")
const db = require("../db/connection")
const bookTable = require("../models/book.model")

// ------------------------------------------------  GET
exports.getAllBook = async (req, res)=>{
    const result = await db.select().from(bookTable)
    
    if(!result){
        res.end("Database is Empty, Their is no record found !")
    }else{
        res.json({result : result})
    }
}

exports.getBookById = async (req, res) =>{
    const clientId = req.params.id
    
    const result = await db.select().from(bookTable).where(eq(bookTable.id, clientId)).limit(1)
    
    console.log("✅", result);
    
    res.json({apiResponse: result})
    
}
// ------------------------------------------------  CREATE

exports.createBook = async (req, res) => {
    const {title, description, authorId} = req.body
    
    const responseID = await db.insert(bookTable).values({
        title,
        description,
        authorId
    })
    .returning({
        id: bookTable.id
    })
    
    if(!responseID){
        res.status(401).json({message : "Book not created !"})
    }else {
        res.json({message: "Book Created !", bookId: responseID})
    }
    
}

// ------------------------------------------------  DELETE

exports.deleteBookById = async (req, res) => {
    const deleteId = req.params.id
    
    await db.delete(bookTable).where(eq(bookTable.id, deleteId))
    
    res.json({message: "Book Deleted !"})
}

// ------------------------------------------------  UPDATE

exports.updateBookById = async (req, res) => {
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
}