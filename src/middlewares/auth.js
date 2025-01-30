const jwt = require ("jsonwebtoken");
const {JWT_SECRET} = process.env;

if(!JWT_SECRET) {
 throw new Error("JWT_SECRET is not defined in environment variables.")
}

function authenticate(req,res,next){
    const token = req.headers.authorization;
    console.log(token);
    if(!token) return res.status(401).json({error:"Access Denied."});


    try{
        const payload = jwt.verify(token,JWT_SECRET);
        req.user=payload;
        next();

    }catch(error){
        res.status(403).json({
            error:"Invalid token."
        })
    }
}

module.exports= authenticate;
