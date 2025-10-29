exports.globalmiddleware = (req, res, next) => {
    console.log("✨ i am global middleware");
    next()
}