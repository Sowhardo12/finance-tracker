const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
    const token = req.header("Authorization")?.replace("Bearer ","");
    if(!token){
        return res.status(401).json({message:"No token, authorization denied"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //checks if the token is valid or not
        req.user = decoded.id;
        next();
    }catch(err){
        return res.status(401).json({message:"Invalid Token"});
    }
}

module.exports = authMiddleware;