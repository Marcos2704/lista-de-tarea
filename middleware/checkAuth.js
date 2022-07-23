const checkAuth = (req, res, next) => {
    console.log("desde checkout...")
    next()
}

export default checkAuth