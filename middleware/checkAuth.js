const checkAuth = (req, res, next) => {
    let token = ""

   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
        try {
            token = req.headers.authorization
            console.log(token)
            next()
        } catch (error) {
            console.log(error)
        }
   }
}

export default checkAuth