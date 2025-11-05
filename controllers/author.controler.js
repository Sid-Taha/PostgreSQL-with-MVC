const db = require("../db/connection")
const {sql, ilike, or, eq} = require("drizzle-orm")
const authorTable = require("../models/author.model")
const bookTable = require("../models/book.model")


exports.getAllAuthors = async (req, res)=>{
    try {
        const {search, id} = req.query
        
        let query = db.select().from(authorTable)

        if (id) {
            query = query.where(eq(authorTable.id, id))
        }
        else if(search){
            query = query.where(or(
                ilike(authorTable.firstName, `%${search}%`),
                ilike(authorTable.lastName, `%${search}%`),
                ilike(authorTable.email, `%${search}%`)
            ))
        }

        const result = await query

        return res.status(200).json({message: "Author Fetched !", result: result})
    } catch (error) {
        console.error("Error fetching authors", error);
        return res.status(500).json({message: "Error fetching authors"}) 
    }
}



exports.createAuthor = async (req, res)=>{
try {
    const {firstName, lastName, email} = req.body

    // validation
    if(!firstName || !email){
        return res.status(400).json({message: "firstName and email are required"}) 
    }

    const result = await db.insert(authorTable).values({firstName, lastName, email}).returning()

    return res.status(201).json({message: "Author created !", result: result})
} catch (error) {
    console.error("Error creating authors: ", error);
    return res.status(500).json({message: "Error creating authors"}) 
}
}



exports.updateAuthorById = async (req, res)=>{
try {
    const {id} = req.params
    const {firstName, lastName, email} = req.body

    // Build update object with only provided fields
    const updateData = {}
    if (firstName !== undefined) updateData.firstName = firstName
    if (lastName !== undefined) updateData.lastName = lastName
    if (email !== undefined) updateData.email = email
    
    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No fields to update!" })
    }

    const result = await db.update(authorTable).set(updateData).where(eq(authorTable.id, id)).returning()

    return res.status(200).json({message: "Author updated !", result: result})
} catch (error) {
    console.error("Error updating authors: ", error);
    return res.status(500).json({message: "Error updating authors"}) 
}
}



exports.deleteAuthorById = async (req, res) =>{
    const {id} = req.params

    const books = await db.select().from(bookTable).where(eq(bookTable.authorId, id))

    if(books.length > 0){
        return res.status(400).json({message: `you cannot delete this author. Author has ${books.length} book. you should delete book first.`})
    }

    const result = await db.delete(authorTable).where(eq(authorTable.id, id)).returning()

    return res.status(200).json({message: "Author Deleted !", result: result})
}