const {saveRes, getRes} = require("../services/resService");



const saveResController = async(req, res)=>{
    const {results} = req.body;

    const result = await saveRes(results);

    if(result.status === 200){
        console.log(result);
        return res.status(200).json({message: result.message});
    }
    //inappropriate request
    console.log(result);
    res.status(result.status).json({message:result.message});


}

const getResController = async(req, res) => {
    try{
        const {userId} = req.query;
        const results = await getRes(userId);
        res.status(200).json({results});
    }catch(error){
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    saveResController,
    getResController
}