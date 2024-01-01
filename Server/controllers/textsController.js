const {getTexts} = require("../services/textsService");
var jwt = require('jsonwebtoken');
require('dotenv').config();

const getTextsController = async(req, res)=>{
    try{
        const texts = await getTexts();
        res.status(200).json({texts});
    }catch(error){
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    getTextsController
}

