// validators\book.validatorSchema.js
const {z} = require("zod")

// ------------------------------------  GET validator Schema
// --------------req.query
exports.getBookValidator = z.object({
    search: z.string().optional(),
    
    bookId: z.uuid().optional(),

    authorId: z.uuid().optional()
})





// ------------------------------------  CREATE validator Schema
// --------------req.body
exports.createBookValidator = z.object({
    title : z.string({required_error: "title is required !"}).min(3, {message: "title can not be less then 3 character"}),

    description : z.string().optional(),

    authorId : z.uuid()
})





// ------------------------------------  UPDATE validator Schema
// --------------req.params.id
exports.updateBookValidatorId = z.object({
    id : z.uuid()
})

// --------------req.body
exports.updateBookValidatorBody = z.object({
   title : z.string().optional(),

   description : z.string().optional(),

   authorId : z.uuid().optional()
})





// ------------------------------------  DELETE validator Schema
// --------------req.params.id
exports.deleteBookValidator = z.object({
    id : z.uuid()
})

