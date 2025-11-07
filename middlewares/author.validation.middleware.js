const {getAuthorValidator, createAuthorValidator, updateAuthorValidatorID, updateAuthorValidatorBody, deleteAuthorValidator} = require("../validators/author.validatorSchema")



exports.getAuthorValidateMiddleware = (req, res, next)=>{
try {
    getAuthorValidator.parse(req.query)
    next()
} catch (error) {
    return res.status(400).json({
        message: "Validation Failed",
        errors : error.issues
    })
}
}





exports.createAuthorValidateMiddleware = (req, res, next)=>{
try {
    createAuthorValidator.parse(req.body)

    next()
} catch (error) {
    return res.status(400).json({
        message: "Validation Failed",
        errors : error.issues
    })
}
}





exports.updateAuthorValidateMiddleware = (req, res, next)=>{
try {

    updateAuthorValidatorID.parse(req.params)

    updateAuthorValidatorBody.parse(req.body)

    next()
} catch (error) {
    return res.status(400).json({
        message: "Validation Failed",
        errors : error.issues
    })
}
}





exports.deleteAuthorValidateMiddleware = (req, res, next)=>{
try {
    deleteAuthorValidator.parse(req.params)

    next()
} catch (error) {
    return res.status(400).json({
        message: "Validation Failed",
        errors : error.issues
    })
}
}