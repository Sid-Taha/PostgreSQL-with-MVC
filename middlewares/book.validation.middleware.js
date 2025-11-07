// middlewares\book.validation.middleware.js
const {getBookValidator, createBookValidator, updateBookValidatorId, updateBookValidatorBody, deleteBookValidator} = require("../validators/book.validatorSchema")


exports.getBookValidateMiddleware = (req, res, next) => {
    try {
        getBookValidator.parse(req.query)
        next()
    } catch (error) {
        res.status(400).json({
            message: "Validation Failed",
            errors: error.issues
        })
    }
}





exports.createBookValidateMiddleware = (req, res, next) => {
    try {
        createBookValidator.parse(req.body)
        next()
    } catch (error) {
        res.status(400).json({
            message: "Validation Failed",
            errors: error.issues
        })
    }
}





exports.updateBookValidateMiddleware = (req, res, next) => {
    try {
        updateBookValidatorId.parse(req.params)
        
        updateBookValidatorBody.parse(req.body)

        next()
    } catch (error) {
        res.status(400).json({
            message: "Validation Failed",
            errors: error.issues
        })
    }
}





exports.deleteBookValidateMiddleware = (req, res, next) => {
    try {
        deleteBookValidator.parse(req.params)

        next()
    } catch (error) {
        res.status(400).json({
            message: "Validation Failed",
            errors: error.issues
        })
    }
}