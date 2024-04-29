import JWT from "jsonwebtoken";

const userAuth = async (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
       return next("Auth failed");
    }
    const token = authHeader.split(' ')[1];
    console.log("JWT Token:", token); // Log extracted token

    try {
        const payload = JWT.verify(token,process.env.JWT_SECRET);
        console.log("token payload:", payload);
        req.user = {userID : payload.userId};
        next();
    } catch (error) {
        next("Auth Failed");
    }
};

export default userAuth;