import userModel from "../models/userModel.js";

export const registerController = async(req,res,next)=>{
    
        const {name,email,password} = req.body
        if(!name){
            next("name is required..");
        }
        if(!email){
            next("email is required..");
        }
        if(!password){
            next("password is required..");
        }
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            next('Email Already please login');
          
        }
        const user = await userModel.create({name,email,password});

        // token
        const token = user.createJWT()
        res.status(201).send({
            success:true,
            message:'user created successfully',
            user: {
                name:user.name,
                lastName : user.lastName,
                email : user.email,
                location :user.location
            },
            token
        });
};

export const loginController = async (req,res,next)=>{
    const {email,password}= req.body
//  validation
if(!email || !password){
    next('Please provide all field')
}
// find user by email
  const user = await userModel.findOne({email}).select("+password")
  if(!user){
    next('invalid username and password')
  }
// compare password
 const isMatch = await user.comparePassword(password)
 if(!isMatch){
    next('invalid username and password')
 }
 user.password =undefined;
 const token = user.createJWT();
 res.status(200).json({
    success:true,
    message:'login successfully',
    user,
    token,
 });
};