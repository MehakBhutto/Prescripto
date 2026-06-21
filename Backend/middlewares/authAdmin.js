const jwt = require('jsonwebtoken')

const authAdmin = async(req, res, next) => {
    try{
        const token = req.headers.token || req.headers.atoken
        if(!token){
            return res.json({success:false, message:'Not Authorizd Login Again'})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:'Not Authorizd Login Again'})
        }
        next()
    }catch(e){
        res.json({success:false,message:e.message})
    }
}

module.exports = authAdmin
