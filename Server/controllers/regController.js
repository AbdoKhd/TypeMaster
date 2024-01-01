// const {authenticate, getAllUsers} = require("../services/authService");
const {register} = require("../services/regService");



const registerController = async(req, res)=>{
    const {user} = req.body;
    // check if the variable email is not null and not undefined
    //validation 
    if(!user){
        return res.status(401).json({message: "missing data"});
    }
    const result = await register(user);

    if(result.status === 200){
        console.log(result);
        return res.status(200).json({message: result.message});
    }
    //inappropriate request
    console.log(result);
    res.status(result.status).json({message:result.message});


}

module.exports = {
    registerController,
}