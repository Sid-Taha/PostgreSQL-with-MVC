const {z} = require("zod")


// --------------------------------------------GET  validation schema
// ---------req.query
exports.getAuthorValidator = z.object({
    search : z.string().optional(),

    id: z.uuid().optional()
})





// -------------------------------------------- CREATE  validation schema
// ---------req.body
exports.createAuthorValidator = z.object({
   firstName : z.string({required_error : "First Name is required"}).min(3, {message: "First Name can not be less then 3 character"}),

   lastName: z.string().optional(),

   email: z.email().optional()
})





// -------------------------------------------- UPDATE  validation schema
// ---------req.params
exports.updateAuthorValidatorID = z.object({
    id: z.uuid({message : "Invalid author ID format"})
})

// ---------req.body
exports.updateAuthorValidatorBody = z.object({
    firstName : z.string().min(3, {message : "Name can not be less then 3"}).optional(),

    lastName : z.string().optional(),

    email : z.email().optional()
})





// -------------------------------------------- DELETE  validation schema
// ---------req.params
exports.deleteAuthorValidator = z.object({
    id: z.uuid({message : "Invalid author ID format"})
})